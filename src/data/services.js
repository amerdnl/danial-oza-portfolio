/**
 * The six takaful protection categories shown in the Services section.
 *
 * `id` values are also used by the recommendation engine to map its results
 * back to a category, so changing an id means updating
 * `src/utils/recommendationEngine.js` too.
 *
 * `icon` is a Lucide icon name, resolved in `ServiceCard.jsx`.
 *
 * Descriptions are written to explain what an area covers without promising
 * that any particular expense, benefit, or claim will be paid.
 */

export const services = [
  {
    id: 'medical-card',
    icon: 'HeartPulse',
    title: { en: 'Medical Card', ms: 'Kad Perubatan' },
    summary: {
      en: 'Provides coverage for hospitalisation, surgery, specialist consultations, and eligible medical expenses to help reduce financial burden during medical emergencies.',
      ms: 'Menyediakan perlindungan untuk kemasukan ke hospital, pembedahan, rundingan pakar, dan perbelanjaan perubatan yang layak bagi membantu mengurangkan beban kewangan semasa kecemasan perubatan.',
    },
    considerations: [
      { en: 'Hospitalisation', ms: 'Kemasukan ke hospital' },
      { en: 'Surgery', ms: 'Pembedahan' },
      { en: 'Eligible specialist consultation', ms: 'Rundingan pakar yang layak' },
      { en: 'Eligible medical expenses', ms: 'Perbelanjaan perubatan yang layak' },
      { en: 'Annual or lifetime coverage limits', ms: 'Had perlindungan tahunan atau seumur hidup' },
      { en: 'Room and board eligibility', ms: 'Kelayakan bilik dan penginapan' },
      { en: 'Waiting periods', ms: 'Tempoh menunggu' },
      { en: 'Policy exclusions', ms: 'Pengecualian polisi' },
    ],
  },
  {
    id: 'life-takaful',
    icon: 'ShieldCheck',
    title: { en: 'Life Takaful', ms: 'Takaful Hayat' },
    summary: {
      en: 'Offers financial protection for loved ones through death and Total Permanent Disability benefits, subject to the relevant certificate terms.',
      ms: 'Menawarkan perlindungan kewangan untuk orang tersayang melalui manfaat kematian dan Hilang Upaya Kekal Menyeluruh, tertakluk kepada terma sijil yang berkaitan.',
    },
    considerations: [
      { en: 'Death benefit', ms: 'Manfaat kematian' },
      { en: 'Total Permanent Disability benefit', ms: 'Manfaat Hilang Upaya Kekal Menyeluruh' },
      { en: 'Family financial support', ms: 'Sokongan kewangan keluarga' },
      { en: 'Outstanding financial commitments', ms: 'Komitmen kewangan tertunggak' },
      { en: 'Dependants', ms: 'Tanggungan' },
      { en: 'Income replacement needs', ms: 'Keperluan penggantian pendapatan' },
    ],
  },
  {
    id: 'critical-illness',
    icon: 'Activity',
    title: { en: 'Critical Illness Protection', ms: 'Perlindungan Penyakit Kritikal' },
    summary: {
      en: 'Provides a lump-sum payout upon diagnosis of eligible covered critical illnesses, helping clients focus on recovery and manage financial commitments.',
      ms: 'Menyediakan pembayaran sekaligus apabila disahkan menghidap penyakit kritikal yang layak dilindungi, membantu klien menumpukan pada pemulihan dan menguruskan komitmen kewangan.',
    },
    considerations: [
      { en: 'Covered critical illnesses', ms: 'Penyakit kritikal yang dilindungi' },
      { en: 'Recovery expenses', ms: 'Perbelanjaan pemulihan' },
      { en: 'Income interruption', ms: 'Gangguan pendapatan' },
      { en: 'Household commitments', ms: 'Komitmen isi rumah' },
      { en: 'Waiting periods', ms: 'Tempoh menunggu' },
      { en: 'Survival periods', ms: 'Tempoh kelangsungan hidup' },
      { en: 'Exclusions', ms: 'Pengecualian' },
    ],
  },
  {
    id: 'income-protection',
    icon: 'Wallet',
    title: { en: 'Income Protection', ms: 'Perlindungan Pendapatan' },
    summary: {
      en: 'Helps replace part of a client’s income in the event of disability or inability to work due to eligible covered circumstances.',
      ms: 'Membantu menggantikan sebahagian pendapatan klien sekiranya berlaku hilang upaya atau ketidakmampuan bekerja disebabkan keadaan yang layak dilindungi.',
    },
    considerations: [
      { en: 'Monthly income', ms: 'Pendapatan bulanan' },
      { en: 'Employment type', ms: 'Jenis pekerjaan' },
      { en: 'Emergency savings', ms: 'Simpanan kecemasan' },
      { en: 'Existing employer benefits', ms: 'Manfaat majikan sedia ada' },
      { en: 'Duration of income interruption', ms: 'Tempoh gangguan pendapatan' },
      { en: 'Disability-related protection', ms: 'Perlindungan berkaitan hilang upaya' },
    ],
  },
  {
    id: 'family-protection',
    icon: 'Users',
    title: { en: 'Family Protection', ms: 'Perlindungan Keluarga' },
    summary: {
      en: 'Comprehensive takaful planning designed to help protect spouses and children against unexpected financial risks.',
      ms: 'Perancangan takaful menyeluruh yang direka untuk membantu melindungi pasangan dan anak-anak daripada risiko kewangan yang tidak dijangka.',
    },
    considerations: [
      { en: 'Spouse', ms: 'Pasangan' },
      { en: 'Children', ms: 'Anak-anak' },
      { en: 'Household income', ms: 'Pendapatan isi rumah' },
      { en: 'Education commitments', ms: 'Komitmen pendidikan' },
      { en: 'Housing commitments', ms: 'Komitmen perumahan' },
      { en: 'Existing family protection', ms: 'Perlindungan keluarga sedia ada' },
      { en: 'Emergency financial support', ms: 'Sokongan kewangan kecemasan' },
    ],
  },
  {
    id: 'savings-legacy',
    icon: 'Landmark',
    title: { en: 'Savings and Legacy Planning', ms: 'Perancangan Simpanan dan Warisan' },
    summary: {
      en: 'Long-term plans that combine protection considerations with disciplined savings and legacy-planning goals.',
      ms: 'Pelan jangka panjang yang menggabungkan pertimbangan perlindungan dengan simpanan berdisiplin dan matlamat perancangan warisan.',
    },
    considerations: [
      { en: 'Long-term financial goals', ms: 'Matlamat kewangan jangka panjang' },
      { en: 'Family legacy', ms: 'Warisan keluarga' },
      { en: 'Beneficiaries', ms: 'Penerima manfaat' },
      { en: 'Education planning', ms: 'Perancangan pendidikan' },
      { en: 'Retirement preparation', ms: 'Persediaan persaraan' },
      { en: 'Protection duration', ms: 'Tempoh perlindungan' },
      { en: 'Affordability', ms: 'Kemampuan' },
    ],
  },
]

/** Quick lookup by id — used by the recommendation results. */
export const servicesById = Object.fromEntries(services.map((service) => [service.id, service]))

export default services
