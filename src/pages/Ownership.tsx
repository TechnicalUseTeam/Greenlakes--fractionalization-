import { Link } from 'react-router-dom';
import { ChainTable, PageHead, PhotoStrip } from '../components/Blocks';
import { Faq } from '../components/Faq';
import { Reveal } from '../components/Reveal';

const documents = [
  { name: 'Title search report', detail: 'Independent lawyer, 30-year search', status: 'Complete' },
  { name: 'Encumbrance certificate', detail: '30 years, sub-registrar', status: 'Complete' },
  { name: 'Survey map & boundary', detail: 'Licensed surveyor', status: 'Complete' },
  { name: 'Legal opinion', detail: 'Independent counsel', status: 'Complete' },
  { name: 'Valuation report', detail: 'Knight Frank India (sample)', status: '30 Jun 2026' },
  { name: 'SPV constitutional documents', detail: 'MOA, AOA, share register', status: 'Available' },
  { name: 'Subscription agreement', detail: 'E-signed at purchase', status: 'Template' },
  { name: 'Risk disclosures', detail: 'Read before you sign', status: 'Available' },
];

export function Ownership() {
  return (
    <>
      <PageHead
        title="You are on the register."
        intro="One company owns the land. You own part of that company. What counts is the register, the agreements and the title."
        image={{
          src: '/media/orchard-laterite.jpg',
          alt: 'Mango trees standing in red laterite soil',
          caption: 'The asset behind the paper',
          fact: 'One second home · one title',
        }}
      />

      <div className="container">
        <Reveal>
          <ChainTable />
        </Reveal>

        <PhotoStrip
          items={[
            {
              src: '/media/nandi-real.jpg',
              alt: 'Mango and jackfruit orchard below the Nandi Hills at sunrise',
              name: 'The land',
              fact: 'Nandi Hills, Karnataka',
            },
            {
              src: '/media/aerial-fields.jpg',
              alt: 'Aerial view of agricultural fields',
              name: 'The boundary',
              fact: 'Surveyed, one title',
            },
            {
              src: '/media/alibaug-beach.jpg',
              alt: 'The palm-lined beach at Alibaug',
              name: 'The next second home',
              fact: 'Alibaug, Maharashtra',
            },
          ]}
        />

        <section className="section" aria-labelledby="spv-title">
          <div className="prose">
            <Reveal>
              <h2 className="h2" id="spv-title" style={{ maxWidth: '18ch' }}>
                Why a company, not a plot.
              </h2>
            </Reveal>
            <Reveal className="prose__body" delay={1}>
              <p>
                Farm land cannot be freely cut into small plots. A change of use, approvals and a registered sale are
                needed for each one. A company structure lets many investors hold one second home without carving it up. The
                land stays a single, clean asset.
              </p>
              <p>
                You buy a fraction of the SPV. The SPV owns the land. Your stake is an economic interest in the SPV, with
                a vote on reserved matters. You get no boundary, no parcel number, no separate title deed. The land is
                not being divided on the ground.
              </p>
              <p>
                That is why the map shows the whole second home. A marked square would describe a sale of land. A percentage
                describes a share of a company. That is what you are buying.
              </p>
              <div className="notice">
                <strong>Tokens are records, not the right itself.</strong> Digital tokens are permissioned records of your
                holding. They are not cryptocurrency, cannot be sent to arbitrary wallets, and do not replace the SPV
                register or the signed agreement.
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section" id="documents" aria-labelledby="docs-title">
          <div className="split">
            <Reveal>
              <h2 className="h2" id="docs-title">
                The data room.
              </h2>
              <p className="body" style={{ marginTop: 14 }}>
                Every second home carries the same documents. Diligence papers before you invest. Signed papers in your account
                after.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <div className="notice">
                <strong>Read before you pay.</strong> The title report, encumbrance certificate, survey, legal opinion and
                valuation are open to signed-in users. A missing document means the second home is not ready.
              </div>
            </Reveal>
          </div>
          <Reveal style={{ marginTop: 32 }} delay={1}>
            <ul className="docs" data-ui>
              {documents.map((d) => (
                <li key={d.name}>
                  <div>
                    <strong>{d.name}</strong>
                    <span>{d.detail}</span>
                  </div>
                  <em>{d.status}</em>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="section" aria-labelledby="faq-title">
          <Reveal>
            <h2 className="h2" id="faq-title">
              Ownership questions.
            </h2>
          </Reveal>
          <Reveal style={{ marginTop: 36 }}>
            <Faq />
          </Reveal>
          <PhotoStrip
            items={[
              {
                src: '/media/nandi-monsoon.jpg',
                alt: 'Monsoon clouds over the Nandi Hills',
                name: 'The region',
                fact: 'Nandi Hills',
              },
              {
                src: '/media/orchard-egrets.jpg',
                alt: 'Cattle egrets foraging in a mango orchard',
                name: 'The orchard',
                fact: 'Working land',
              },
              {
                src: '/media/alibaug-beach.jpg',
                alt: 'The palm-lined beach at Alibaug',
                name: 'The next second home',
                fact: 'Alibaug',
              },
            ]}
          />
        </section>

        <section className="section--tight">
          <Reveal className="cta">
            <p>Read the documents first.</p>
            <div className="cta__actions">
              <Link className="btn" to="/explore">
                Explore second homes
              </Link>
              <a className="text-link" href="mailto:hello@greenlakes.in?subject=Ownership%20question">
                Ask about the structure
              </a>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
