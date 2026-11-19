export type Stake = {
  label: string;
  share: number;
  price: number;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Estate = {
  slug: string;
  name: string;
  shortName: string;
  kind: string;
  place: string;
  state: string;
  status: 'open' | 'coming-soon';
  summary: string;
  mood: string;
  image: string;
  imageAlt: string;
  valuation: number;
  stakes: Stake[];
  subscribedPct: number;
  targetIrr: number;
  holdMonths: number;
  areaAcres: number;
  areaSqft: number;
  spv: string;
  cin: string;
  map: 'nandi' | 'alibaug';
  gallery: GalleryImage[];
  showShare?: boolean;
};

// One estate, sold in four fractions: a half, a quarter, a sixth, a twelfth.
const STAKE_SHARES = [0.5, 0.25, 1 / 6, 1 / 12];

// Tokenisation is separate from fractionalisation. Each estate company issues
// the same number of tokens. Fractions are what you buy; tokens are how the
// register counts them. A 1/2 stake is 6,000 tokens; a 1/12 stake is 1,000.
export const TOKENS_PER_ESTATE = 12000;

export const tokensForShare = (share: number) => Math.round(share * TOKENS_PER_ESTATE);

export const tokenPriceFor = (estate: Estate) => estate.valuation / TOKENS_PER_ESTATE;

export const stakeLabel = (share: number) => `1/${Math.round(1 / share)}`;

export const stakesFor = (valuation: number): Stake[] =>
  STAKE_SHARES.map((share) => ({
    share,
    label: stakeLabel(share),
    price: Math.round((valuation * share) / 1000) * 1000,
  }));

export const entryStake = (estate: Estate) => estate.stakes[estate.stakes.length - 1];

export const equalStakes = (valuation: number, count: number): Stake[] =>
  Array.from({ length: count }, () => ({
    share: 1 / count,
    label: `1/${count}`,
    price: Math.round(valuation / count),
  }));

export const FEE_RATE = 0.015;
export const GST_RATE = 0.18;
export const feeFor = (amount: number) => Math.round(amount * FEE_RATE);
export const gstFor = (amount: number) => Math.round(amount * FEE_RATE * GST_RATE);

export const nandi: Estate = {
  slug: 'nandi-hills-orchard-estate',
  name: 'Nandi Hills Orchard Second Home',
  shortName: 'Nandi Hills',
  kind: 'Managed farmland',
  place: 'Near Nandi Hills, Chikkaballapur',
  state: 'Karnataka',
  status: 'open',
  summary:
    'Ten acres of mango and jackfruit orchard near Nandi Hills, 55 km from Bengaluru airport. Held by one company. Sold in fractions.',
  mood: 'Mango orchards below the Nandi Hills',
  image: '/plot-photos/property1/1.jpeg',
  imageAlt: 'White villa with a pool and lawns',
  valuation: 52000000,
  stakes: stakesFor(52000000),
  subscribedPct: 0.7,
  targetIrr: 14,
  holdMonths: 72,
  areaAcres: 10,
  areaSqft: 435600,
  spv: 'Green Lakes Nandi Hills SPV Private Limited',
  cin: 'U70100KA2025PTC100001',
  map: 'nandi',
  gallery: [
    { src: '/media/orchard-laterite.jpg', alt: 'Mango trees standing in red laterite soil' },
    { src: '/media/orchard-egrets.jpg', alt: 'Cattle egrets foraging in a mango orchard' },
    { src: '/media/nandi-fog.jpg', alt: 'Fog rolling over the Nandi Hills' },
  ],
};

export const alibaug: Estate = {
  slug: 'alibaug-coastal-plots',
  name: 'Alibaug Coastal Plots',
  shortName: 'Alibaug',
  kind: 'Residential land',
  place: 'Alibaug, Raigad',
  state: 'Maharashtra',
  status: 'coming-soon',
  summary:
    'Coastal land near Alibaug. Opens in fractions once diligence and layout approvals are done.',
  mood: 'A-frame cabin among the trees',
  image: '/plot-photos/property2/1.jpeg',
  imageAlt: 'A-frame cabin among trees at dusk',
  valuation: 71500000,
  stakes: equalStakes(71500000, 11),
  subscribedPct: 0,
  targetIrr: 16,
  holdMonths: 60,
  areaAcres: 6,
  areaSqft: 261360,
  spv: 'Green Lakes Alibaug SPV Private Limited',
  cin: 'U70100MH2026PTC000002',
  map: 'alibaug',
  gallery: [
    { src: '/plot-photos/property2/1.jpeg', alt: 'A-frame cabin among trees at dusk' },
    { src: '/plot-photos/property2/2.png', alt: 'Second home, view 2' },
    { src: '/plot-photos/property2/3.png', alt: 'Second home, view 3' },
    { src: '/plot-photos/property2/4.png', alt: 'Second home, view 4' },
    { src: '/plot-photos/property2/5.png', alt: 'Second home, view 5' },
    { src: '/plot-photos/property2/6.png', alt: 'Second home, view 6' },
    { src: '/plot-photos/property2/7.png', alt: 'Second home, view 7' },
    { src: '/plot-photos/property2/8.png', alt: 'Second home, view 8' },
    { src: '/plot-photos/property2/9.png', alt: 'Second home, view 9' },
    { src: '/plot-photos/property2/10.png', alt: 'Second home, view 10' },
    { src: '/plot-photos/property2/11.png', alt: 'Second home, view 11' },
    { src: '/plot-photos/property2/12.png', alt: 'Second home, view 12' },
  ],
  showShare: false,
};

export const estates: Estate[] = [nandi, alibaug];

export const nav = [
  { label: 'Explore land', to: '/explore' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Tokenisation', to: '/tokenisation' },
  { label: 'Why Green Lakes', to: '/why-green-lakes' },
];

export const compact = (n: number) =>
  n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

export const rupees = (n: number) =>
  '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });

const trimZeros = (n: number) => `${+n.toFixed(2)}`;

export const inrWords = (n: number) => {
  if (n >= 10000000) return `₹${trimZeros(n / 10000000)} Cr`;
  if (n >= 100000) return `₹${trimZeros(n / 100000)} L`;
  return rupees(n);
};

export const ownershipChain = [
  {
    title: 'The land',
    state: 'Verified',
    body: 'Independent lawyers check the title, encumbrance and survey before anything is listed.',
  },
  {
    title: 'One company',
    state: 'Holds title',
    body: 'An SPV is created for this one second home. It owns the land. Nothing else sits inside it.',
  },
  {
    title: 'Your fraction',
    state: 'Your share',
    body: 'You buy a fraction of that company. A share of the whole second home. Never a piece of ground.',
  },
  {
    title: 'A signed agreement',
    state: 'In your name',
    body: 'You e-sign a subscription agreement. The SPV register records your holding.',
  },
  {
    title: 'Escrow and settlement',
    state: 'Bank-held',
    body: 'Your money waits in a regulated escrow account. Shares are issued after KYC, signature and settlement clear.',
  },
];

export const steps = [
  {
    title: 'Open an account',
    time: '2 minutes',
    body: 'Phone or email. No paperwork. No site visit. No broker.',
  },
  {
    title: 'Complete KYC',
    time: 'Same day, usually',
    body: 'PAN, Aadhaar and a bank account in your name. Once done, it works for every second home.',
  },
  {
    title: 'Choose your fraction',
    time: '1 minute',
    body: 'Pick a second home and a fraction: a half, a quarter, a sixth or a twelfth. Every price is shown before you pay.',
  },
  {
    title: 'Sign and pay',
    time: 'E-sign',
    body: 'Sign the subscription agreement. Pay from your verified bank account into escrow.',
  },
  {
    title: 'Your stake lands in your portfolio',
    time: 'After settlement',
    body: 'Your fraction appears in your portfolio. Lease income comes quarterly. Land value is tracked yearly.',
  },
];

export const personas = [
  {
    title: 'First salary',
    body: 'Start with a twelfth. No minimum net worth. No full-plot cheque.',
  },
  {
    title: 'Building a portfolio',
    body: 'Land beside mutual funds and equity. A 5 to 7 year hold. Quarterly income.',
  },
  {
    title: 'NRI families',
    body: 'Own Indian land from abroad. Onboarding is handled case by case under FEMA rules.',
  },
  {
    title: 'Family offices',
    body: 'Take a half or a quarter. The large fractions suit large cheques.',
  },
];

export const faqs = [
  {
    q: 'Do I own a plot of land?',
    a: 'No. You own a fraction of the company that owns the whole second home. Your stake is a share of the land and its income. Not a boundary, a parcel number or a title deed.',
  },
  {
    q: 'What exactly is a fraction?',
    a: 'One company holds each second home. We sell equal fractions of that company. The count and the price are set per second home and shown before you pay. On Nandi Hills that is four fractions, from 1/2 to 1/12.',
  },
  {
    q: 'Who can invest?',
    a: 'Any Indian resident with a PAN, Aadhaar and a bank account in their name. NRIs can invest subject to FEMA rules and extra checks.',
  },
  {
    q: 'What is the minimum?',
    a: 'One twelfth of the second home. On Nandi Hills that is ₹43,33,000 at the current valuation. Every fraction price is shown before you pay.',
  },
  {
    q: 'How do I earn from it?',
    a: 'The orchard is leased to a working caretaker. Lease income goes to owners quarterly. Land value is revalued yearly. Both are targets, not promises.',
  },
  {
    q: 'Can I sell my stake?',
    a: 'Only if the second home is sold or another investor buys your stake. Land is illiquid. There may be no buyer before the hold ends.',
  },
  {
    q: 'What if Green Lakes shuts down?',
    a: 'The second home is owned by the SPV, not by Green Lakes. The company, its register and its agreements survive the platform. Your legal right comes from those documents, not from this website.',
  },
];

export const credits = [
  {
    title: 'Nandi Hills Orchard Second Home hero',
    by: 'Green Lakes listing photograph',
    licence: 'Property listing',
    href: '#',
  },
  {
    title: 'Mango orchard in lateritic plateau',
    by: 'Rohitjahnavi',
    licence: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Mango_orchard_in_lateritic_plateau.jpg',
  },
  {
    title: 'Mango orchards, Konkan',
    by: 'Rudolph.A.furtado',
    licence: 'CC0',
    href: 'https://commons.wikimedia.org/wiki/File:Mango_Orchards.JPG',
  },
  {
    title: 'Eastern cattle egrets in a mango orchard, India',
    by: 'Chethanreddytr',
    licence: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Eastern_Cattle_Egrets_in_a_Mango_orchard,_India.jpg',
  },
  {
    title: 'Fog on Nandi Hills',
    by: 'Wise Droid',
    licence: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/wiki/File:Fog_on_Nandi_Hills.jpg',
  },
  {
    title: 'Monsoon clouds over the Nandi Hills',
    by: 'Harsha K R',
    licence: 'CC BY-SA 2.0',
    href: 'https://commons.wikimedia.org/wiki/File:Monsoon_clouds_over_the_Nandi_Hills_India.jpg',
  },
  {
    title: 'Alibaug beach',
    by: 'Nagesh Kamath',
    licence: 'CC BY-SA 2.0',
    href: 'https://www.flickr.com/photos/62274725@N00/2951327831',
  },
  {
    title: 'Aerial view of agricultural fields in Punjab, India',
    by: 'Bhullargraphic',
    licence: 'CC BY-SA 4.0',
    href: 'https://commons.wikimedia.org/w/index.php?curid=197290623',
  },
];
