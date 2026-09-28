import Link from 'next/link';
import { PageHero } from './page-parts';
import policies from '@/lib/legal.json';
export function LegalPage({ kind }: { kind: 'terms' | 'privacy' }) {
  const copy = policies[kind];
  return (
    <>
      <PageHero
        title={kind === 'terms' ? 'Terms of' : 'Privacy'}
        accent={kind === 'terms' ? 'service.' : 'policy.'}
        kicker="BRICKS SLC"
        video="studio"
        className="legal-hero"
      />
      <section className="section legal-layout">
        <aside className="legal-nav">
          <p className="micro">The details</p>
          <Link href="/terms">Terms of service ↗</Link>
          <Link href="/privacy">Privacy policy ↗</Link>
          <Link href="/contact">Contact BRICKS ↗</Link>
        </aside>
        <article className="legal-copy">
          {kind === 'privacy' && (
            <div className="website-notice">
              <h2>Website inquiries</h2>
              <p>
                The inquiry form uses the details you enter to prepare a message to
                brett@bricksslc.com. You review the message before sending. When the form opens your
                email app, nothing is delivered until you send it there. Where direct delivery is
                available, your inquiry is transmitted through our email delivery provider, Resend.
              </p>
              <p>
                This website does not add advertising trackers or analytics. Contact Brett with
                questions about your inquiry or to request an update or deletion. The BRICKS app
                privacy policy follows below.
              </p>
            </div>
          )}
          {copy.map((p, i) => {
            if (/^\d+\. /.test(p)) return <h2 key={i}>{p}</h2>;
            if (kind === 'privacy' && p === '[[providers]]')
              return (
                <div key={i}>
                  <table>
                    <caption className="sr-only">BRICKS app service providers</caption>
                    <thead>
                      <tr>
                        <th scope="col">Provider</th>
                        <th scope="col">What it handles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.providers.map(([name, detail]) => (
                        <tr key={name}>
                          <th scope="row">{name}</th>
                          <td>{detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            return <p key={i}>{p}</p>;
          })}
        </article>
      </section>
    </>
  );
}
