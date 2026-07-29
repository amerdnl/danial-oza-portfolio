/**
 * Interface strings (navigation, buttons, form labels, validation messages).
 *
 * Long-form *content* lives in `src/data/*` instead — this file is for the
 * chrome around it.
 *
 * NOTE ON TRANSLATIONS
 * The English text is the authoritative version. The Bahasa Melayu strings
 * were drafted for this build and should be reviewed by Danial before launch,
 * particularly anything describing coverage, eligibility, or approval.
 */

export const seo = {
  title: {
    en: 'Danial Oza | Life Advisor and Takaful Consultation Malaysia',
    ms: 'Danial Oza | Penasihat Hayat dan Perundingan Takaful Malaysia',
  },
  description: {
    en: 'Get personalised takaful guidance from Danial Oza, a registered AIA PUBLIC Takaful Life Advisor serving clients throughout Malaysia through physical and online consultations.',
    ms: 'Dapatkan panduan takaful yang diperibadikan daripada Danial Oza, Penasihat Hayat AIA PUBLIC Takaful berdaftar yang berkhidmat di seluruh Malaysia melalui perundingan fizikal dan dalam talian.',
  },
}

export const nav = {
  home: { en: 'Home', ms: 'Utama' },
  about: { en: 'About', ms: 'Tentang' },
  services: { en: 'Services', ms: 'Perkhidmatan' },
  recommendation: { en: 'Recommendation', ms: 'Cadangan' },
  achievements: { en: 'Achievements', ms: 'Pencapaian' },
  faq: { en: 'FAQ', ms: 'Soalan Lazim' },
  contact: { en: 'Contact', ms: 'Hubungi' },
  bookConsultation: { en: 'Book Consultation', ms: 'Tempah Perundingan' },
  openMenu: { en: 'Open navigation menu', ms: 'Buka menu navigasi' },
  closeMenu: { en: 'Close navigation menu', ms: 'Tutup menu navigasi' },
  skipToContent: { en: 'Skip to main content', ms: 'Langkau ke kandungan utama' },
  languageLabel: { en: 'Select language', ms: 'Pilih bahasa' },
  primaryNavigation: { en: 'Primary', ms: 'Utama' },
  breadcrumb: { en: 'Breadcrumb', ms: 'Laluan halaman' },
}

/**
 * Theme toggle wording. The label always describes what pressing the button
 * WILL DO, which is the clearer pattern for screen-reader users.
 */
export const theme = {
  switchToLight: { en: 'Switch to light mode', ms: 'Tukar ke mod cerah' },
  switchToDark: { en: 'Switch to dark mode', ms: 'Tukar ke mod gelap' },
  lightMode: { en: 'Light mode', ms: 'Mod cerah' },
  darkMode: { en: 'Dark mode', ms: 'Mod gelap' },
}

/**
 * Per-route page metadata and page-header copy.
 * Keys match the `key` field in src/routes/navItems.js.
 */
