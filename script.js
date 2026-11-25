const slides = Array.from(document.querySelectorAll(".slide"));
const progressFill = document.getElementById("progress-fill");
const slideCounter = document.getElementById("slide-counter");
const langPill = document.getElementById("speaker-lang-pill");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const notesBtn = document.getElementById("notes-btn");
const notesDrawer = document.getElementById("notes-drawer");
const notesSpeaker = document.getElementById("notes-speaker");
const notesText = document.getElementById("notes-text");
const overviewBtn = document.getElementById("overview-btn");
const overviewModal = document.getElementById("overview-modal");
const overviewGrid = document.getElementById("overview-grid");
const closeOverview = document.getElementById("close-overview");
const fullscreenBtn = document.getElementById("fullscreen-btn");

// Full Arabic translations for every [data-t] element across all 19 slides
const AR_TRANSLATIONS = {
  s1_title: "اسم الجروب: V for Vendetta",
  s1_sub: "Google Antigravity: من مجرد Prompt إلى تغيير مراجَع ومختبَر",
  s1_team: "أعضاء الفريق",
  s1_today: "رحلتنا النهارده",
  s1_flow: "تثبيت ← تسجيل دخول ← تخطيط ← بناء ← اختبار ← مراجعة",
  s1_demo: "مشروع عملي مباشر: موقع بورتفوليو شخصي لطالب حاسبات (بناه واختبره فريقنا بالكامل)",

  s2_title: "بناء مشروع كامل مع Google Antigravity من الألف للياء",
  s2_q1_t: "السؤال الأول",
  s2_q2_t: "السؤال الثاني",
  s2_main: "الفكرة الأساسية: الذكاء الاصطناعي يوفر وقتك، لكن فقط عندما تتابع وتراجع النتيجة بنفسك.",

  s3_title: "ثورة الذكاء الاصطناعي: 2017 ← 2022 ← 2025",
  s3_mean_t: "ماذا تعني هذه الأرقام؟",
  s3_mean_1: "نسبة الشركات التي تستخدم الذكاء الاصطناعي في وظيفة واحدة على الأقل داخل العمل.",
  s3_mean_2: "تقرير McKinsey يوضح أيضاً أن معظم الشركات لا تزال في المراحل الأولى من التوسع.",
  s3_src: "المصدر: تقرير McKinsey (نسخة 2022 لأعوام 2017 و2022، ونسخة 2025 لعام 2025). ذروة 2019 كانت 58%.",

  s4_title: "سير العمل التقليدي مقابل العمل مع Antigravity",
  s4_th1: "المهمة",
  s4_th2: "الطريقة التقليدية",
  s4_th3: "مع Antigravity (مع مراجعتنا)",
  s4_r1_1: "فهم المشروع",
  s4_r1_2: "فتح وقراءة الملفات واحداً تلو الآخر",
  s4_r1_3: "الوكيل (Agent) يستكشف المشروع ويقترح خطة",
  s4_r2_1: "تخطيط العمل",
  s4_r2_2: "ملاحظات وتخمينات",
  s4_r2_3: "خطة تنفيذ (Implementation Plan) للمراجعة والتعليق أولاً",
  s4_r3_1: "كتابة الكود",
  s4_r3_2: "تكتبه بنفسك أو تنسخ من شات",
  s4_r3_3: "الوكيل يعدّل الملفات مباشرة داخل المشروع",
  s4_r4_1: "اختبار التطبيق",
  s4_r4_2: "تجربة يدوية بالماوس في كل مرة",
  s4_r4_3: "الوكيل يكرر نفس خطوات الاختبار في المتصفح",
  s4_r5_1: "مراجعة التغييرات",
  s4_r5_2: "تعديلات مبعثرة بين الملفات",
  s4_r5_3: "مراجعة الفروق (Diff) ملف بملف مع ملخص Walkthrough",
  s4_r6_1: "الإعداد المتكرر",
  s4_r6_2: "تعيد شرح القواعد في كل مرة",
  s4_r6_3: "تكتبها مرة واحدة كـ Rules و Skills",
  s4_call: "الوكيل يقلل الشغل المكرر، لكن المراجعة والقرار النهائي يظلان مسؤوليتنا.",

  s5_title: "لماذا Antigravity؟ أكثر من مجرد شات بوت",
  s5_c1: "يربط الوكيل بالأدوات والبيانات الخارجية مثل قواعد البيانات وسجلات النشر وGitHub وNotion.",
  s5_c2: "قواعد ثابتة للمشروع، مثل استخدام Semantic HTML ومنع وضع الأسرار في كود الواجهة.",
  s5_c3: "إجراءات وخطوات قابلة لإعادة الاستخدام محفوظة داخل ملف SKILL.md.",
  s5_c4: "تقسيم المهام مثل البحث أو البناء أو الاختبار، وكل وكيل فرعي يبدأ بسياق نظيف.",
  s5_call: "إعداد المبتدئين: تطبيق Antigravity • Git لحفظ نسخة أساسية • حساب Google شخصي (+18)",

  s6_title: "ربط أداة خارجية في 5 خطوات",
  s6_1: "افتح Customizations من الشريط الجانبي ثم MCP Servers",
  s6_2: "اضغط على Add MCP Server (+)",
  s6_3: "اختر السيرفر المناسب واضغط Add",
  s6_4: "اوصف المهمة المطلوبة للوكيل",
  s6_5: "راجع الصلاحيات ووافق على الإجراءات المهمة",
  s6_ex_t: "مثال عملي للـ Prompt",
  s6_ex_b: "افحص أحدث سجلات النشر، اشرح سبب فشل البناء، اقترح حلاً، وانتظر موافقتي.",
  s6_warn_t: "انتبه جيداً",
  s6_warn_b: "سيرفر MCP يمكنه تنفيذ إجراءات وليس القراءة فقط؛ تأكد من مصدره وصلاحياته ولا يوجد ربط تلقائي بدون إذنك.",

  s7_title: "ماذا نستطيع أن نفعل مع Antigravity؟",
  s7_1t: "توضيح الفكرة",
  s7_1b: "تحويل الفكرة إلى متطلبات واضحة ومحددة",
  s7_2t: "التخطيط",
  s7_2b: "الحصول على خطة تنفيذ (Implementation Plan) لمراجعتها",
  s7_3t: "البناء",
  s7_3b: "تعديل وكتابة الكود عبر عدة ملفات معاً",
  s7_4t: "التشغيل",
  s7_4b: "تشغيل أوامر Terminal ضمن الصلاحيات المسموحة",
  s7_5t: "الاختبار",
  s7_5b: "فحص التطبيق وهو يعمل داخل متصفح حقيقي",
  s7_6t: "المراجعة",
  s7_6b: "قراءة الفروق (Diffs) وملخص Walkthrough",
  s7_call: "نحن نحدد الهدف، ونوافق على الصلاحيات، ونراجع المخرجات.",

  s8_title: "خريطة الطريق: بناء مشروع في 10 خطوات",
  s8_1: "التحميل",
  s8_2: "تسجيل الدخول",
  s8_3: "إنشاء مشروع",
  s8_4: "المتطلبات",
  s8_5: "الخطة",
  s8_6: "البناء",
  s8_7: "اختبار المتصفح",
  s8_8: "المراجعة",
  s8_9: "التخصيص والحدود",
  s8_10: "التكلفة والحصص",
  s8_call: "مشروع عملي حقيقي: موقع بورتفوليو شخصي لطالب حاسبات (المهارات، المشاريع، ونسخ الإيميل) — تم بناؤه واختباره مع Antigravity.",

  s9_title: "الخطوات 1–3: التحميل، تسجيل الدخول، المشروع",
  s9_1t: "1. التحميل",
  s9_1b: "من الصفحة الرسمية لتطبيق Antigravity؛ يدعم Windows 10 (64-bit) فأحدث، وmacOS، وLinux.",
  s9_2t: "2. تسجيل الدخول",
  s9_2b: "يفتح مصادقة Google في المتصفح (+18 ومصر مدعومة). حسابات الجامعة أو العمل قد تختلف صلاحياتها.",
  s9_3t: "3. إنشاء مشروع",
  s9_3b: "اختيار المجلد عبر Local mode أو New worktree لعزل التغييرات (مع العلم أنه ليس نسخة احتياطية كاملة).",

  s10_title: "الخطوات 4–5: المتطلبات والخطة",
  s10_1t: "خطوة 4: المتطلبات",
  s10_1b: "ابنِ موقع بورتفوليو لطالب حاسبات بـ HTML/CSS/JS؛ تأكد من عمل تبويبات المهارات، زرار نسخ الإيميل، وتجاوبه على عرض 390px.",
  s10_2t: "خطوة 5: أمر /plan ثم المراجعة",
  s10_2b: "راجع نطاق العمل والملفات وخطة الاختبار، واكتب تعليقاتك قبل الموافقة.",
  s10_vid: "فيديو 1: التخطيط وبناء الموقع من داخل Antigravity",
  launch_btn: "افتح البورتفوليو لايف ↗",

  s11_title: "الخطوة 6: البناء بالسياق الصحيح",
  s11_1t: "توفير السياق",
  s11_1b: "استخدم @ للإشارة إلى الملفات والمجلدات، وحدد السلوك المتوقع وشرط الاكتمال.",
  s11_2t: "راقب ما يتم تنفيذه",
  s11_2b: "الوكيل يعدل الملفات ويشغل أوامر Terminal حسب صلاحياته؛ افهم كل خطوة توافق عليها.",
  s11_3t: "وجّه ولا تبدأ من الصفر",
  s11_3b: "حدد الخطأ بدقة واطلب إصلاحاً مركزاً، ثم أعد نفس الاختبار.",
  s11_call: "مثال للملاحظات: \"زرار Copy Email لا يظهر رسالة تأكيد بعد الضغط عليه.\"",

  s12_title: "الخطوة 7: الاختبار في المتصفح",
  s12_f1: "1. افتح",
  s12_f2: "2. تفاعل",
  s12_f3: "3. افحص",
  s12_f4: "4. أصلح",
  s12_f5: "5. أعد الاختبار",
  s12_1t: "اطلب تفاعلاً حقيقياً",
  s12_1b: "اضغط تبويبات المهارات، انسخ الإيميل، تصفح المشاريع، وصغّر الشاشة للموبايل.",
  s12_2t: "افحص ما وراء الشكل",
  s12_2b: "تأكد من خلو Console من الأخطاء، وفشل الشبكة، وتناسق الشاشة على الموبايل (390px).",
  s12_3t: "اعرف إعداداتك",
  s12_3b: "المتصفح المدمج متاح للحسابات الشخصية والإصدارات الحديثة، وقد تحتاج Chrome في بيئات أخرى.",
  s12_vid: "فيديو 2: اختبار المتصفح من داخل Antigravity",
  launch_btn2: "افتح البورتفوليو ↗",

  s13_title: "الخطوة 8: مراجعة التغييرات والأدلة",
  s13_1t: "مراجعة الـ Diff ملفاً بملف",
  s13_1b: "قارن بين التعديلات غير المحفوظة أو الفرع أو تعديلات الوكيل. الاختبار الفعلي أهم من الاختبار المقترح فقط.",
  s13_2t: "تحذير مهم",
  s13_2b: "أمر Discard unstaged changes قد يحذف الملفات الجديدة غير المتتبعة فوراً.",

  s14_title: "الخطوات 9–10: التخصيص، الحدود، والتكلفة",
  s14_1t: "9. التخصيص",
  s14_1b: "Rules للقيود، Skills للخطوات المتكررة، وMCP للأدوات الخارجية. ابدأ بمجلد تجريبي وأقل صلاحيات.",
  s14_2t: "9. حماية البيانات",
  s14_2b: "لا تضع كلمات سر أو بيانات حقيقية في الـ prompts؛ وراجع إعدادات الخصوصية والـ Telemetry.",
  s14_3t: "10. التكلفة والحصص",
  s14_3b: "خطة مجانية ($0 Individual) بحصة أسبوعية، وخطط Pro وUltra لحصص أعلى؛ وقائمة الموديلات تتجدد باستمرار.",

  s15_title: "نظرة واقعية (The Reality Check)",
  s15_1t: "قد يخطئ",
  s15_1b: "تحقق دائماً من الكود والاختبارات والنتائج.",
  s15_2t: "الحكم البشري",
  s15_2b: "قرار ما نبنيه وما نطلقه يعود لنا.",
  s15_3t: "احمِ بياناتك",
  s15_3b: "لا أسرار أو بيانات خاصة في التجارب.",
  s15_4t: "توجد حدود",
  s15_4b: "هناك حصص استخدام وميزات مدفوعة وموافقات.",
  s15_5t: "لا ضمان كامل",
  s15_5b: "نجاح اختبار واحد لا يعني الجاهزية الكاملة للإنتاج.",

  s16_title: "مستقبل البرمجة أصبح مختلفاً",
  s16_next_t: "خطوتك القادمة",
  s16_1: "حمّل التطبيق من الصفحة الرسمية",
  s16_2: "أنشئ مجلد مشروع تجريبي",
  s16_3: "اكتب متطلبات واضحة ومحددة",
  s16_4: "اطلب خطة (/plan) واقرأها جيداً",
  s16_5: "اختبر التطبيق في المتصفح",
  s16_6: "راجع الفروق (Diff) ثم طوّر مشروعك",
  s16_quote: "«المستقبل ليس لمن يستهلكون التكنولوجيا فقط، بل لمن يعرفون كيف يبنون بها.»",

  s17_title: "شكراً لحسن استماعكم — هل توجد أسئلة؟",
  s17_sub: "خطّط. ابنِ. اختبر. راجع. • مسابقة تفاعلية من 5 أسئلة",
  quiz_next: "السؤال التالي ←",
  quiz_reset: "إعادة المسابقة",

  s18_title: "تمت المهمة بنجاح! (MISSION PASSED + RESPECT)",
  s18_sub: "فريق V for Vendetta (7 أفراد) — المهمة اكتملت بنجاح",
  s18_cap: "خاتمة بأسلوب GTA • الـ 7 أعضاء مع موسيقى وأنيميشن النجاح",

  s19_title: "المصادر والمراجع"
};

