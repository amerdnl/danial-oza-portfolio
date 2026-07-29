/**
 * ============================================================================
 * RECOMMENDATION QUESTIONNAIRE
 * ============================================================================
 * The five input steps of the recommendation tool. Step six is the results
 * screen and is rendered separately.
 *
 * Structure:
 *   step.fields[]  — one question each
 *   field.name     — the key the answer is stored under; the rules in
 *                    `src/utils/recommendationEngine.js` read these keys
 *   field.type     — 'single' (radio group) or 'multiple' (checkbox group)
 *   field.options  — { value, label } where `value` is the stable id used by
 *                    the rules and `label` is the bilingual display text
 *
 * PRIVACY: this questionnaire deliberately collects no medical details, no
 * exact income, no bank balances, and no identity-card numbers. Keep it that
 * way when adding questions — savings are asked as a range of months, never
 * as an amount, and smoking is asked as a plain yes/no status, never as
 * quantity, duration, or any health condition.
 *
 * Answers live only in React state for the session (see
 * src/context/recommendationContextValue.js). Nothing here is persisted.
 * ============================================================================
 */

const yesNoNotSure = [
  { value: 'yes', label: { en: 'Yes', ms: 'Ya' } },
  { value: 'no', label: { en: 'No', ms: 'Tidak' } },
  { value: 'not-sure', label: { en: 'Not sure', ms: 'Tidak pasti' } },
]

const yesNo = [
  { value: 'yes', label: { en: 'Yes', ms: 'Ya' } },
  { value: 'no', label: { en: 'No', ms: 'Tidak' } },
]

