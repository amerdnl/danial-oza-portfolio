/**
 * ============================================================================
 * RECOMMENDATION ENGINE
 * ============================================================================
 * A pure, rule-based function. Given the questionnaire answers it returns a
 * ranked list of general protection AREAS worth discussing — nothing more.
 *
 * WHAT THIS ENGINE MUST NEVER DO
 *   - name a product
 *   - calculate or estimate a contribution or premium
 *   - state or imply that someone is eligible, or will be approved
 *   - draw any medical conclusion
 *   - project investment returns or savings outcomes
 *
 * HOW TO EDIT THE LOGIC
 * Every rule is a plain object in the RULES array below:
 *
 *   {
 *     id:       unique string, used as a React key
 *     category: a service id from src/data/services.js
 *     when:     (answers) => boolean — the condition that fires the rule
 *     weight:   how strongly it pushes that category up the ranking (1–3)
 *     reason:   bilingual text explaining WHY, shown to the visitor
 *   }
 *
 * To add a rule, append an object. To remove one, delete it. No other code
 * needs to change. Rules are additive — several rules can point at the same
 * category and their weights accumulate.
 * ============================================================================
 */

/** Convenience helpers so the rule conditions stay readable. */
const has = (answers, key) => answers[key] === 'yes'
const lacks = (answers, key) => answers[key] === 'no'
const unsureAbout = (answers, key) => answers[key] === 'not-sure'
const worriedAbout = (answers, concern) =>
  Array.isArray(answers.concerns) && answers.concerns.includes(concern)
const hasDependants = (answers) =>
  ['1-2', '3-4', '5-plus'].includes(answers.dependants) ||
  has(answers, 'supportsSpouse') ||
  has(answers, 'supportsChildren') ||
  has(answers, 'supportsParents')