const EN_ORIGINALS = {};
document.querySelectorAll("[data-t]").forEach((el) => {
  EN_ORIGINALS[el.dataset.t] = el.textContent.trim();
});

const SPEAKER_NOTES = [
  {
    speaker: "Speaker 1 [AR] — Slide 1: Group Introduction",
    text: "صباح الخير جميعاً. إحنا جروب V for Vendetta، والنهارده هنوريكم إزاي نقدر نبني ونختبر مشروع حقيقي من الصفر باستخدام Google Antigravity خطوة بخطوة.\nمعاكم التيم: Abram William, Kerols Hany, Beshoy Maged, Peter Reda, Abdelrahman Nasser, Mina Arsanios, Makary Younan."
  },
  {
    speaker: "Speaker 1 [AR] — Slide 2: Opening Questions",
    text: "قبل ما نبدأ، عندي سؤالين ليكم:\nأول سؤال: آخر مرة استخدمتوا فيها الذكاء الاصطناعي كانت إمتى؟\nتاني سؤال: هل ممكن الذكاء الاصطناعي ياخد مكان المبرمج؟ خلوا السؤال ده في بالكم وهنرجعله في الآخر."
  },
  {
    speaker: "Speaker 1 [AR] — Slide 3: The AI Revolution",
    text: "بصوا على الأرقام حسب McKinsey: 2017 كانت 20%، في 2022 وصلت 50%، وفي 2025 وصلت 88%."
  },
  {
    speaker: "Speaker 2 [EN] — Slide 4: Traditional vs. Antigravity",
    text: "Compare the traditional workflow with Google Antigravity across understanding, planning, coding, browser testing, diff review, and Rules/Skills."
  },
  {
    speaker: "Speaker 2 [EN] — Slide 5: Why Antigravity?",
    text: "Explain the 4 pillars: MCP, Rules, Skills, and Subagents + beginner setup."
  },
  {
    speaker: "Speaker 2 [EN] — Slide 6: Connect MCP in 5 Steps",
    text: "Walk through the 5 steps to connect an external MCP tool and emphasize reviewing permissions."
  },
  {
    speaker: "Speaker 2 [EN] — Slide 7: What Can We Do?",
    text: "Summarize: Clarify, Plan, Build, Run, Test, Review. We set the goal and verify the output."
  },
  {
    speaker: "Speaker 3 [AR] — Slide 8: The 10-Step Roadmap",
    text: "خريطة طريق من 10 خطوات لبناء موقع بورتفوليو شخصي لطالب حاسبات (CS Student Portfolio) من الصفر."
  },
  {
    speaker: "Speaker 3 [AR] — Slide 9: Steps 1–3 (Setup)",
    text: "التحميل، تسجيل الدخول بحساب جوجل (+18 ومصر مدعومة)، وإنشاء فولدر المشروع."
  },
  {
    speaker: "Speaker 3 [AR] — Slide 10: Steps 4–5 (Requirements & Plan)",
    text: "كتابة المتطلبات بوضوح واستخدام /plan قبل أي تعديل — وفيديو متسجل من جوه Antigravity بيورينا الخطة والبناء."
  },
  {
    speaker: "Speaker 4 [AR] — Slide 11: Step 6 (Build with Context)",
    text: "توجيه الـ agent بالـ @ context ومراقبة التعديلات والأوامر وتحديد الخطأ بدل البدء من الصفر."
  },
  {
    speaker: "Speaker 4 [AR] — Slide 12: Step 7 (Test in the Browser)",
    text: "الاختبار التفاعلي في المتصفح المدمج جوه Antigravity (تجربة أزرار المهارات، نسخ الإيميل، ومقاس الموبايل 390px)."
  },
  {
    speaker: "Speaker 5 [AR] — Slide 13: Step 8 (Review & Evidence)",
    text: "مراجعة الـ Diff سطر بسطر وملخص الـ Walkthrough والتحذير من Discard unstaged changes."
  },
  {
    speaker: "Speaker 5 [AR] — Slide 14: Steps 9–10 (Limits & Cost)",
    text: "الحدود وحماية البيانات وأقل صلاحيات، والخطة المجانية ($0) مقابل Pro وUltra."
  },
  {
    speaker: "Speaker 6 [EN] — Slide 15: The Reality Check",
    text: "Reality check + returning to Question 2: AI won't replace you alone, but a developer who uses it wisely and reviews the work will have greater capabilities."
  },
  {
    speaker: "Speaker 6 [EN] — Slide 16: The Future of Development",
    text: "Action steps and final quote: build with technology, start small, build step by step."
  },
  {
    speaker: "Speaker 7 [AR] — Slide 17: Thank You & Quiz",
    text: "شكراً لحسن استماعكم، وقت الأسئلة وبعدها المسابقة التفاعلية (5 أسئلة)."
  },
  {
    speaker: "Speaker 7 [AR] — Slide 18: Mission Passed!",
    text: "خاتمة الفريق — فيديو الـ 7 أعضاء (Mission Passed + Respect)!"
  },
  {
    speaker: "Reference — Slide 19: Sources",
    text: "Official documentation and McKinsey references."
  }
];