export const routeMeta = {
  home: {
    title: {
      en: 'Danial Oza | Life Advisor and Takaful Consultation Malaysia',
      ms: 'Danial Oza | Penasihat Hayat dan Perundingan Takaful Malaysia',
    },
    description: seo.description,
  },
  about: {
    title: {
      en: 'About Danial Oza | Registered Life Advisor',
      ms: 'Tentang Danial Oza | Penasihat Hayat Berdaftar',
    },
    description: {
      en: 'Learn about Danial Oza, a registered AIA PUBLIC Takaful Life Advisor with two years of experience helping over 80 individuals and families across Malaysia.',
      ms: 'Ketahui tentang Danial Oza, Penasihat Hayat AIA PUBLIC Takaful berdaftar dengan dua tahun pengalaman membantu lebih 80 individu dan keluarga di seluruh Malaysia.',
    },
    heading: { en: 'About Danial', ms: 'Tentang Danial' },
    intro: {
      en: 'A registered Life Advisor with AIA PUBLIC Takaful Berhad, working with individuals and families throughout Malaysia.',
      ms: 'Penasihat Hayat berdaftar dengan AIA PUBLIC Takaful Berhad, bekerja bersama individu dan keluarga di seluruh Malaysia.',
    },
  },
  services: {
    title: {
      en: 'Takaful Services | Danial Oza Life Advisor',
      ms: 'Perkhidmatan Takaful | Danial Oza Penasihat Hayat',
    },
    description: {
      en: 'Explore six takaful protection areas — medical card, life takaful, critical illness, income protection, family protection, and savings and legacy planning.',
      ms: 'Terokai enam bidang perlindungan takaful — kad perubatan, takaful hayat, penyakit kritikal, perlindungan pendapatan, perlindungan keluarga, serta perancangan simpanan dan warisan.',
    },
    heading: { en: 'Takaful Services', ms: 'Perkhidmatan Takaful' },
    intro: {
      en: 'Six protection areas, each covering a different kind of financial risk. Most people review two or three together.',
      ms: 'Enam bidang perlindungan, setiap satu meliputi jenis risiko kewangan yang berbeza. Kebanyakan orang menyemak dua atau tiga secara bersama.',
    },
  },
  recommendation: {
    title: {
      en: 'Takaful Recommendation Tool | Danial Oza',
      ms: 'Alat Cadangan Takaful | Danial Oza',
    },
    description: {
      en: 'Answer a few questions to see which general takaful protection areas may be worth discussing. Educational only — no medical or banking details are collected.',
      ms: 'Jawab beberapa soalan untuk melihat bidang perlindungan takaful umum yang mungkin wajar dibincangkan. Untuk pendidikan sahaja — tiada maklumat perubatan atau perbankan dikumpulkan.',
    },
    heading: { en: 'Get a General Recommendation', ms: 'Dapatkan Cadangan Umum' },
    intro: {
      en: 'About two minutes. Your answers stay in your browser and nothing is submitted until you choose to send them.',
      ms: 'Kira-kira dua minit. Jawapan anda kekal dalam pelayar anda dan tiada apa-apa dihantar sehingga anda memilih untuk menghantarnya.',
    },
  },
  achievements: {
    title: {
      en: 'Professional Milestones | Danial Oza',
      ms: 'Pencapaian Profesional | Danial Oza',
    },
    description: {
      en: 'Internal recognition received by Danial Oza during his time as a Life Advisor with AIA PUBLIC Takaful Berhad.',
      ms: 'Pengiktirafan dalaman yang diterima Danial Oza sepanjang tempoh beliau sebagai Penasihat Hayat dengan AIA PUBLIC Takaful Berhad.',
    },
    heading: { en: 'Professional Milestones', ms: 'Pencapaian Profesional' },
    intro: {
      en: 'Recognition received within AIA PUBLIC Takaful Berhad, alongside the numbers behind the work.',
      ms: 'Pengiktirafan yang diterima dalam AIA PUBLIC Takaful Berhad, bersama angka di sebalik kerja tersebut.',
    },
  },
  faq: {
    title: {
      en: 'Takaful FAQ | Danial Oza Life Advisor',
      ms: 'Soalan Lazim Takaful | Danial Oza Penasihat Hayat',
    },
    description: {
      en: 'Clear answers about takaful basics, applications, eligibility, medical conditions, contributions, waiting periods, exclusions, and claims.',
      ms: 'Jawapan jelas tentang asas takaful, permohonan, kelayakan, keadaan perubatan, caruman, tempoh menunggu, pengecualian, dan tuntutan.',
    },
    heading: { en: 'Frequently Asked Questions', ms: 'Soalan Lazim' },
    intro: {
      en: 'Straight answers to the questions people ask most often before a first consultation.',
      ms: 'Jawapan yang jelas kepada soalan yang paling kerap ditanya sebelum perundingan pertama.',
    },
  },
  contact: {
    title: {
      en: 'Book a Free Takaful Consultation | Danial Oza',
      ms: 'Tempah Perundingan Takaful Percuma | Danial Oza',
    },
    description: {
      en: 'Contact Danial Oza for a free takaful consultation. Available every day, nationwide, in person or online, in Bahasa Melayu or English.',
      ms: 'Hubungi Danial Oza untuk perundingan takaful percuma. Tersedia setiap hari, di seluruh Malaysia, secara bersemuka atau dalam talian, dalam Bahasa Melayu atau Bahasa Inggeris.',
    },
    heading: { en: 'Contact and Consultation', ms: 'Hubungi dan Perundingan' },
    intro: {
      en: 'Free, with no obligation to proceed. Reach out through whichever channel is easiest for you.',
      ms: 'Percuma, tanpa kewajipan untuk meneruskannya. Hubungi saya melalui saluran yang paling mudah untuk anda.',
    },
  },
  notFound: {
    title: { en: 'Page Not Found | Danial Oza', ms: 'Halaman Tidak Dijumpai | Danial Oza' },
    description: {
      en: 'The page you were looking for could not be found.',
      ms: 'Halaman yang anda cari tidak dapat ditemui.',
    },
  },
}

