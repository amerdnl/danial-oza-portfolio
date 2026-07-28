/**
 * "Protection for Different Stages of Life" cards.
 *
 * Wording rule for this file: describe what someone in this situation
 * *may* want to review. Never state that a person in this group needs a
 * particular product — suitability always depends on individual
 * circumstances, affordability, and eligibility.
 */

export const clientTypes = [
  {
    id: 'young-professionals',
    icon: 'Briefcase',
    title: { en: 'Young Professionals', ms: 'Profesional Muda' },
    description: {
      en: 'Early in your career, with income that is still growing and financial habits still forming.',
      ms: 'Baru bermula dalam kerjaya, dengan pendapatan yang masih berkembang dan tabiat kewangan yang masih terbentuk.',
    },
    responsibilities: [
      { en: 'Study or vehicle loan repayments', ms: 'Bayaran balik pinjaman pengajian atau kenderaan' },
      { en: 'Rent and daily living costs', ms: 'Sewa dan kos kehidupan harian' },
      { en: 'Building early savings', ms: 'Membina simpanan awal' },
    ],
    concerns: [
      { en: 'Unexpected medical bills', ms: 'Bil perubatan yang tidak dijangka' },
      { en: 'Limited emergency savings', ms: 'Simpanan kecemasan yang terhad' },
      { en: 'Not knowing where to begin', ms: 'Tidak tahu di mana hendak bermula' },
    ],
    mayReview: ['medical-card', 'critical-illness', 'savings-legacy'],
  },
  {
    id: 'working-adults',
    icon: 'UserCheck',
    title: { en: 'Working Adults', ms: 'Dewasa Bekerja' },
    description: {
      en: 'Established in your role, often balancing several financial commitments at once.',
      ms: 'Sudah mantap dalam peranan anda, sering mengimbangi beberapa komitmen kewangan serentak.',
    },
    responsibilities: [
      { en: 'Housing or vehicle commitments', ms: 'Komitmen perumahan atau kenderaan' },
      { en: 'Supporting parents or siblings', ms: 'Menyara ibu bapa atau adik-beradik' },
      { en: 'Longer-term financial goals', ms: 'Matlamat kewangan jangka panjang' },
    ],
    concerns: [
      { en: 'Whether existing coverage is still enough', ms: 'Sama ada perlindungan sedia ada masih mencukupi' },
      { en: 'Relying only on employer benefits', ms: 'Bergantung kepada manfaat majikan sahaja' },
      { en: 'Serious illness interrupting income', ms: 'Penyakit serius mengganggu pendapatan' },
    ],
    mayReview: ['medical-card', 'critical-illness', 'income-protection'],
  },
  {
    id: 'families',
    icon: 'Home',
    title: { en: 'Families', ms: 'Keluarga' },
    description: {
      en: 'A household where more than one person depends on the income coming in.',
      ms: 'Isi rumah di mana lebih daripada seorang bergantung kepada pendapatan yang diterima.',
    },
    responsibilities: [
      { en: 'Household expenses', ms: 'Perbelanjaan isi rumah' },
      { en: 'Home financing', ms: 'Pembiayaan rumah' },
      { en: 'Supporting a spouse and children', ms: 'Menyara pasangan dan anak-anak' },
    ],
    concerns: [
      { en: 'How the family would cope financially', ms: 'Bagaimana keluarga akan bertahan dari segi kewangan' },
      { en: 'Keeping everyone covered under one plan', ms: 'Memastikan semua orang dilindungi di bawah satu pelan' },
      { en: 'Balancing protection against monthly budget', ms: 'Mengimbangi perlindungan dengan bajet bulanan' },
    ],
    mayReview: ['family-protection', 'life-takaful', 'medical-card'],
  },
  {
    id: 'parents',
    icon: 'Baby',
    title: { en: 'Parents', ms: 'Ibu Bapa' },
    description: {
      en: 'Raising children, with education costs and long-term planning on your mind.',
      ms: 'Membesarkan anak-anak, dengan kos pendidikan dan perancangan jangka panjang dalam fikiran.',
    },
    responsibilities: [
      { en: 'Childcare and schooling costs', ms: 'Kos penjagaan anak dan persekolahan' },
      { en: 'Future education planning', ms: 'Perancangan pendidikan masa depan' },
      { en: 'Day-to-day family needs', ms: 'Keperluan keluarga harian' },
    ],
    concerns: [
      { en: 'Children’s medical coverage', ms: 'Perlindungan perubatan anak-anak' },
      { en: 'Education continuing if something happens', ms: 'Pendidikan berterusan jika sesuatu berlaku' },
      { en: 'Protecting the family’s main earner', ms: 'Melindungi pencari nafkah utama keluarga' },
    ],
    mayReview: ['family-protection', 'savings-legacy', 'life-takaful'],
  },
  {
    id: 'business-owners',
    icon: 'Building2',
    title: { en: 'Business Owners', ms: 'Pemilik Perniagaan' },
    description: {
      en: 'Running a business where personal and business finances are often closely linked.',
      ms: 'Menjalankan perniagaan di mana kewangan peribadi dan perniagaan sering berkait rapat.',
    },
    responsibilities: [
      { en: 'Business financing and overheads', ms: 'Pembiayaan dan kos operasi perniagaan' },
      { en: 'Staff and supplier obligations', ms: 'Obligasi kepada pekerja dan pembekal' },
      { en: 'Personal and family commitments', ms: 'Komitmen peribadi dan keluarga' },
    ],
    concerns: [
      { en: 'What happens to the business if you cannot work', ms: 'Apa jadi kepada perniagaan jika anda tidak mampu bekerja' },
      { en: 'No employer medical benefits to fall back on', ms: 'Tiada manfaat perubatan majikan untuk bergantung' },
      { en: 'Business debts affecting the family', ms: 'Hutang perniagaan menjejaskan keluarga' },
    ],
    mayReview: ['income-protection', 'life-takaful', 'family-protection'],
  },
  {
    id: 'self-employed',
    icon: 'Laptop',
    title: { en: 'Self-Employed Individuals', ms: 'Individu Bekerja Sendiri' },
    description: {
      en: 'Freelancers, gig workers, and sole traders whose income can vary month to month.',
      ms: 'Pekerja bebas, pekerja gig, dan peniaga tunggal yang pendapatannya boleh berubah setiap bulan.',
    },
    responsibilities: [
      { en: 'Managing an irregular income', ms: 'Menguruskan pendapatan tidak tetap' },
      { en: 'Covering your own medical costs', ms: 'Menanggung kos perubatan sendiri' },
      { en: 'Saving without an employer scheme', ms: 'Menyimpan tanpa skim majikan' },
    ],
    concerns: [
      { en: 'No paid sick leave or employer coverage', ms: 'Tiada cuti sakit bergaji atau perlindungan majikan' },
      { en: 'Income stopping during illness or injury', ms: 'Pendapatan terhenti semasa sakit atau kecederaan' },
      { en: 'Finding a contribution that fits a variable income', ms: 'Mencari caruman yang sesuai dengan pendapatan berubah' },
    ],
    mayReview: ['medical-card', 'income-protection', 'life-takaful'],
  },
  {
    id: 'first-time-applicants',
    icon: 'Sparkles',
    title: { en: 'First-Time Medical Card Applicants', ms: 'Pemohon Kad Perubatan Kali Pertama' },
    description: {
      en: 'Looking at takaful for the first time and wanting a plain explanation before anything else.',
      ms: 'Melihat takaful buat kali pertama dan mahukan penjelasan yang mudah sebelum apa-apa lagi.',
    },
    responsibilities: [
      { en: 'Understanding the basics first', ms: 'Memahami asasnya terlebih dahulu' },
      { en: 'Working out what is affordable', ms: 'Menentukan apa yang mampu dibayar' },
      { en: 'Avoiding a decision you may regret', ms: 'Mengelak keputusan yang mungkin disesali' },
    ],
    concerns: [
      { en: 'Terms and jargon being hard to follow', ms: 'Terma dan jargon yang sukar difahami' },
      { en: 'Feeling pressured into signing up', ms: 'Rasa ditekan untuk mendaftar' },
      { en: 'Not knowing what is actually covered', ms: 'Tidak tahu apa yang sebenarnya dilindungi' },
    ],
    mayReview: ['medical-card', 'critical-illness', 'life-takaful'],
  },
]

export default clientTypes