const QUIZ_DATA = [
  {
    en: {
      q: "1. Which command asks Antigravity for a reviewable Implementation Plan before editing?",
      options: ["/build", "/plan", "/test", "/commit"],
      explain: "Correct! /plan creates an Implementation Plan for you to review before any code changes."
    },
    ar: {
      q: "1. أي أمر يطلب من Antigravity عمل خطة تنفيذ للمراجعة قبل تعديل الكود؟",
      options: ["/build", "/plan", "/test", "/commit"],
      explain: "صحيح! أمر /plan ينشئ Implementation Plan لمراجعتها قبل أي تعديل."
    },
    correct: 1
  },
  {
    en: {
      q: "2. True or False: A Git worktree is a full backup and a security sandbox.",
      options: ["True — it protects everything", "False — it only isolates changes", "True — it blocks all network calls", "Only on macOS"],
      explain: "False! A worktree isolates your working copy in Git, but it is neither a backup nor a security sandbox."
    },
    ar: {
      q: "2. صح أم خطأ: الـ Git worktree يعتبر نسخة احتياطية كاملة وصندوق حماية (Sandbox).",
      options: ["صح — يحمي كل شيء", "خطأ — يعزل التغييرات فقط", "صح — يمنع الشبكة", "على الماك فقط"],
      explain: "خطأ! الـ worktree يعزل التغييرات فقط، وليس نسخة احتياطية أو حماية أمنية."
    },
    correct: 1
  },
  {
    en: {
      q: "3. Which of these can the agent test in the browser for our Student Portfolio?",
      options: ["Only background color", "Skills tabs, Copy Email & 390px layout", "Hardware CPU speed", "Nothing in the browser"],
      explain: "The agent can interact with the portfolio (filter Skills tabs, click Copy Email) and check console errors & 390px layout."
    },
    ar: {
      q: "3. ماذا يستطيع الوكيل اختباره داخل المتصفح في موقع البورتفوليو الشخصي؟",
      options: ["لون الخلفية فقط", "تبويبات المهارات ونسخ الإيميل ومقاس 390px", "سرعة المعالج", "لا شيء في المتصفح"],
      explain: "يستطيع التفاعل الكامل مع الموقع وفحص أخطاء Console ومقاس الموبايل."
    },
    correct: 1
  },
  {
    en: {
      q: "4. What should you check before relying on a specific model next week?",
      options: ["Your laptop battery", "The model picker and pricing page", "The CSS file", "Only social media"],
      explain: "Model lists and quotas change over time, so check the model picker and official pricing page."
    },
    ar: {
      q: "4. ماذا يجب أن تراجع قبل الاعتماد على موديل محدد الأسبوع القادم؟",
      options: ["بطارية اللابتوب", "قائمة الموديلات وصفحة الأسعار", "ملف الـ CSS", "السوشيال ميديا"],
      explain: "قوائم الموديلات والحصص تتغير باستمرار، لذا راجع Model Picker وصفحة الأسعار."
    },
    correct: 1
  },
  {
    en: {
      q: "5. Rules, Skills, or MCP: which one connects an external tool?",
      options: ["Rules", "Skills", "MCP", "Walkthrough"],
      explain: "MCP (Model Context Protocol) connects external tools & data. Rules are constraints, and Skills are reusable procedures."
    },
    ar: {
      q: "5. أي مما يلي يربط الوكيل بأداة خارجية: Rules أم Skills أم MCP؟",
      options: ["Rules", "Skills", "MCP", "Walkthrough"],
      explain: "بروتوكول MCP يربط الأدوات الخارجية، بينما Rules للقيود وSkills للإجراءات."
    },
    correct: 2
  }
];