/**
 * Home-page preview blocks.
 * Each preview shows a shortened version of a section and links to the full
 * page, so nothing long is duplicated across routes.
 */
export const previews = {
  learnAboutDanial: { en: 'Learn more about Danial', ms: 'Ketahui lanjut tentang Danial' },
  exploreAllServices: {
    en: 'Explore all takaful services',
    ms: 'Terokai semua perkhidmatan takaful',
  },
  getYourRecommendation: { en: 'Get your recommendation', ms: 'Dapatkan cadangan anda' },
  viewMilestones: { en: 'View professional milestones', ms: 'Lihat pencapaian profesional' },
  readCommonQuestions: { en: 'Read common questions', ms: 'Baca soalan lazim' },
  seeWhoIWorkWith: { en: 'See who I work with', ms: 'Lihat dengan siapa saya bekerja' },
  seeHowIWork: { en: 'See how I work', ms: 'Lihat cara saya bekerja' },
  seeFullProcess: { en: 'See the full process', ms: 'Lihat proses penuh' },

  /** Recommendation explainer shown on the home page instead of the form. */
  recommendationTeaser: {
    heading: {
      en: 'Not sure which protection to look at first?',
      ms: 'Tidak pasti perlindungan mana yang perlu dilihat dahulu?',
    },
    body: {
      en: 'A short questionnaire suggests which general protection areas may be worth discussing, based on your life stage, existing coverage, responsibilities, and budget. It takes about two minutes, collects no medical or banking details, and is educational only.',
      ms: 'Soal selidik ringkas mencadangkan bidang perlindungan umum yang mungkin wajar dibincangkan, berdasarkan peringkat kehidupan, perlindungan sedia ada, tanggungjawab, dan bajet anda. Ia mengambil masa kira-kira dua minit, tidak mengumpul maklumat perubatan atau perbankan, dan bertujuan pendidikan sahaja.',
    },
    points: [
      { en: 'About 2 minutes', ms: 'Kira-kira 2 minit' },
      { en: 'No medical or banking details', ms: 'Tiada maklumat perubatan atau perbankan' },
      { en: 'Educational, not a quote', ms: 'Pendidikan, bukan sebut harga' },
    ],
  },

  /** Closing call-to-action band at the bottom of the home page. */
  finalCta: {
    heading: {
      en: 'Ready to talk it through?',
      ms: 'Bersedia untuk membincangkannya?',
    },
    body: {
      en: 'A consultation is free, available anywhere in Malaysia, and carries no obligation to proceed. We can meet in person or speak online, in Bahasa Melayu or English.',
      ms: 'Perundingan adalah percuma, tersedia di mana-mana di Malaysia, dan tanpa kewajipan untuk meneruskannya. Kita boleh bertemu secara bersemuka atau berbual dalam talian, dalam Bahasa Melayu atau Bahasa Inggeris.',
    },
  },
}

/** Copy for the 404 page. */
export const notFound = {
  code: { en: '404', ms: '404' },
  heading: { en: 'Page Not Found', ms: 'Halaman Tidak Dijumpai' },
  body: {
    en: 'The page you were looking for does not exist, or it may have moved. The links below will get you back on track.',
    ms: 'Halaman yang anda cari tidak wujud, atau mungkin telah dipindahkan. Pautan di bawah akan membawa anda kembali.',
  },
  backHome: { en: 'Back to home', ms: 'Kembali ke laman utama' },
  contactDanial: { en: 'Contact Danial', ms: 'Hubungi Danial' },
}

export const cta = {
  bookFree: { en: 'Book a Free Consultation', ms: 'Tempah Perundingan Percuma' },
  getRecommendation: { en: 'Get a Recommendation', ms: 'Dapatkan Cadangan' },
  chatWhatsApp: { en: 'Chat on WhatsApp', ms: 'Sembang di WhatsApp' },
  learnMore: { en: 'Learn more', ms: 'Ketahui lanjut' },
  showLess: { en: 'Show less', ms: 'Tunjuk kurang' },
  askAboutThis: { en: 'Ask about this', ms: 'Tanya tentang ini' },
  startQuestionnaire: { en: 'Start the questionnaire', ms: 'Mulakan soal selidik' },
  openWhatsApp: { en: 'Open WhatsApp', ms: 'Buka WhatsApp' },
  floatingWhatsApp: {
    en: 'Chat with Danial on WhatsApp',
    ms: 'Sembang dengan Danial di WhatsApp',
  },
}

