/**
 * ============================================================================
 * MASTER ADVISOR CONFIGURATION
 * ============================================================================
 * This is the single source of truth for who the advisor is and how visitors
 * reach him. Editing this file updates the whole site — the navbar, hero,
 * about section, contact section, footer, structured data, and every WhatsApp
 * link.
 *
 * Bilingual values use the shape { en: '...', ms: '...' }.
 * ============================================================================
 */

/**
 * WhatsApp number in international format: country code + number,
 * with no plus sign, spaces, dashes, or leading zero.
 * Malaysia (60) + 19-980 1317  ->  60199801317
 * Every WhatsApp link on the site is built from this one value.
 */
const WHATSAPP_NUMBER = '60199801317'

export const advisor = {
  // --- Identity -------------------------------------------------------------
  name: 'Danial Oza',
  title: { en: 'Life Advisor', ms: 'Penasihat Hayat' },
  company: 'AIA PUBLIC Takaful Berhad',
  qualification: {
    en: 'Registered AIA PUBLIC Takaful Life Advisor',
    ms: 'Penasihat Hayat AIA PUBLIC Takaful Berdaftar',
  },

  // --- Practice details -----------------------------------------------------
  experienceYears: 2,
  experienceLabel: { en: '2 years', ms: '2 tahun' },
  clientsHelped: '80+',
  languages: [
    { en: 'Bahasa Melayu', ms: 'Bahasa Melayu' },
    { en: 'English', ms: 'Bahasa Inggeris' },
  ],
  languagesShort: { en: 'Bahasa Melayu & English', ms: 'Bahasa Melayu & Inggeris' },
  location: { en: 'Throughout Malaysia', ms: 'Seluruh Malaysia' },
  locationShort: { en: 'Nationwide', ms: 'Seluruh negara' },

  consultationMethods: [
    { en: 'Physical consultation', ms: 'Perundingan fizikal' },
    { en: 'Online consultation', ms: 'Perundingan dalam talian' },
  ],
  consultationMethodsShort: {
    en: 'Physical & online',
    ms: 'Fizikal & dalam talian',
  },

  consultationFee: { en: 'Free', ms: 'Percuma' },

  availability: {
    days: { en: 'Every day', ms: 'Setiap hari' },
    contact: { en: 'Contact available 24 hours', ms: 'Hubungan tersedia 24 jam' },
    outsideHours: {
      en: 'Appointments outside normal working hours are available upon request.',
      ms: 'Temu janji di luar waktu bekerja biasa boleh diatur atas permintaan.',
    },
  },

  /**
   * Profile photo.
   * TO REPLACE: drop your photo in at `public/images/danial-oza.jpg`
   * (or update this path). A square image of at least 800x800px works best.
   * The dimensions below are used to reserve layout space and prevent the
   * page from shifting while the image loads — keep them square.
   */
  profileImage: '/images/danial-oza.jpg',
  profileImageWidth: 800,
  profileImageHeight: 800,

  // --- Biography (approved copy, restructured only for readability) ---------
  bio: {
    intro: {
      en: 'Danial Oza is a dedicated Life Advisor with AIA PUBLIC Takaful Berhad who has helped over 80 individuals and families secure their financial future through comprehensive takaful protection.',
      ms: 'Danial Oza ialah Penasihat Hayat yang berdedikasi bersama AIA PUBLIC Takaful Berhad dan telah membantu lebih 80 individu serta keluarga melindungi masa depan kewangan mereka melalui perlindungan takaful yang komprehensif.',
    },
    belief: {
      en: 'He believes that everyone deserves access to quality healthcare and financial security. He offers personalised solutions based on each client’s needs, priorities, lifestyle, and budget.',
      ms: 'Beliau percaya bahawa setiap orang berhak mendapat akses kepada penjagaan kesihatan yang berkualiti dan keselamatan kewangan. Beliau menawarkan penyelesaian yang diperibadikan berdasarkan keperluan, keutamaan, gaya hidup, dan bajet setiap klien.',
    },
    goal: {
      en: 'His goal is to build long-term relationships while providing honest, professional, responsive, and easy-to-understand service.',
      ms: 'Matlamat beliau adalah untuk membina hubungan jangka panjang sambil memberikan perkhidmatan yang jujur, profesional, responsif, dan mudah difahami.',
    },
  },

  // --- Contact --------------------------------------------------------------
  whatsappNumber: WHATSAPP_NUMBER,
  contact: {
    // Display versions are formatted for humans; `href` versions are machine-readable.
    whatsappDisplay: '+60 19-980 1317',
    phoneDisplay: '+60 19-980 1317',
    phoneHref: 'tel:+60199801317',
    email: 'danial.7615y@aia-premier.com.my',
    emailHref: 'mailto:danial.7615y@aia-premier.com.my',
  },

  social: [
    { id: 'instagram', label: 'Instagram', handle: '@brooldet', url: 'https://www.instagram.com/brooldet' },
    { id: 'facebook', label: 'Facebook', handle: 'Danial Oza', url: 'https://www.facebook.com/share/1BbVsTSDbK/' },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: 'Danial Ozarizan',
      url: 'https://www.linkedin.com/in/danial-ozarizan-1950a7368',
    },
    { id: 'tiktok', label: 'TikTok', handle: '@danialoza', url: 'https://www.tiktok.com/@danialoza' },
  ],

  /**
   * PLACEHOLDER — replace with the live domain once the site is deployed.
   * Used for the canonical URL, Open Graph tags, and structured data.
   */
  siteUrl: 'https://www.example.com',
}