let current = 0;
let isArabicView = false;

function applyLanguage() {
  document.querySelectorAll("[data-t]").forEach((el) => {
    const key = el.dataset.t;
    if (isArabicView && AR_TRANSLATIONS[key]) {
      el.textContent = AR_TRANSLATIONS[key];
    } else if (EN_ORIGINALS[key] !== undefined) {
      el.textContent = EN_ORIGINALS[key];
    }
  });

  slides.forEach((s) => s.classList.toggle("translated-ar", isArabicView));

  if (isArabicView) {
    langPill.textContent = "AR ✓ (اضغط للإنجليزي)";
    langPill.classList.add("ar-active");
  } else {
    langPill.textContent = "AR (ترجمة للعربي)";
    langPill.classList.remove("ar-active");
  }
  renderQuiz();
}

langPill.addEventListener("click", () => {
  isArabicView = !isArabicView;
  applyLanguage();
});

function showSlide(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((s, i) => s.classList.toggle("active", i === current));

  const pct = ((current + 1) / slides.length) * 100;
  progressFill.style.width = `${pct}%`;
  slideCounter.textContent = `${String(current + 1).padStart(2, "0")} / ${slides.length}`;

  const note = SPEAKER_NOTES[current] || { speaker: "Notes", text: "" };
  notesSpeaker.textContent = note.speaker;
  notesText.textContent = note.text;
}