export const hero = {
  headline: {
    en: 'Protect What Matters Most With Guidance You Can Trust',
    ms: 'Lindungi Apa Yang Paling Bermakna Dengan Panduan Yang Anda Boleh Percayai',
  },
  supporting: {
    en: 'I help individuals, families, professionals, and business owners understand their takaful options and choose protection that suits their needs, priorities, and budget.',
    ms: 'Saya membantu individu, keluarga, profesional, dan pemilik perniagaan memahami pilihan takaful mereka serta memilih perlindungan yang sesuai dengan keperluan, keutamaan, dan bajet mereka.',
  },
  photoAlt: {
    en: 'Portrait of Danial Oza, Life Advisor with AIA PUBLIC Takaful Berhad',
    ms: 'Potret Danial Oza, Penasihat Hayat dengan AIA PUBLIC Takaful Berhad',
  },
  photoPlaceholderNote: {
    en: 'Placeholder image — replace public/images/danial-oza.jpg with the advisor photo.',
    ms: 'Imej sementara — gantikan public/images/danial-oza.jpg dengan foto penasihat.',
  },
}

export const sections = {
  about: {
    eyebrow: { en: 'About Danial', ms: 'Tentang Danial' },
    heading: {
      en: 'A Life Advisor Focused on Understanding You First',
      ms: 'Penasihat Hayat Yang Mengutamakan Pemahaman Tentang Anda',
    },
  },
  whyChoose: {
    eyebrow: { en: 'Why Choose Danial', ms: 'Mengapa Pilih Danial' },
    heading: {
      en: 'How I Work With Every Client',
      ms: 'Cara Saya Bekerja Dengan Setiap Klien',
    },
    intro: {
      en: 'Protection decisions last for years, so the process should be clear, unhurried, and honest from the very first conversation.',
      ms: 'Keputusan perlindungan berkekalan bertahun-tahun, jadi prosesnya perlu jelas, tidak tergesa-gesa, dan jujur dari perbualan pertama lagi.',
    },
  },
  services: {
    eyebrow: { en: 'Protection Categories', ms: 'Kategori Perlindungan' },
    heading: {
      en: 'Takaful Protection Areas I Can Help You Review',
      ms: 'Bidang Perlindungan Takaful Yang Boleh Saya Bantu Anda Semak',
    },
    intro: {
      en: 'Each area covers a different type of financial risk. Most people review two or three of them together, depending on their circumstances.',
      ms: 'Setiap bidang meliputi jenis risiko kewangan yang berbeza. Kebanyakan orang menyemak dua atau tiga daripadanya secara bersama, bergantung pada keadaan masing-masing.',
    },
    considerationsLabel: {
      en: 'Points we may discuss',
      ms: 'Perkara yang mungkin kita bincangkan',
    },
    disclaimer: {
      en: 'Coverage, eligibility, benefits, exclusions, waiting periods, contributions, and approval are subject to the relevant takaful certificate, provider requirements, and individual assessment.',
      ms: 'Perlindungan, kelayakan, manfaat, pengecualian, tempoh menunggu, caruman, dan kelulusan adalah tertakluk kepada sijil takaful yang berkaitan, keperluan pengendali, dan penilaian individu.',
    },
  },
  clientTypes: {
    eyebrow: { en: 'Who I Work With', ms: 'Dengan Siapa Saya Bekerja' },
    heading: {
      en: 'Protection for Different Stages of Life',
      ms: 'Perlindungan Untuk Peringkat Kehidupan Yang Berbeza',
    },
    intro: {
      en: 'Priorities change as life changes. These are common starting points — your own situation may look different.',
      ms: 'Keutamaan berubah apabila kehidupan berubah. Ini adalah titik permulaan yang biasa — keadaan anda sendiri mungkin berbeza.',
    },
    responsibilities: { en: 'Common responsibilities', ms: 'Tanggungjawab biasa' },
    concerns: { en: 'Common concerns', ms: 'Kebimbangan biasa' },
    mayReview: { en: 'Areas you may consider reviewing', ms: 'Bidang yang anda mungkin pertimbangkan untuk disemak' },
  },
  process: {
    eyebrow: { en: 'The Process', ms: 'Proses' },
    heading: {
      en: 'How a Consultation Works',
      ms: 'Bagaimana Perundingan Dijalankan',
    },
    intro: {
      en: 'Five straightforward steps, with no obligation to proceed at any point.',
      ms: 'Lima langkah yang mudah, tanpa sebarang kewajipan untuk meneruskannya pada bila-bila peringkat.',
    },
    stepLabel: { en: 'Step', ms: 'Langkah' },
  },
  achievements: {
    eyebrow: { en: 'Recognition', ms: 'Pengiktirafan' },
    heading: { en: 'Professional Milestones', ms: 'Pencapaian Profesional' },
    intro: {
      en: 'Internal recognition received during my time with AIA PUBLIC Takaful Berhad.',
      ms: 'Pengiktirafan dalaman yang diterima sepanjang tempoh saya bersama AIA PUBLIC Takaful Berhad.',
    },
  },
  faq: {
    eyebrow: { en: 'Questions', ms: 'Soalan' },
    heading: { en: 'Frequently Asked Questions', ms: 'Soalan Lazim' },
    intro: {
      en: 'Straight answers to the questions people ask most often before a first consultation.',
      ms: 'Jawapan yang jelas kepada soalan yang paling kerap ditanya sebelum perundingan pertama.',
    },
    stillHaveQuestions: {
      en: 'Still have a question? Send it over on WhatsApp — there is no cost and no obligation.',
      ms: 'Masih ada soalan? Hantarkan melalui WhatsApp — tanpa sebarang kos dan tanpa sebarang kewajipan.',
    },
  },
  contact: {
    eyebrow: { en: 'Get in Touch', ms: 'Hubungi Saya' },
    heading: { en: 'Start With a Free Conversation', ms: 'Mulakan Dengan Perbualan Percuma' },
    intro: {
      en: 'Reach out through whichever channel is easiest for you. Consultations are free, available nationwide, and can be held in person or online.',
      ms: 'Hubungi saya melalui saluran yang paling mudah untuk anda. Perundingan adalah percuma, tersedia di seluruh Malaysia, dan boleh diadakan secara bersemuka atau dalam talian.',
    },
    directChannels: { en: 'Direct channels', ms: 'Saluran terus' },
    followAlong: { en: 'Follow along', ms: 'Ikuti saya' },
    goodToKnow: { en: 'Good to know', ms: 'Perkara yang baik diketahui' },
  },
}

