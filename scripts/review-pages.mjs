import {chromium} from 'playwright-core';
import fs from 'node:fs';
const folder='scrollcraft/builds/bricks/qa';fs.mkdirSync(folder,{recursive:true});
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const c=await b.newContext({viewport:{width:1440,height:1000}});await c.addInitScript(()=>{Element.prototype.requestPointerLock=()=>{};Element.prototype.setPointerCapture=()=>{}});
const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));const data=[];
const routes=['','memberships','businessclub','carclub','socialclub','outside-marketing','events','content-strategy','about-us','members','bricks-art','contact','copy-of-founder-page','book-online','terms','privacy'];
for(const width of [390]){
 await p.setViewportSize({width,height:width===1440?1000:844});
 for(const route of routes){
  const response=await p.goto(`http://127.0.0.1:3000/${route}`,{waitUntil:'domcontentloaded'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1600);
  const name=route||'home';await p.screenshot({path:`${folder}/${name}-${width}-hero.png`});
  const overflow=await p.locator('h1,h2,h3,p,label,summary').evaluateAll(els=>els.filter(e=>e.getClientRects().length&&e.scrollWidth>e.clientWidth+4&&!e.closest('dialog:not([open])')).map(e=>({tag:e.tagName,text:e.textContent.slice(0,70),client:e.clientWidth,scroll:e.scrollWidth})));const missing=await p.locator('img').evaluateAll(els=>els.filter(e=>e.complete&&e.naturalWidth===0).map(e=>e.getAttribute('src')));
  await p.evaluate(()=>window.scrollTo({top:Math.min(1300,document.body.scrollHeight-innerHeight),behavior:'instant'}));await p.waitForTimeout(1600);await p.screenshot({path:`${folder}/${name}-${width}-body.png`});
  data.push({route,width,status:response.status(),overflow,missing});console.log(route||'home',width,response.status(),'overflow',JSON.stringify(overflow),'missing',JSON.stringify(missing));
 }
}
fs.writeFileSync(`${folder}/mobile-route-review.json`,JSON.stringify({pages:data,errors},null,2));await b.close();