prevBtn.addEventListener("click", () => showSlide(current - 1));
nextBtn.addEventListener("click", () => showSlide(current + 1));
notesBtn.addEventListener("click", () => { notesDrawer.hidden = !notesDrawer.hidden; });

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
});

function buildOverview() {
  overviewGrid.innerHTML = "";
  slides.forEach((s, i) => {
    const btn = document.createElement("button");
    btn.className = "overview-item";
    btn.innerHTML = `<div class="muted">Slide ${i + 1} &bull; [${s.dataset.lang}]</div><strong>${s.dataset.title}</strong>`;
    btn.addEventListener("click", () => {
      overviewModal.hidden = true;
      showSlide(i);
    });
    overviewGrid.appendChild(btn);
  });
}

overviewBtn.addEventListener("click", () => {
  buildOverview();
  overviewModal.hidden = false;
});
closeOverview.addEventListener("click", () => { overviewModal.hidden = true; });

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " ") {
    if (document.activeElement.tagName !== "BUTTON") {
      e.preventDefault();
      showSlide(current + 1);
    }
  } else if (e.key === "ArrowLeft") {
    showSlide(current - 1);
  } else if (e.key.toLowerCase() === "n") {
    notesDrawer.hidden = !notesDrawer.hidden;
  } else if (e.key.toLowerCase() === "g") {
    buildOverview();
    overviewModal.hidden = !overviewModal.hidden;
  } else if (e.key.toLowerCase() === "f") {
    fullscreenBtn.click();
  } else if (e.key === "Escape") {
    overviewModal.hidden = true;
  }
});