export const trustBar = {
  clientsHelped: { en: 'Clients helped', ms: 'Klien dibantu' },
  experience: { en: 'Years of experience', ms: 'Tahun pengalaman' },
  consultationFee: { en: 'Consultation fee', ms: 'Yuran perundingan' },
  coverage: { en: 'Service coverage', ms: 'Liputan perkhidmatan' },
  languages: { en: 'Languages', ms: 'Bahasa' },
  consultationTypes: { en: 'Consultation options', ms: 'Pilihan perundingan' },
}

/**
 * The opening experience — a brief loading screen shown once per browser
 * session before the portfolio is revealed.
 *
 * Purely presentational: nothing here describes data being processed, and no
 * technical or financial claims are made while loading.
 */
export const intro = {
  loadingA11y: {
    en: "Loading Danial Oza's portfolio",
    ms: 'Memuatkan portfolio Danial Oza',
  },
}

/**
 * Statistics shown in the About section on the home page.
 *
 * `*A11y` strings are the single, stable sentence a screen reader announces
 * for each figure. The visible number animates and is hidden from assistive
 * technology, so this is where the meaning actually lives — keep it in step
 * with the values in src/data/advisor.js.
 */
export const stats = {
  clientsHelpedLabel: { en: 'clients helped', ms: 'klien dibantu' },
  clientsHelpedA11y: {
    en: 'More than 80 clients helped',
    ms: 'Lebih 80 klien dibantu',
  },
  experienceLabel: { en: 'experience', ms: 'pengalaman' },
  experienceA11y: {
    en: '2 years of experience as a Life Advisor',
    ms: '2 tahun pengalaman sebagai Penasihat Hayat',
  },
  consultationLabel: { en: 'consultation', ms: 'perundingan' },
  consultationA11y: {
    en: 'Consultation is free of charge',
    ms: 'Perundingan adalah percuma',
  },
}