export const questionnaireSteps = [
  // -------------------------------------------------------------- STEP 1 ---
  {
    id: 'profile',
    title: { en: 'Basic Profile', ms: 'Profil Asas' },
    description: {
      en: 'A little about your current life stage.',
      ms: 'Sedikit tentang peringkat kehidupan semasa anda.',
    },
    fields: [
      {
        name: 'ageRange',
        type: 'single',
        label: { en: 'Which age range are you in?', ms: 'Anda berada dalam julat umur yang mana?' },
        options: [
          { value: '18-24', label: { en: '18–24', ms: '18–24' } },
          { value: '25-34', label: { en: '25–34', ms: '25–34' } },
          { value: '35-44', label: { en: '35–44', ms: '35–44' } },
          { value: '45-54', label: { en: '45–54', ms: '45–54' } },
          { value: '55-plus', label: { en: '55 and above', ms: '55 dan ke atas' } },
        ],
      },
      {
        name: 'employment',
        type: 'single',
        label: { en: 'What is your employment status?', ms: 'Apakah status pekerjaan anda?' },
        options: [
          { value: 'student', label: { en: 'Student', ms: 'Pelajar' } },
          { value: 'fresh-graduate', label: { en: 'Fresh graduate', ms: 'Graduan baharu' } },
          { value: 'government', label: { en: 'Government employee', ms: 'Kakitangan kerajaan' } },
          { value: 'private', label: { en: 'Private-sector employee', ms: 'Kakitangan sektor swasta' } },
          { value: 'self-employed', label: { en: 'Self-employed', ms: 'Bekerja sendiri' } },
          { value: 'business-owner', label: { en: 'Business owner', ms: 'Pemilik perniagaan' } },
          { value: 'not-employed', label: { en: 'Not currently employed', ms: 'Tidak bekerja buat masa ini' } },
          { value: 'other', label: { en: 'Other', ms: 'Lain-lain' } },
        ],
      },
      {
        name: 'occupationCategory',
        type: 'single',
        label: {
          en: 'Which best describes your day-to-day work?',
          ms: 'Yang mana paling menggambarkan kerja harian anda?',
        },
        options: [
          { value: 'office', label: { en: 'Mostly office or desk based', ms: 'Kebanyakannya di pejabat atau meja' } },
          { value: 'field', label: { en: 'Field work or frequent travel', ms: 'Kerja lapangan atau kerap bergerak' } },
          { value: 'physical', label: { en: 'Physical or manual work', ms: 'Kerja fizikal atau manual' } },
          { value: 'shift', label: { en: 'Shift or irregular hours', ms: 'Syif atau waktu tidak menentu' } },
          { value: 'home', label: { en: 'Home based or remote', ms: 'Bekerja dari rumah atau jarak jauh' } },
          { value: 'not-applicable', label: { en: 'Not applicable', ms: 'Tidak berkenaan' } },
        ],
      },
      {
        // Status only. Nothing about quantity, duration, or health is asked,
        // and the answer never influences the recommendation categories — it
        // is passed to Danial so he has it before the conversation starts.
        name: 'smokingStatus',
        type: 'single',
        label: { en: 'Do you smoke?', ms: 'Adakah anda merokok?' },
        options: yesNo,
      },
      {
        name: 'maritalStatus',
        type: 'single',
        label: { en: 'What is your marital status?', ms: 'Apakah status perkahwinan anda?' },
        options: [
          { value: 'single', label: { en: 'Single', ms: 'Bujang' } },
          { value: 'married', label: { en: 'Married', ms: 'Berkahwin' } },
          { value: 'other', label: { en: 'Divorced or widowed', ms: 'Bercerai atau balu/duda' } },
          { value: 'prefer-not-say', label: { en: 'Prefer not to say', ms: 'Tidak mahu nyatakan' } },
        ],
      },
      {
        name: 'dependants',
        type: 'single',
        label: {
          en: 'How many people depend on you financially?',
          ms: 'Berapa ramai orang bergantung kepada anda dari segi kewangan?',
        },
        options: [
          { value: '0', label: { en: 'Nobody at the moment', ms: 'Tiada sesiapa buat masa ini' } },
          { value: '1-2', label: { en: '1–2 people', ms: '1–2 orang' } },
          { value: '3-4', label: { en: '3–4 people', ms: '3–4 orang' } },
          { value: '5-plus', label: { en: '5 or more people', ms: '5 orang atau lebih' } },
        ],
      },
      {
        name: 'lifeStage',
        type: 'single',
        label: { en: 'Which life stage fits you best?', ms: 'Peringkat kehidupan mana yang paling sesuai dengan anda?' },
        options: [
          { value: 'starting-out', label: { en: 'Just starting out', ms: 'Baru bermula' } },
          { value: 'building', label: { en: 'Building my career', ms: 'Membina kerjaya saya' } },
          { value: 'raising-family', label: { en: 'Raising a family', ms: 'Membesarkan keluarga' } },
          { value: 'established', label: { en: 'Established and settled', ms: 'Mantap dan stabil' } },
          { value: 'pre-retirement', label: { en: 'Preparing for retirement', ms: 'Bersedia untuk persaraan' } },
        ],
      },
    ],
  },

  // -------------------------------------------------------------- STEP 2 ---
  {
    id: 'existing-protection',
    title: { en: 'Existing Protection', ms: 'Perlindungan Sedia Ada' },
    description: {
      en: 'What you already have in place. Answer “Not sure” if you are unsure — that is a common and perfectly fine answer.',
      ms: 'Apa yang anda sudah ada. Jawab “Tidak pasti” jika anda tidak pasti — itu jawapan yang biasa dan tiada masalah.',
    },
    fields: [
      {
        name: 'hasMedicalCard',
        type: 'single',
        label: { en: 'Do you currently have a medical card?', ms: 'Adakah anda mempunyai kad perubatan sekarang?' },
        options: yesNoNotSure,
      },
      {
        name: 'hasLifeTakaful',
        type: 'single',
        label: { en: 'Do you currently have life takaful?', ms: 'Adakah anda mempunyai takaful hayat sekarang?' },
        options: yesNoNotSure,
      },
      {
        name: 'hasCriticalIllness',
        type: 'single',
        label: {
          en: 'Do you currently have critical illness protection?',
          ms: 'Adakah anda mempunyai perlindungan penyakit kritikal sekarang?',
        },
        options: yesNoNotSure,
      },
      {
        name: 'hasEmployerMedical',
        type: 'single',
        label: {
          en: 'Do you have employer-provided medical benefits?',
          ms: 'Adakah anda mempunyai manfaat perubatan yang disediakan majikan?',
        },
        options: yesNoNotSure,
      },
      {
        name: 'hasIncomeProtection',
        type: 'single',
        label: { en: 'Do you have income protection?', ms: 'Adakah anda mempunyai perlindungan pendapatan?' },
        options: yesNoNotSure,
      },
      {
        name: 'lastReviewed',
        type: 'single',
        label: {
          en: 'When was your protection last reviewed?',
          ms: 'Bilakah kali terakhir perlindungan anda disemak?',
        },
        options: [
          { value: 'never', label: { en: 'Never reviewed', ms: 'Tidak pernah disemak' } },
          { value: 'within-year', label: { en: 'Within the past year', ms: 'Dalam tempoh setahun lalu' } },
          { value: '1-3-years', label: { en: '1–3 years ago', ms: '1–3 tahun lalu' } },
          { value: 'over-3-years', label: { en: 'More than 3 years ago', ms: 'Lebih 3 tahun lalu' } },
          { value: 'not-sure', label: { en: 'Not sure', ms: 'Tidak pasti' } },
        ],
      },
    ],
  },

  // -------------------------------------------------------------- STEP 3 ---
  {
    id: 'responsibilities',
    title: { en: 'Financial Responsibilities', ms: 'Tanggungjawab Kewangan' },
    description: {
      en: 'Who and what your income currently supports. No amounts are collected.',
      ms: 'Siapa dan apa yang disokong oleh pendapatan anda sekarang. Tiada jumlah wang dikumpulkan.',
    },
    fields: [
      {
        name: 'supportsSpouse',
        type: 'single',
        label: { en: 'Do you support a spouse?', ms: 'Adakah anda menyara pasangan?' },
        options: yesNo,
      },
      {
        name: 'supportsChildren',
        type: 'single',
        label: { en: 'Do you support children?', ms: 'Adakah anda menyara anak-anak?' },
        options: yesNo,
      },
      {
        name: 'supportsParents',
        type: 'single',
        label: { en: 'Do you support parents?', ms: 'Adakah anda menyara ibu bapa?' },
        options: yesNo,
      },
      {
        name: 'housingCommitment',
        type: 'single',
        label: {
          en: 'Do you have a housing commitment such as a home loan or rent?',
          ms: 'Adakah anda mempunyai komitmen perumahan seperti pinjaman rumah atau sewa?',
        },
        options: yesNo,
      },
      {
        name: 'businessCommitment',
        type: 'single',
        label: {
          en: 'Do you have business commitments such as financing or staff?',
          ms: 'Adakah anda mempunyai komitmen perniagaan seperti pembiayaan atau pekerja?',
        },
        options: yesNo,
      },
      {
        name: 'householdDependsOnIncome',
        type: 'single',
        label: {
          en: 'Is your household dependent on your income?',
          ms: 'Adakah isi rumah anda bergantung pada pendapatan anda?',
        },
        options: [
          { value: 'yes', label: { en: 'Yes, mainly on my income', ms: 'Ya, terutamanya pada pendapatan saya' } },
          { value: 'partly', label: { en: 'Partly — income is shared', ms: 'Sebahagiannya — pendapatan dikongsi' } },
          { value: 'no', label: { en: 'No', ms: 'Tidak' } },
        ],
      },
      {
        name: 'emergencySavings',
        type: 'single',
        label: {
          en: 'Roughly how many months of expenses could your emergency savings cover?',
          ms: 'Secara kasar, berapa bulan perbelanjaan yang boleh ditampung oleh simpanan kecemasan anda?',
        },
        options: [
          { value: 'none', label: { en: 'Less than 1 month', ms: 'Kurang daripada 1 bulan' } },
          { value: 'under-3', label: { en: '1–3 months', ms: '1–3 bulan' } },
          { value: '3-6', label: { en: '3–6 months', ms: '3–6 bulan' } },
          { value: 'over-6', label: { en: 'More than 6 months', ms: 'Lebih daripada 6 bulan' } },
          { value: 'not-sure', label: { en: 'Not sure', ms: 'Tidak pasti' } },
        ],
      },
    ],
  },

  // -------------------------------------------------------------- STEP 4 ---
  {
    id: 'concerns',
    title: { en: 'Main Concerns', ms: 'Kebimbangan Utama' },
    description: {
      en: 'What is on your mind most. Choose as many as apply.',
      ms: 'Apa yang paling anda fikirkan. Pilih seberapa banyak yang berkaitan.',
    },
    fields: [
      {
        name: 'concerns',
        type: 'multiple',
        label: {
          en: 'Which of these are you most concerned about?',
          ms: 'Antara berikut, yang mana paling anda bimbangkan?',
        },
        options: [
          { value: 'hospital', label: { en: 'Hospital and medical expenses', ms: 'Perbelanjaan hospital dan perubatan' } },
          { value: 'family-income', label: { en: 'Protecting family income', ms: 'Melindungi pendapatan keluarga' } },
          { value: 'critical-illness', label: { en: 'Critical illness', ms: 'Penyakit kritikal' } },
          { value: 'unable-to-work', label: { en: 'Loss of ability to work', ms: 'Kehilangan keupayaan untuk bekerja' } },
          { value: 'children-family', label: { en: 'Children and family protection', ms: 'Perlindungan anak-anak dan keluarga' } },
          { value: 'long-term-savings', label: { en: 'Long-term savings', ms: 'Simpanan jangka panjang' } },
          { value: 'legacy', label: { en: 'Legacy planning', ms: 'Perancangan warisan' } },
          { value: 'business', label: { en: 'Business responsibilities', ms: 'Tanggungjawab perniagaan' } },
          { value: 'review-existing', label: { en: 'Reviewing existing coverage', ms: 'Menyemak perlindungan sedia ada' } },
          { value: 'unsure', label: { en: 'Unsure where to begin', ms: 'Tidak pasti di mana hendak bermula' } },
        ],
      },
    ],
  },

  // -------------------------------------------------------------- STEP 5 ---
  {
    id: 'budget',
    title: { en: 'Monthly Budget Range', ms: 'Julat Bajet Bulanan' },
    description: {
      en: 'A rough range helps keep the conversation realistic. This is not a quote and no contribution is calculated here.',
      ms: 'Julat kasar membantu memastikan perbincangan kekal realistik. Ini bukan sebut harga dan tiada caruman dikira di sini.',
    },
    fields: [
      {
        name: 'budget',
        type: 'single',
        label: {
          en: 'Roughly what monthly amount would feel comfortable for protection?',
          ms: 'Secara kasar, jumlah bulanan yang bagaimana terasa selesa untuk perlindungan?',
        },
        options: [
          { value: 'below-100', label: { en: 'Below RM100', ms: 'Bawah RM100' } },
          { value: '100-200', label: { en: 'RM100–RM200', ms: 'RM100–RM200' } },
          { value: '201-300', label: { en: 'RM201–RM300', ms: 'RM201–RM300' } },
          { value: '301-500', label: { en: 'RM301–RM500', ms: 'RM301–RM500' } },
          { value: 'above-500', label: { en: 'Above RM500', ms: 'Melebihi RM500' } },
          { value: 'not-sure', label: { en: 'Not sure yet', ms: 'Belum pasti' } },
        ],
      },
    ],
  },
]

/** Every field name in the questionnaire, in order. */
export const allFieldNames = questionnaireSteps.flatMap((step) =>
  step.fields.map((field) => field.name),
)

/** Look up an option's bilingual label from a stored answer value. */
export function findOptionLabel(fieldName, value) {
  for (const step of questionnaireSteps) {
    for (const field of step.fields) {
      if (field.name !== fieldName) continue
      const option = field.options.find((item) => item.value === value)
      if (option) return option.label
    }
  }
  return null
}

export default questionnaireSteps