// Quiz logic
let quizIdx = 0;
let quizScore = 0;
let answered = false;

const quizProgress = document.getElementById("quiz-progress");
const quizScoreEl = document.getElementById("quiz-score");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizFeedback = document.getElementById("quiz-feedback");
const quizNext = document.getElementById("quiz-next");
const quizReset = document.getElementById("quiz-reset");

function renderQuiz() {
  const item = QUIZ_DATA[quizIdx];
  const copy = isArabicView ? item.ar : item.en;
  answered = false;
  quizProgress.textContent = isArabicView
    ? `السؤال ${quizIdx + 1} من ${QUIZ_DATA.length}`
    : `Question ${quizIdx + 1} of ${QUIZ_DATA.length}`;
  quizScoreEl.textContent = isArabicView
    ? `النتيجة: ${quizScore} / ${QUIZ_DATA.length}`
    : `Score: ${quizScore} / ${QUIZ_DATA.length}`;
  quizQuestion.textContent = copy.q;
  quizFeedback.textContent = "";
  quizOptions.innerHTML = "";

  copy.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-opt";
    btn.textContent = opt;
    btn.addEventListener("click", () => {
      if (answered) return;
      answered = true;
      const allBtns = quizOptions.querySelectorAll(".quiz-opt");
      allBtns.forEach((b, bIdx) => {
        b.disabled = true;
        if (bIdx === item.correct) b.classList.add("correct");
      });
      if (idx === item.correct) {
        quizScore++;
        quizScoreEl.textContent = isArabicView
          ? `النتيجة: ${quizScore} / ${QUIZ_DATA.length}`
          : `Score: ${quizScore} / ${QUIZ_DATA.length}`;
      } else {
        btn.classList.add("wrong");
      }
      quizFeedback.textContent = copy.explain;
    });
    quizOptions.appendChild(btn);
  });
}

quizNext.addEventListener("click", () => {
  if (quizIdx < QUIZ_DATA.length - 1) {
    quizIdx++;
    renderQuiz();
  } else {
    quizFeedback.textContent = isArabicView
      ? `انتهت المسابقة! نتيجتك النهائية: ${quizScore} / ${QUIZ_DATA.length}.`
      : `Quiz finished! Final Score: ${quizScore} / ${QUIZ_DATA.length}.`;
  }
});

quizReset.addEventListener("click", () => {
  quizIdx = 0;
  quizScore = 0;
  renderQuiz();
});

applyLanguage();
showSlide(0);
