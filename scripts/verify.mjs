import { chromium } from 'playwright-core';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';

// Read-only local browser review. No inquiry is submitted or email opened.
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:3000';
const output = 'scrollcraft/builds/bricks/qa';
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const report = { pages: [], interactions: [], accessibility: [], errors: [] };
const sourceCopy = JSON.parse(fs.readFileSync('tests/fixtures/original-page-copy.json', 'utf8'));
const normalizeCopy = (s) =>
  s
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
const routes = [
  '',
  'memberships',
  'businessclub',
  'carclub',
  'socialclub',
  'outside-marketing',
  'events',
  'content-strategy',
  'about-us',
  'members',
  'bricks-art',
  'contact',
  'copy-of-founder-page',
  'book-online',
  'terms',
  'privacy',
  'event-details/bricks-kickoff',
  'service-page/business-workshop',
  'service-page/exotic-car-club-storage',
  'service-page/social-club-meetup',
];
async function context(options = {}) {
  const c = await browser.newContext(options);
  await c.addInitScript(() => {
    Element.prototype.requestPointerLock = () => {};
    Element.prototype.setPointerCapture = () => {};
  });
  return c;
}
async function visit(p, route) {
  const r = await p.goto(`${base}/${route}`, { waitUntil: 'domcontentloaded' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(450);
  return r;
}
async function shot(p, name) {
  await p.screenshot({ path: `${output}/${name}.png` });
}
async function scrollProgress(p, el, progress) {
  const bounds = await el.evaluate((e) => ({
    top: e.getBoundingClientRect().top + scrollY,
    height: e.getBoundingClientRect().height,
    viewport: innerHeight,
  }));
  await p.evaluate(
    (y) => scrollTo({ top: y, behavior: 'instant' }),
    bounds.top - bounds.viewport * 0.9 + (bounds.height + bounds.viewport * 0.8) * progress,
  );
  await p.waitForTimeout(1000);
}
try {
  const audit = await context({ reducedMotion: 'reduce', viewport: { width: 1440, height: 1000 } });
  const p = await audit.newPage();
  p.on('pageerror', (e) => report.errors.push(e.message));
  const hrefs = new Set();
  for (const width of [1440, 390]) {
    await p.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const route of routes) {
      const r = await visit(p, route);
      assert.equal(r.status(), 200, route);
      const result = await p.evaluate(() => ({
        h1: document.querySelectorAll('h1').length,
        heroLines: document.querySelectorAll('h1 .hero-line').length,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        textOverflow: [...document.querySelectorAll('h1,h2,h3,p,label,summary')]
          .filter(
            (e) =>
              e.getClientRects().length &&
              !e.closest('[aria-hidden="true"],dialog:not([open])') &&
              e.scrollWidth > e.clientWidth + 5,
          )
          .map((e) => e.textContent.slice(0, 60)),
        missing: [...document.images]
          .filter((e) => e.complete && !e.naturalWidth)
          .map((e) => e.src),
        photos: document.querySelectorAll('.depth-photo').length,
        layers: document.querySelectorAll('.has-cutout').length,
        links: [...document.querySelectorAll('a[href]')]
          .map((e) => e.getAttribute('href'))
          .filter((h) => h.startsWith('/')),
      }));
      result.links.forEach((h) => hrefs.add(h));
      delete result.links;
      assert.equal(result.h1, 1, `${route} heading`);
      assert.ok(result.heroLines > 0, `${route} hero uses the shared highlight wipe`);
      assert.equal(result.overflow, false, `${route} horizontal overflow`);
      assert.deepEqual(result.textOverflow, [], `${route} text overflow`);
      assert.deepEqual(result.missing, [], `${route} missing images`);
      if (width === 1440 && sourceCopy[route]) {
        const visibleCopy = normalizeCopy(await p.locator('body').innerText());
        for (const passage of sourceCopy[route])
          assert.ok(
            visibleCopy.includes(normalizeCopy(passage)),
            `${route || '/'} missing original copy: ${passage.slice(0, 70)}`,
          );
      }
      report.pages.push({ route: route || '/', width, status: r.status(), ...result });
      await shot(p, `final-${route.replaceAll('/', '-') || 'home'}-${width}`);
      console.log(
        'Page:',
        route || '/',
        width,
        result.textOverflow.length ? result.textOverflow : 'pass',
      );
      if (
        width === 1440 &&
        ['', 'contact', 'about-us', 'members', 'privacy', 'events'].includes(route)
      ) {
        const results = await new AxeBuilder({ page: p })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
          .analyze();
        report.accessibility.push({
          route: route || '/',
          violations: results.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
          })),
        });
      }
    }
  }
  for (const href of hrefs)
    assert.equal((await p.request.get(`${base}${href}`)).status(), 200, href);
  assert.equal((await p.request.get(`${base}/definitely-not-a-bricks-page`)).status(), 404);
  await visit(p, '');
  assert.equal(await p.locator('.warehouse-frame video').getAttribute('src'), null);
  assert.equal(await p.locator('.ambient-video video').first().getAttribute('src'), null);
  await p.locator('.culture-section').scrollIntoViewIfNeeded();
  for (const video of await p.locator('.scroll-film video').all())
    assert.equal(await video.getAttribute('src'), null);
  assert.equal(await p.locator('[data-photo="rambo"]').getAttribute('data-layer-ready'), 'false');
  report.interactions.push(
    'All internal links resolve; 404 page returns 404; reduced motion avoids video downloads.',
  );
  await audit.close();

  const c = await context({ viewport: { width: 1440, height: 1000 } });
  const page = await c.newPage();
  page.on('pageerror', (e) => report.errors.push(e.message));
  await visit(page, '');
  assert.equal(
    await page.locator('.ticker-wrap').evaluate((e) => getComputedStyle(e).transform),
    'none',
  );
  const opening = await page.evaluate(() => ({
    heroBottom: document.querySelector('.home-hero').getBoundingClientRect().bottom,
    tickerTop: document.querySelector('.ticker-wrap').getBoundingClientRect().top,
  }));
  assert.ok(opening.tickerTop >= opening.heroBottom - 1, 'Ticker starts beneath the hero');
  assert.ok(
    (
      await page.locator('.hero-baseline > p').evaluate((e) => getComputedStyle(e).fontFamily)
    ).includes('IBM Plex Mono'),
  );
  assert.equal(
    await page
      .locator('.hero-baseline strong')
      .first()
      .evaluate((e) => getComputedStyle(e).fontWeight),
    '700',
  );
  assert.equal(
    await page
      .locator('.hero-line')
      .first()
      .evaluate((e) => getComputedStyle(e, '::after').animationName),
    'hero-highlight-wipe',
  );
  report.interactions.push(
    'Ticker begins beneath the hero; supporting copy uses IBM Plex Mono with bold emphasis; hero wipe is active.',
  );
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  assert.equal(await page.locator('.menu-dialog').evaluate((e) => e.open), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.menu-dialog').evaluate((e) => e.open), false);
  assert.equal(
    await page
      .getByRole('button', { name: 'Open navigation menu' })
      .evaluate((e) => e === document.activeElement),
    true,
  );
  await page.getByRole('button', { name: 'Pause ticker' }).click();
  assert.equal(
    await page.locator('.ticker').evaluate((e) => e.classList.contains('is-paused')),
    true,
  );
  await page.getByRole('button', { name: 'Watch the film' }).click();
  await page.waitForTimeout(500);
  assert.equal(await page.locator('.film-dialog').evaluate((e) => e.open), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.film-dialog video').evaluate((e) => e.paused), true);
  report.interactions.push(
    'Menu keyboard focus and Escape; ticker pause; film dialog playback and close.',
  );

  const bounds = await page.locator('.warehouse-journey').evaluate((e) => ({
    top: e.getBoundingClientRect().top + scrollY,
    height: e.getBoundingClientRect().height,
    viewport: innerHeight,
  }));
  const samples = [];
  for (const progress of [0.1, 0.3, 0.5, 0.7, 0.9]) {
    await page.evaluate(
      (y) => scrollTo({ top: y, behavior: 'instant' }),
      bounds.top - bounds.viewport + (bounds.height + bounds.viewport) * progress,
    );
    await page.waitForTimeout(1300);
    samples.push(
      await page
        .locator('.warehouse-frame video')
        .evaluate((v) => ({ time: v.currentTime, duration: v.duration, ready: v.readyState })),
    );
    await shot(page, `warehouse-${progress}`);
  }
  assert.ok(samples.at(-1).time > samples[0].time + 3, 'Warehouse scroll advances the film');
  report.interactions.push({ warehouse: samples });
  await page.locator('.membership-rows a').nth(1).hover();
  assert.equal(
    await page
      .locator('.membership-preview-plane')
      .nth(1)
      .evaluate((e) => e.classList.contains('is-active')),
    true,
  );
  await shot(page, 'membership-interaction');

  const highlight = page.locator('.home-content-system blockquote .scroll-highlight');
  const highlightTop = await highlight.evaluate((e) => e.getBoundingClientRect().top + scrollY);
  const viewport = await page.evaluate(() => innerHeight);
  const highlightSamples = [];
  for (const position of [0.9, 0.35]) {
    await page.evaluate(
      (y) => scrollTo({ top: y, behavior: 'instant' }),
      highlightTop - viewport * position,
    );
    await page.waitForTimeout(1000);
    highlightSamples.push(
      await highlight.evaluate((e) =>
        parseFloat(getComputedStyle(e).getPropertyValue('--highlight')),
      ),
    );
  }
  assert.ok(highlightSamples[1] > highlightSamples[0] + 40, 'Highlight advances with the scroll');
  await page.locator('.culture-heading .arrow-link').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const cultureSpacing = await page.evaluate(() => ({
    button: document.querySelector('.culture-heading .arrow-link').getBoundingClientRect().toJSON(),
    film: document.querySelector('.culture-wide').getBoundingClientRect().toJSON(),
  }));
  assert.ok(cultureSpacing.button.height >= 60);
  assert.ok(
    cultureSpacing.film.top - cultureSpacing.button.bottom >= 32,
    'Member action has breathing room before the film',
  );
  report.interactions.push({
    highlights: highlightSamples,
    memberButtonHeight: cultureSpacing.button.height,
    memberButtonGap: cultureSpacing.film.top - cultureSpacing.button.bottom,
  });

  // These regressions reproduce the original static/doubled cutout problem.
  for (const [route, name] of [
    ['', 'work'],
    ['outside-marketing', 'talk'],
    ['members', 'about-us-9'],
    ['members', 'businessclub-17'],
  ]) {
    await visit(page, route);
    const layer = page.locator(`[data-photo="${name}"]`).first();
    await scrollProgress(page, layer, 0.25);
    await page.waitForFunction(
      (name) =>
        document.querySelector(`[data-photo="${name}"]`)?.getAttribute('data-layer-ready') ===
        'true',
      name,
    );
    const a = await layer
      .locator('.depth-foreground')
      .evaluate((e) => getComputedStyle(e).transform);
    await scrollProgress(page, layer, 0.7);
    const b = await layer
      .locator('.depth-foreground')
      .evaluate((e) => getComputedStyle(e).transform);
    assert.notEqual(a, b, `${name} subject moves on scroll`);
    assert.equal(
      await layer.locator('.layer-original').evaluate((e) => getComputedStyle(e).opacity),
      '0',
    );
    assert.equal(await layer.locator('.depth-background [data-clean-plate]').count(), 1);
    assert.equal(
      await layer.locator('.depth-background image[mask]').count(),
      1,
      'Original subject is removed from the back plane',
    );
    await shot(page, `revision-layer-${name}`);
    report.interactions.push({ layer: name, before: a, after: b });
  }
  assert.equal(await page.locator('.pink-slip').count(), 13);
  assert.equal(await page.locator('.slip-company-logo img').count(), 13);
  assert.equal(await page.locator('.vip-badge').count(), 6);
  assert.equal(await page.locator('.slip-duo .layered-image').count(), 2);
  report.interactions.push(
    '13 company-branded pink slips, six distinct VIP passes, Omar and Mike together.',
  );

  for (const route of ['', 'carclub', 'businessclub', 'content-strategy', 'events']) {
    await visit(page, route);
    const film = page.locator('.scroll-film').first();
    const v = film.locator('video');
    await scrollProgress(page, film, 0.2);
    await page.waitForFunction(() => document.querySelector('.scroll-film video')?.readyState >= 2);
    await page.waitForTimeout(500);
    const a = await v.evaluate((e) => e.currentTime);
    await scrollProgress(page, film, 0.8);
    const b = await v.evaluate((e) => e.currentTime);
    assert.ok(b > a + 0.5, `${route} video advances on scroll`);
    assert.equal(await v.evaluate((e) => e.paused), true, 'Video is controlled by scrolling');
    await shot(page, `revision-film-${route || 'home'}`);
    report.interactions.push({ scrollFilm: route || '/', before: a, after: b });
  }
  await visit(page, 'outside-marketing');
  const eventLoop = page.locator('.marketing-panels .ambient-video video');
  await eventLoop.scrollIntoViewIfNeeded();
  await page.waitForFunction(
    () => !document.querySelector('.marketing-panels .ambient-video video').paused,
  );
  assert.deepEqual(
    await eventLoop.evaluate((v) => ({
      muted: v.muted,
      loop: v.loop,
      source: v.getAttribute('src'),
    })),
    { muted: true, loop: true, source: '/media/event-photo-loop.mp4' },
  );
  await shot(page, 'revision-event-loop');
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(350);
  assert.equal(await eventLoop.evaluate((v) => v.paused), true);
  report.interactions.push(
    'Higgsfield event-photo loop starts muted in view and pauses offscreen.',
  );

  const failedLayer = await c.newPage();
  await failedLayer.route('**/media/plates/work.webp', (r) => r.abort());
  await visit(failedLayer, '');
  const fallback = failedLayer.locator('[data-photo="work"]').first();
  await fallback.scrollIntoViewIfNeeded();
  await failedLayer.waitForTimeout(900);
  assert.equal(await fallback.getAttribute('data-layer-ready'), 'false');
  assert.equal(
    await fallback.locator('.layer-original').evaluate((e) => getComputedStyle(e).opacity),
    '1',
  );
  assert.equal(
    await fallback.locator('.depth-foreground').evaluate((e) => getComputedStyle(e).visibility),
    'hidden',
  );
  await failedLayer.close();
  report.interactions.push(
    'A failed clean-plate download retains the complete original photograph without an overlay.',
  );

  await visit(page, 'about-us');
  await shot(page, 'about-plants-desktop-start');
  const before = await page.locator('.plant-left').evaluate((e) => getComputedStyle(e).transform);
  await page.evaluate(() => scrollTo({ top: 400, behavior: 'instant' }));
  await page.waitForTimeout(1400);
  assert.notEqual(
    await page.locator('.plant-left').evaluate((e) => getComputedStyle(e).transform),
    before,
  );
  await shot(page, 'about-plants-desktop-scroll');
  const welcome = page.locator('.welcome-section video');
  await welcome.evaluate((v) =>
    scrollTo({
      top:
        scrollY +
        v.getBoundingClientRect().top -
        (innerHeight - v.getBoundingClientRect().height) / 2,
      behavior: 'instant',
    }),
  );
  await page.waitForTimeout(1400);
  assert.equal(await welcome.evaluate((v) => v.paused), false);
  assert.equal(await welcome.evaluate((v) => v.muted), true);
  await page.getByRole('button', { name: 'Turn sound on' }).click();
  assert.equal(await welcome.evaluate((v) => v.muted), false);
  await page.getByRole('button', { name: 'Mute sound' }).click();
  await shot(page, 'welcome-in-frame');
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(300);
  assert.equal(await welcome.evaluate((v) => v.paused), true);
  report.interactions.push(
    'Plants separate on scroll; welcome autoplays in frame, sound toggles, pauses offscreen.',
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await visit(page, 'about-us');
  await shot(page, 'about-plants-mobile-start');

  await visit(page, 'bricks-art');
  await page.locator('.art-piece').first().click();
  assert.equal(await page.locator('.art-dialog').evaluate((e) => e.open), true);
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('.art-dialog h3').textContent(), 'Walls with a point of view');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.art-dialog').evaluate((e) => e.open), false);
  report.interactions.push('Art inspection opens and supports next, previous and Escape.');

  await visit(page, 'contact?interest=Business%20club');
  assert.equal(await page.locator('[name="interest"]').inputValue(), 'Business club');
  for (const [name, value] of Object.entries({
    firstName: 'Website',
    lastName: 'Review',
    email: 'review@example.com',
    phone: '801 555 0100',
    company: 'Test & review',
    message: 'A browser verification draft. This is never sent.',
  }))
    await page.locator(`[name="${name}"]`).fill(value);
  await page.locator('[name="revenue"]').selectOption('Prefer to discuss');
  await page.locator('[name="consent"]').check();
  await page.getByRole('button', { name: 'Review my inquiry' }).click();
  assert.equal(await page.locator('.inquiry-review').isVisible(), true);
  assert.ok(
    (await page.getByRole('link', { name: 'Open email & send' }).getAttribute('href')).startsWith(
      'mailto:brett@bricksslc.com?',
    ),
  );
  assert.ok((await page.locator('.inquiry-review').innerText()).includes('has not been sent'));
  await shot(page, 'contact-reviewed-mobile');
  await page.getByRole('button', { name: 'Edit details' }).click();
  assert.equal(await page.locator('[name="company"]').inputValue(), 'Test & review');
  await page.locator('[name="interest"]').selectOption('Event inquiry');
  assert.equal(await page.locator('[name="revenue"]').count(), 0);
  await page.locator('[name="eventDate"]').fill('2026-12-01');
  await page.locator('[name="guests"]').fill('60');
  await page.getByRole('button', { name: 'Review my inquiry' }).click();
  assert.ok((await page.locator('.inquiry-review').innerText()).includes('2026-12-01'));
  report.interactions.push(
    'Inquiry deep link, conditional fields, review, mailto recipient, edit preservation and event details. No email sent.',
  );

  for (const route of ['', 'members', 'about-us', 'contact', 'events']) {
    await page.setViewportSize({ width: 360, height: 640 });
    await visit(page, route);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1),
      false,
    );
    await shot(page, `compact-${route || 'home'}`);
  }
  await c.close();
  const noJS = await context({
    javaScriptEnabled: false,
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  });
  const plain = await noJS.newPage();
  await plain.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
  assert.equal(await plain.locator('h1').isVisible(), true);
  await plain.goto(`${base}/contact`, { waitUntil: 'domcontentloaded' });
  assert.equal(await plain.locator('.form-submit').isVisible(), false);
  assert.equal(
    await plain.locator('noscript a').getAttribute('href'),
    'mailto:brett@bricksslc.com',
  );
  await noJS.close();
  report.interactions.push('No-JavaScript content and email fallback remain usable.');
  assert.deepEqual(report.errors, []);
  console.log(
    'Interactions passed. Accessibility findings:',
    report.accessibility.flatMap((a) => a.violations).length,
  );
} finally {
  fs.writeFileSync(`${output}/verification.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