export const recommendation = {
  eyebrow: { en: 'Recommendation Tool', ms: 'Alat Cadangan' },
  heading: {
    en: 'Find Out Which Protection Areas to Discuss',
    ms: 'Ketahui Bidang Perlindungan Yang Perlu Dibincangkan',
  },
  intro: {
    en: 'Answer a few questions and this tool will suggest general protection areas worth discussing. It takes about two minutes, collects no medical or banking details, and is educational only.',
    ms: 'Jawab beberapa soalan dan alat ini akan mencadangkan bidang perlindungan umum yang wajar dibincangkan. Ia mengambil masa kira-kira dua minit, tidak mengumpul sebarang maklumat perubatan atau perbankan, dan bertujuan pendidikan sahaja.',
  },
  stepOf: { en: 'Step {current} of {total}', ms: 'Langkah {current} daripada {total}' },
  progressLabel: { en: 'Questionnaire progress', ms: 'Kemajuan soal selidik' },
  back: { en: 'Back', ms: 'Kembali' },
  next: { en: 'Next', ms: 'Seterusnya' },
  seeResults: { en: 'See my results', ms: 'Lihat keputusan saya' },
  startOver: { en: 'Start over', ms: 'Mula semula' },
  selectOne: { en: 'Select one option', ms: 'Pilih satu pilihan' },
  selectMultiple: {
    en: 'Select all that apply',
    ms: 'Pilih semua yang berkaitan',
  },
  requiredError: {
    en: 'Please answer this question before continuing.',
    ms: 'Sila jawab soalan ini sebelum meneruskan.',
  },
  requiredMultiError: {
    en: 'Please select at least one option before continuing.',
    ms: 'Sila pilih sekurang-kurangnya satu pilihan sebelum meneruskan.',
  },
  incompleteStep: {
    en: 'Some questions on this step still need an answer.',
    ms: 'Beberapa soalan pada langkah ini masih memerlukan jawapan.',
  },
  resultsHeading: {
    en: 'Protection Areas Worth Discussing',
    ms: 'Bidang Perlindungan Yang Wajar Dibincangkan',
  },
  resultsIntro: {
    en: 'Based only on what you selected, these are the general areas that may be relevant to your situation. They are listed as discussion starting points, not as products or decisions.',
    ms: 'Berdasarkan pilihan anda sahaja, ini adalah bidang umum yang mungkin berkaitan dengan keadaan anda. Ia disenaraikan sebagai titik permulaan perbincangan, bukan sebagai produk atau keputusan.',
  },
  whyRelevant: { en: 'Why this may be relevant', ms: 'Mengapa ini mungkin berkaitan' },
  limitationsHeading: { en: 'Important limitations', ms: 'Batasan penting' },
  nextStepHeading: { en: 'Suggested next step', ms: 'Langkah seterusnya yang dicadangkan' },
  nextStepBody: {
    en: 'Share these results with Danial on WhatsApp. He can explain what each area actually covers, what it does not cover, and roughly what it involves — before you decide anything.',
    ms: 'Kongsikan keputusan ini dengan Danial melalui WhatsApp. Beliau boleh menerangkan apa yang sebenarnya dilindungi oleh setiap bidang, apa yang tidak dilindungi, dan secara kasar apa yang terlibat — sebelum anda membuat sebarang keputusan.',
  },
  sendResults: { en: 'Send my results on WhatsApp', ms: 'Hantar keputusan saya di WhatsApp' },
  yourAnswers: { en: 'Your answers', ms: 'Jawapan anda' },
  disclaimer: {
    en: 'This recommendation is based only on the information selected in this questionnaire and is intended for general educational purposes. It is not a personalised financial recommendation, medical assessment, or guarantee of eligibility. Final suitability, contributions, coverage, exclusions, waiting periods, and approval are subject to further consultation and the relevant takaful provider’s terms and assessment.',
    ms: 'Cadangan ini berdasarkan maklumat yang dipilih dalam soal selidik ini sahaja dan bertujuan untuk pendidikan umum. Ia bukan cadangan kewangan yang diperibadikan, penilaian perubatan, atau jaminan kelayakan. Kesesuaian akhir, caruman, perlindungan, pengecualian, tempoh menunggu, dan kelulusan adalah tertakluk kepada perundingan lanjut serta terma dan penilaian pengendali takaful yang berkaitan.',
  },
  privacyNote: {
    en: 'Your answers stay in your browser. Nothing is submitted or stored until you choose to send them on WhatsApp.',
    ms: 'Jawapan anda kekal dalam pelayar anda. Tiada apa-apa dihantar atau disimpan sehingga anda memilih untuk menghantarnya melalui WhatsApp.',
  },
}