/**
 * ============================================================================
 * WHATSAPP MESSAGE TEMPLATES
 * ============================================================================
 * The English text below is the advisor-approved wording and is sent verbatim.
 *
 * ⚠️ The Bahasa Melayu versions were drafted during this build and are
 *    PENDING ADVISOR APPROVAL. Review or rewrite them before launch.
 *
 * The message that gets sent follows the language the visitor has selected.
 * Dynamic details (name, date, questionnaire summary) are appended by the
 * builders in `src/utils/whatsapp.js`.
 * ============================================================================
 */
export const whatsappMessages = {
  /** Generic "I'd like to know more" enquiry — used by the floating button. */
  general: {
    en: 'Hi Danial, I found your website and would like to learn more about takaful protection.',
    // TRANSLATION — pending advisor approval
    ms: 'Hai Danial, saya menemui laman web anda dan ingin mengetahui lebih lanjut tentang perlindungan takaful.',
  },

  /** Opening line for an appointment request. */
  appointment: {
    en: "Hi! 👋 Thank you for reaching out to Danial Oza from AIA PUBLIC Takaful. I'd be happy to arrange a FREE consultation to understand your needs and recommend the most suitable protection plan for you and your family. Kindly let me know your preferred date and time. 😊",
    // TRANSLATION — pending advisor approval
    ms: 'Hai! 👋 Terima kasih kerana menghubungi Danial Oza dari AIA PUBLIC Takaful. Saya dengan senang hati akan mengatur perundingan PERCUMA untuk memahami keperluan anda dan mencadangkan pelan perlindungan yang paling sesuai untuk anda dan keluarga. Sila maklumkan tarikh dan masa pilihan anda. 😊',
  },

  /** Opening line sent with questionnaire results. */
  recommendation: {
    en: "Hi! 😊 Based on the information I've shared, I would like to discuss the takaful protection areas that may suit my needs and budget. I'd be happy to understand the coverage, benefits, limitations, and monthly contribution before making a decision.",
    // TRANSLATION — pending advisor approval
    ms: 'Hai! 😊 Berdasarkan maklumat yang saya kongsikan, saya ingin membincangkan bidang perlindungan takaful yang mungkin sesuai dengan keperluan dan bajet saya. Saya ingin memahami perlindungan, manfaat, batasan, dan caruman bulanan sebelum membuat keputusan.',
  },

  /**
   * Enquiry about one specific protection category.
   * `{service}` is replaced with the category name.
   */
  serviceEnquiry: {
    en: 'Hi Danial, I would like to learn more about {service}. Could you explain the general coverage, eligibility considerations, and available consultation process?',
    // TRANSLATION — pending advisor approval
    ms: 'Hai Danial, saya ingin mengetahui lebih lanjut tentang {service}. Boleh anda terangkan perlindungan umum, pertimbangan kelayakan, dan proses perundingan yang tersedia?',
  },

  /** Labels used when building the structured part of a message. */
  labels: {
    name: { en: 'Name', ms: 'Nama' },
    phone: { en: 'Phone', ms: 'Telefon' },
    consultationType: { en: 'Consultation type', ms: 'Jenis perundingan' },
    date: { en: 'Preferred date', ms: 'Tarikh pilihan' },
    time: { en: 'Preferred time', ms: 'Masa pilihan' },
    topic: { en: 'Main discussion area', ms: 'Bidang perbincangan utama' },
    note: { en: 'Note', ms: 'Nota' },
    ageRange: { en: 'Age range', ms: 'Julat umur' },
    employment: { en: 'Employment', ms: 'Pekerjaan' },
    dependants: { en: 'Dependants', ms: 'Tanggungan' },
    existingProtection: { en: 'Existing protection', ms: 'Perlindungan sedia ada' },
    concerns: { en: 'Main concerns', ms: 'Kebimbangan utama' },
    budget: { en: 'Budget range', ms: 'Julat bajet' },
    suggestedAreas: { en: 'Suggested discussion areas', ms: 'Bidang perbincangan yang dicadangkan' },
    interest: { en: 'Area of interest', ms: 'Bidang yang diminati' },
    preferredContact: { en: 'Preferred contact method', ms: 'Kaedah hubungan pilihan' },
    message: { en: 'Message', ms: 'Mesej' },
    appointmentDetails: { en: 'My consultation request', ms: 'Permintaan perundingan saya' },
    summaryHeading: { en: 'My questionnaire summary', ms: 'Ringkasan soal selidik saya' },
    none: { en: 'None selected', ms: 'Tiada dipilih' },
  },
}

export default advisor