export const RULES = [
  // ------------------------------------------------------------ MEDICAL ---
  {
    id: 'no-medical-card-hospital-concern',
    category: 'medical-card',
    when: (a) => lacks(a, 'hasMedicalCard') && worriedAbout(a, 'hospital'),
    weight: 3,
    reason: {
      en: 'You indicated that you do not currently have a medical card, and that hospital and medical expenses are a concern.',
      ms: 'Anda menyatakan bahawa anda tidak mempunyai kad perubatan pada masa ini, dan perbelanjaan hospital serta perubatan menjadi kebimbangan.',
    },
  },
  {
    id: 'no-medical-card',
    category: 'medical-card',
    when: (a) => lacks(a, 'hasMedicalCard') && !worriedAbout(a, 'hospital'),
    weight: 2,
    reason: {
      en: 'You indicated that you do not currently have a medical card, so this is usually the first area worth understanding.',
      ms: 'Anda menyatakan bahawa anda tidak mempunyai kad perubatan pada masa ini, jadi ini biasanya bidang pertama yang wajar difahami.',
    },
  },
  {
    id: 'employer-medical-only',
    category: 'medical-card',
    when: (a) => has(a, 'hasEmployerMedical') && lacks(a, 'hasMedicalCard'),
    weight: 2,
    reason: {
      en: 'Employer medical benefits usually end when the employment does, so it may be worth understanding what would remain in place if your job changed.',
      ms: 'Manfaat perubatan majikan biasanya tamat apabila pekerjaan tamat, jadi ia mungkin wajar difahami apa yang akan kekal jika pekerjaan anda berubah.',
    },
  },
  {
    id: 'self-employed-no-employer-benefits',
    category: 'medical-card',
    when: (a) =>
      ['self-employed', 'business-owner'].includes(a.employment) && !has(a, 'hasEmployerMedical'),
    weight: 3,
    reason: {
      en: 'As you work for yourself without employer medical benefits, medical costs would fall to you directly.',
      ms: 'Memandangkan anda bekerja sendiri tanpa manfaat perubatan majikan, kos perubatan akan ditanggung oleh anda secara langsung.',
    },
  },
  {
    id: 'medical-unsure',
    category: 'medical-card',
    when: (a) => unsureAbout(a, 'hasMedicalCard'),
    weight: 2,
    reason: {
      en: 'You were not sure whether you currently hold a medical card. Confirming what you already have is a sensible first step.',
      ms: 'Anda tidak pasti sama ada anda memiliki kad perubatan pada masa ini. Mengesahkan apa yang anda sudah ada adalah langkah pertama yang munasabah.',
    },
  },

  // ------------------------------------------------------- LIFE TAKAFUL ---
  {
    id: 'dependants-income-reliance',
    category: 'life-takaful',
    when: (a) => hasDependants(a) && a.householdDependsOnIncome === 'yes',
    weight: 3,
    reason: {
      en: 'People depend on you financially and your household relies mainly on your income.',
      ms: 'Ada orang bergantung kepada anda dari segi kewangan dan isi rumah anda bergantung terutamanya pada pendapatan anda.',
    },
  },
  {
    id: 'no-life-takaful-with-dependants',
    category: 'life-takaful',
    when: (a) => lacks(a, 'hasLifeTakaful') && hasDependants(a),
    weight: 2,
    reason: {
      en: 'You indicated that you have dependants but no life takaful in place at the moment.',
      ms: 'Anda menyatakan bahawa anda mempunyai tanggungan tetapi tiada takaful hayat pada masa ini.',
    },
  },
  {
    id: 'housing-commitment',
    category: 'life-takaful',
    when: (a) => has(a, 'housingCommitment') && hasDependants(a),
    weight: 1,
    reason: {
      en: 'A housing commitment is a long-term obligation that may continue for your family if something happened to you.',
      ms: 'Komitmen perumahan ialah obligasi jangka panjang yang mungkin berterusan untuk keluarga anda jika sesuatu berlaku kepada anda.',
    },
  },
  {
    id: 'family-income-concern',
    category: 'life-takaful',
    when: (a) => worriedAbout(a, 'family-income'),
    weight: 2,
    reason: {
      en: 'You selected protecting family income as one of your main concerns.',
      ms: 'Anda memilih melindungi pendapatan keluarga sebagai salah satu kebimbangan utama anda.',
    },
  },

  // ---------------------------------------------------- CRITICAL ILLNESS ---
  {
    id: 'critical-illness-concern',
    category: 'critical-illness',
    when: (a) => worriedAbout(a, 'critical-illness'),
    weight: 3,
    reason: {
      en: 'You selected critical illness as one of your main concerns.',
      ms: 'Anda memilih penyakit kritikal sebagai salah satu kebimbangan utama anda.',
    },
  },
  {
    id: 'no-ci-cover',
    category: 'critical-illness',
    when: (a) => lacks(a, 'hasCriticalIllness') && ['35-44', '45-54', '55-plus'].includes(a.ageRange),
    weight: 2,
    reason: {
      en: 'You indicated that you do not currently have critical illness protection. This area is commonly reviewed at your life stage.',
      ms: 'Anda menyatakan bahawa anda tidak mempunyai perlindungan penyakit kritikal pada masa ini. Bidang ini biasanya disemak pada peringkat kehidupan anda.',
    },
  },
  {
    id: 'low-savings-illness-risk',
    category: 'critical-illness',
    when: (a) => ['none', 'under-3'].includes(a.emergencySavings) && lacks(a, 'hasCriticalIllness'),
    weight: 2,
    reason: {
      en: 'With limited emergency savings, a long recovery period could put pressure on day-to-day finances.',
      ms: 'Dengan simpanan kecemasan yang terhad, tempoh pemulihan yang panjang boleh memberi tekanan kepada kewangan harian.',
    },
  },

  // --------------------------------------------------- INCOME PROTECTION ---
  {
    id: 'unable-to-work-concern',
    category: 'income-protection',
    when: (a) => worriedAbout(a, 'unable-to-work'),
    weight: 3,
    reason: {
      en: 'You selected loss of the ability to work as one of your main concerns.',
      ms: 'Anda memilih kehilangan keupayaan untuk bekerja sebagai salah satu kebimbangan utama anda.',
    },
  },
  {
    id: 'self-employed-income',
    category: 'income-protection',
    when: (a) => ['self-employed', 'business-owner'].includes(a.employment),
    weight: 3,
    reason: {
      en: 'Working for yourself usually means no paid sick leave, so an interruption to work can interrupt income immediately.',
      ms: 'Bekerja sendiri biasanya bermakna tiada cuti sakit bergaji, jadi gangguan kepada kerja boleh mengganggu pendapatan dengan serta-merta.',
    },
  },
  {
    id: 'physical-occupation',
    category: 'income-protection',
    when: (a) => ['physical', 'field'].includes(a.occupationCategory) && lacks(a, 'hasIncomeProtection'),
    weight: 2,
    reason: {
      en: 'Your work involves physical or field-based activity, where an injury can directly affect your ability to earn.',
      ms: 'Kerja anda melibatkan aktiviti fizikal atau kerja lapangan, di mana kecederaan boleh menjejaskan keupayaan anda untuk mencari pendapatan secara langsung.',
    },
  },
  {
    id: 'household-depends-no-income-protection',
    category: 'income-protection',
    when: (a) => a.householdDependsOnIncome === 'yes' && lacks(a, 'hasIncomeProtection'),
    weight: 2,
    reason: {
      en: 'Your household relies mainly on your income and no income protection is currently in place.',
      ms: 'Isi rumah anda bergantung terutamanya pada pendapatan anda dan tiada perlindungan pendapatan pada masa ini.',
    },
  },

  // --------------------------------------------------- FAMILY PROTECTION ---
  {
    id: 'children-family-concern',
    category: 'family-protection',
    when: (a) => worriedAbout(a, 'children-family'),
    weight: 3,
    reason: {
      en: 'You selected children and family protection as one of your main concerns.',
      ms: 'Anda memilih perlindungan anak-anak dan keluarga sebagai salah satu kebimbangan utama anda.',
    },
  },
  {
    id: 'supports-spouse-and-children',
    category: 'family-protection',
    when: (a) => has(a, 'supportsChildren') && has(a, 'supportsSpouse'),
    weight: 3,
    reason: {
      en: 'You support both a spouse and children, so protection is often looked at for the household as a whole rather than one person at a time.',
      ms: 'Anda menyara pasangan dan juga anak-anak, jadi perlindungan selalunya dilihat untuk keseluruhan isi rumah dan bukannya seorang demi seorang.',
    },
  },
  {
    id: 'raising-family-stage',
    category: 'family-protection',
    when: (a) => a.lifeStage === 'raising-family',
    weight: 2,
    reason: {
      en: 'You described your current life stage as raising a family, when household commitments are typically at their highest.',
      ms: 'Anda menyatakan peringkat kehidupan semasa anda sebagai membesarkan keluarga, ketika komitmen isi rumah biasanya berada pada tahap tertinggi.',
    },
  },
  {
    id: 'supports-parents',
    category: 'family-protection',
    when: (a) => has(a, 'supportsParents'),
    weight: 1,
    reason: {
      en: 'You support your parents, which is a commitment that is easy to overlook when reviewing protection.',
      ms: 'Anda menyara ibu bapa anda, satu komitmen yang mudah terlepas pandang semasa menyemak perlindungan.',
    },
  },

  // ----------------------------------------------- SAVINGS AND LEGACY ------
  {
    id: 'long-term-savings-concern',
    category: 'savings-legacy',
    when: (a) => worriedAbout(a, 'long-term-savings'),
    weight: 3,
    reason: {
      en: 'You selected long-term savings as one of your main concerns.',
      ms: 'Anda memilih simpanan jangka panjang sebagai salah satu kebimbangan utama anda.',
    },
  },
  {
    id: 'legacy-concern',
    category: 'savings-legacy',
    when: (a) => worriedAbout(a, 'legacy'),
    weight: 3,
    reason: {
      en: 'You selected legacy planning as one of your main concerns.',
      ms: 'Anda memilih perancangan warisan sebagai salah satu kebimbangan utama anda.',
    },
  },
  {
    id: 'pre-retirement-savings',
    category: 'savings-legacy',
    when: (a) => a.lifeStage === 'pre-retirement' || a.ageRange === '55-plus',
    weight: 2,
    reason: {
      en: 'You are approaching or planning for retirement, when protection duration and long-term goals are usually reviewed together.',
      ms: 'Anda menghampiri atau merancang persaraan, ketika tempoh perlindungan dan matlamat jangka panjang biasanya disemak bersama.',
    },
  },
  {
    id: 'education-planning',
    category: 'savings-legacy',
    when: (a) => has(a, 'supportsChildren') && worriedAbout(a, 'children-family'),
    weight: 1,
    reason: {
      en: 'With children to support, education planning is often discussed alongside protection.',
      ms: 'Dengan anak-anak yang perlu disara, perancangan pendidikan sering dibincangkan bersama perlindungan.',
    },
  },

  // --------------------------------------------------------- BUSINESS -----
  {
    id: 'business-owner-commitments',
    category: 'life-takaful',
    when: (a) => a.employment === 'business-owner' && has(a, 'businessCommitment'),
    weight: 2,
    reason: {
      en: 'As a business owner with business commitments, personal and business obligations are often connected and reviewed together.',
      ms: 'Sebagai pemilik perniagaan dengan komitmen perniagaan, obligasi peribadi dan perniagaan sering berkait dan disemak bersama.',
    },
  },
  {
    id: 'business-concern-family',
    category: 'family-protection',
    when: (a) => worriedAbout(a, 'business') && hasDependants(a),
    weight: 2,
    reason: {
      en: 'You raised business responsibilities as a concern and have dependants, so it may be worth reviewing how business obligations could affect your family.',
      ms: 'Anda menyatakan tanggungjawab perniagaan sebagai kebimbangan dan mempunyai tanggungan, jadi wajar disemak bagaimana obligasi perniagaan boleh menjejaskan keluarga anda.',
    },
  },
]