export const booking = {
  eyebrow: { en: 'Free Consultation', ms: 'Perundingan Percuma' },
  heading: { en: 'Book a Free Consultation', ms: 'Tempah Perundingan Percuma' },
  intro: {
    en: 'Tell me when suits you and what you would like to discuss. There is no fee and no obligation to proceed.',
    ms: 'Beritahu saya masa yang sesuai untuk anda dan perkara yang ingin anda bincangkan. Tiada yuran dan tiada kewajipan untuk meneruskannya.',
  },
  fullName: { en: 'Full name', ms: 'Nama penuh' },
  phone: { en: 'Phone number', ms: 'Nombor telefon' },
  consultationType: { en: 'Preferred consultation type', ms: 'Jenis perundingan pilihan' },
  date: { en: 'Preferred date', ms: 'Tarikh pilihan' },
  time: { en: 'Preferred time', ms: 'Masa pilihan' },
  topic: { en: 'Main discussion area', ms: 'Bidang perbincangan utama' },
  note: { en: 'Additional note', ms: 'Nota tambahan' },
  noteOptional: { en: 'Optional', ms: 'Pilihan' },
  notePlaceholder: {
    en: 'Anything you would like me to prepare before we speak',
    ms: 'Apa-apa yang anda ingin saya sediakan sebelum kita berbincang',
  },
  namePlaceholder: { en: 'e.g. Ahmad bin Ismail', ms: 'cth. Ahmad bin Ismail' },
  phonePlaceholder: { en: 'e.g. 012-345 6789', ms: 'cth. 012-345 6789' },
  selectPlaceholder: { en: 'Please select', ms: 'Sila pilih' },
  consent: {
    en: 'I agree to be contacted on WhatsApp about this consultation request.',
    ms: 'Saya bersetuju untuk dihubungi melalui WhatsApp berkenaan permintaan perundingan ini.',
  },
  submit: { en: 'Send request on WhatsApp', ms: 'Hantar permintaan di WhatsApp' },
  notice: {
    en: 'Submitting this form will open WhatsApp with your appointment details. Your appointment is only confirmed after Danial replies.',
    ms: 'Menghantar borang ini akan membuka WhatsApp dengan butiran temu janji anda. Temu janji anda hanya disahkan selepas Danial membalas.',
  },
  outsideHours: {
    en: 'Appointments outside normal working hours can be arranged on request.',
    ms: 'Temu janji di luar waktu bekerja biasa boleh diatur atas permintaan.',
  },
}

export const contactForm = {
  heading: { en: 'Send a message', ms: 'Hantar mesej' },
  fullName: { en: 'Full name', ms: 'Nama penuh' },
  phone: { en: 'Phone number', ms: 'Nombor telefon' },
  email: { en: 'Email address', ms: 'Alamat e-mel' },
  preferredMethod: { en: 'Preferred contact method', ms: 'Kaedah hubungan pilihan' },
  interest: { en: 'Area of interest', ms: 'Bidang yang diminati' },
  message: { en: 'Message', ms: 'Mesej' },
  messagePlaceholder: {
    en: 'What would you like to know?',
    ms: 'Apa yang ingin anda ketahui?',
  },
  emailPlaceholder: { en: 'e.g. name@example.com', ms: 'cth. nama@contoh.com' },
  consent: {
    en: 'I agree to be contacted using the method I selected above.',
    ms: 'Saya bersetuju untuk dihubungi menggunakan kaedah yang saya pilih di atas.',
  },
  submitWhatsApp: { en: 'Send on WhatsApp', ms: 'Hantar di WhatsApp' },
  submitEmail: { en: 'Open email draft', ms: 'Buka draf e-mel' },
  sensitiveNotice: {
    en: 'Please do not submit medical reports, identity-card numbers, banking details, certificate numbers, passwords, or other sensitive personal information through this form.',
    ms: 'Sila jangan hantar laporan perubatan, nombor kad pengenalan, butiran perbankan, nombor sijil, kata laluan, atau maklumat peribadi sensitif lain melalui borang ini.',
  },
  noStorageNotice: {
    en: 'This website has no database. Your details are placed directly into a WhatsApp or email draft on your own device — nothing is stored here.',
    ms: 'Laman web ini tiada pangkalan data. Butiran anda dimasukkan terus ke dalam draf WhatsApp atau e-mel pada peranti anda sendiri — tiada apa-apa disimpan di sini.',
  },
}

