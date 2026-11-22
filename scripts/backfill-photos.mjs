// One-off: point the live catalogue at the real per-property photos in
// public/plot-photos/propertyN instead of the seed Unsplash URLs.
// Run: GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json node scripts/backfill-photos.mjs
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error('Set GOOGLE_APPLICATION_CREDENTIALS to your service-account.json path first.');
  process.exit(1);
}

initializeApp({
  credential: applicationDefault(),
  projectId: 'greenlakes-companion-da17e',
});

const dir = dirname(fileURLToPath(import.meta.url));
const root = join(dir, '..', 'public', 'plot-photos');

const jobs = [
  { slug: 'nandi-hills-orchard-estate', folder: 'property1', name: 'Boho Living' },
  { slug: 'alibaug-coastal-plots', folder: 'property2', name: 'By The Creek' },
  { slug: 'green-haven-farmhouse', folder: 'property3', name: 'Green Haven' },
];

const natural = (files) =>
  files
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

const db = getFirestore();
for (const job of jobs) {
  const files = natural(readdirSync(join(root, job.folder)));
  if (files.length === 0) {
    console.log(`${job.slug}: no photos, skipped`);
    continue;
  }
  const gallery = files.map((f, i) => ({
    src: `/plot-photos/${job.folder}/${f}`,
    alt: i === 0 ? `${job.name}, main view` : `${job.name}, view ${i + 1}`,
  }));
  await db
    .collection('estates')
    .doc(job.slug)
    .set(
      {
        image: gallery[0].src,
        imageAlt: gallery[0].alt,
        gallery,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  console.log(`${job.slug}: ${gallery.length} photos`);
}
console.log('done');
process.exit(0);