/**
 * Limitations shown alongside every set of results. These are not optional —
 * they keep the output honest about what it can and cannot tell you.
 */
export const RESULT_LIMITATIONS = [
  {
    id: 'general-only',
    text: {
      en: 'These are general discussion areas, not products, and not a personalised financial recommendation.',
      ms: 'Ini adalah bidang perbincangan umum, bukan produk, dan bukan cadangan kewangan yang diperibadikan.',
    },
  },
  {
    id: 'no-contribution',
    text: {
      en: 'No contribution or premium amount has been calculated. Actual amounts depend on your circumstances and the provider’s assessment.',
      ms: 'Tiada jumlah caruman atau premium yang dikira. Jumlah sebenar bergantung pada keadaan anda dan penilaian pengendali.',
    },
  },
  {
    id: 'no-eligibility',
    text: {
      en: 'Nothing here confirms eligibility or approval. Every application is assessed individually by the takaful provider.',
      ms: 'Tiada apa-apa di sini yang mengesahkan kelayakan atau kelulusan. Setiap permohonan dinilai secara individu oleh pengendali takaful.',
    },
  },
  {
    id: 'based-on-selections',
    text: {
      en: 'The results reflect only the options you selected. A conversation will usually surface details a form cannot.',
      ms: 'Keputusan ini hanya mencerminkan pilihan yang anda buat. Perbualan biasanya akan mendedahkan butiran yang tidak dapat ditangkap oleh borang.',
    },
  },
]