export const validation = {
  required: { en: 'This field is required.', ms: 'Ruangan ini diperlukan.' },
  nameTooShort: {
    en: 'Please enter your full name (at least 2 characters).',
    ms: 'Sila masukkan nama penuh anda (sekurang-kurangnya 2 aksara).',
  },
  phoneInvalid: {
    en: 'Please enter a valid Malaysian phone number, for example 012-345 6789.',
    ms: 'Sila masukkan nombor telefon Malaysia yang sah, contohnya 012-345 6789.',
  },
  emailInvalid: {
    en: 'Please enter a valid email address.',
    ms: 'Sila masukkan alamat e-mel yang sah.',
  },
  dateInPast: {
    en: 'Please choose today’s date or a later date.',
    ms: 'Sila pilih tarikh hari ini atau tarikh kemudian.',
  },
  consentRequired: {
    en: 'Please tick this box so I know how to reach you.',
    ms: 'Sila tandakan kotak ini supaya saya tahu cara menghubungi anda.',
  },
  messageTooShort: {
    en: 'Please write a short message (at least 10 characters).',
    ms: 'Sila tulis mesej ringkas (sekurang-kurangnya 10 aksara).',
  },
  formHasErrors: {
    en: 'Please check the highlighted fields below.',
    ms: 'Sila semak ruangan yang ditandakan di bawah.',
  },
  required_short: { en: 'Required', ms: 'Wajib' },
}

export const footer = {
  tagline: {
    en: 'Helping individuals and families across Malaysia understand their takaful options and make informed protection decisions.',
    ms: 'Membantu individu dan keluarga di seluruh Malaysia memahami pilihan takaful mereka dan membuat keputusan perlindungan yang termaklum.',
  },
  navigate: { en: 'Navigate', ms: 'Navigasi' },
  contactHeading: { en: 'Contact', ms: 'Hubungi' },
  followHeading: { en: 'Follow', ms: 'Ikuti' },
  privacyHeading: { en: 'Privacy notice', ms: 'Notis privasi' },
  privacyBody: {
    en: 'This website does not use tracking or advertising scripts and has no database. Details you type into the forms are used only to prepare a WhatsApp or email message on your own device. Your language preference is the only thing saved in your browser.',
    ms: 'Laman web ini tidak menggunakan skrip penjejakan atau pengiklanan dan tiada pangkalan data. Butiran yang anda taip dalam borang hanya digunakan untuk menyediakan mesej WhatsApp atau e-mel pada peranti anda sendiri. Pilihan bahasa anda sahaja yang disimpan dalam pelayar anda.',
  },
  disclaimerHeading: { en: 'Disclaimer', ms: 'Penafian' },
  disclaimerBody: {
    en: 'The information provided on this website is for general educational and informational purposes only. It does not constitute personalised financial, legal, tax, medical, or insurance advice. Takaful benefits, exclusions, eligibility, waiting periods, contribution amounts, underwriting requirements, certificate terms, and approval are subject to the relevant provider’s assessment and official documentation. Visitors should review the applicable product documents and speak with a registered advisor before making a decision.',
    ms: 'Maklumat yang disediakan di laman web ini adalah untuk tujuan pendidikan dan informasi umum sahaja. Ia bukan nasihat kewangan, undang-undang, cukai, perubatan, atau insurans yang diperibadikan. Manfaat takaful, pengecualian, kelayakan, tempoh menunggu, jumlah caruman, keperluan pengunderaitan, terma sijil, dan kelulusan adalah tertakluk kepada penilaian dan dokumentasi rasmi pengendali yang berkaitan. Pengunjung harus menyemak dokumen produk yang berkaitan dan berbincang dengan penasihat berdaftar sebelum membuat keputusan.',
  },
  notOfficial: {
    en: 'This is the personal advisor portfolio website of Danial Oza. It is not the official website of AIA PUBLIC Takaful Berhad and is not operated by them. All product names, trademarks, and official documentation belong to their respective owners.',
    ms: 'Ini ialah laman web portfolio penasihat peribadi Danial Oza. Ia bukan laman web rasmi AIA PUBLIC Takaful Berhad dan tidak dikendalikan oleh mereka. Semua nama produk, tanda dagangan, dan dokumentasi rasmi adalah milik pemilik masing-masing.',
  },
  rights: { en: 'All rights reserved.', ms: 'Hak cipta terpelihara.' },
  backToTop: { en: 'Back to top', ms: 'Kembali ke atas' },
}

export const common = {
  whatsapp: { en: 'WhatsApp', ms: 'WhatsApp' },
  phone: { en: 'Phone', ms: 'Telefon' },
  email: { en: 'Email', ms: 'E-mel' },
  opensInNewTab: { en: 'opens in a new tab', ms: 'dibuka dalam tab baharu' },
  yes: { en: 'Yes', ms: 'Ya' },
  no: { en: 'No', ms: 'Tidak' },
  notSure: { en: 'Not sure', ms: 'Tidak pasti' },
}