/** Fallback used when nothing scores — e.g. someone selects "Unsure where to begin". */
const BROAD_REVIEW_FALLBACK = {
  id: 'broad-basic-review',
  categories: ['medical-card', 'life-takaful', 'critical-illness'],
  reason: {
    en: 'You indicated that you are not sure where to begin, so a broad basic review is usually the most useful starting point. These three areas cover the most common protection questions.',
    ms: 'Anda menyatakan bahawa anda tidak pasti di mana hendak bermula, jadi semakan asas yang menyeluruh biasanya merupakan titik permulaan yang paling berguna. Ketiga-tiga bidang ini merangkumi soalan perlindungan yang paling biasa.',
  },
}

/** How many areas to show. More than this stops being useful. */
const MAX_RESULTS = 4

/**
 * Run the questionnaire answers through the rule table.
 *
 * @param {object} answers - answers keyed by questionnaire field name
 * @returns {{ areas: Array<{categoryId: string, score: number, reasons: Array}>, isFallback: boolean }}
 */
export function getRecommendations(answers) {
  if (!answers || typeof answers !== 'object') {
    return { areas: [], isFallback: false }
  }

  const scores = new Map()

  for (const rule of RULES) {
    let fired = false
    try {
      fired = rule.when(answers) === true
    } catch {
      // A malformed answer object must never break the results screen.
      fired = false
    }
    if (!fired) continue

    const existing = scores.get(rule.category) ?? { score: 0, reasons: [] }
    existing.score += rule.weight
    existing.reasons.push({ id: rule.id, text: rule.reason })
    scores.set(rule.category, existing)
  }

  // Nothing matched — fall back to a broad basic review rather than showing
  // an empty screen.
  if (scores.size === 0) {
    return {
      areas: BROAD_REVIEW_FALLBACK.categories.map((categoryId) => ({
        categoryId,
        score: 1,
        reasons: [{ id: BROAD_REVIEW_FALLBACK.id, text: BROAD_REVIEW_FALLBACK.reason }],
      })),
      isFallback: true,
    }
  }

  const areas = [...scores.entries()]
    .map(([categoryId, data]) => ({ categoryId, ...data }))
    // Highest score first; ties keep a stable order by category id so the
    // same answers always produce the same output.
    .sort((a, b) => b.score - a.score || a.categoryId.localeCompare(b.categoryId))
    .slice(0, MAX_RESULTS)

  return { areas, isFallback: false }
}

export default getRecommendations
