import { HelpCenterCategory, HelpCenterArticle } from '../../types';

export const helpCenterCategories: HelpCenterCategory[] = [
    {
        id: 'cat_hr',
        name: 'سياسات الموارد البشرية',
        description: 'كل ما يتعلق بسياسات الإجازات، الحضور، والمزيد.',
        icon: 'fas fa-users-cog',
        articleCount: 3,
    },
    {
        id: 'cat_it',
        name: 'دعم تقنية المعلومات',
        description: 'حلول لمشاكل البريد الإلكتروني، الشبكة، والأجهزة.',
        icon: 'fas fa-laptop-code',
        articleCount: 2,
    },
    {
        id: 'cat_payroll',
        name: 'الرواتب والمنافع',
        description: 'أسئلة حول كشوف الرواتب، التأمين، والبدلات.',
        icon: 'fas fa-money-bill-wave',
        articleCount: 2,
    },
    {
        id: 'cat_general',
        name: 'أسئلة عامة',
        description: 'معلومات عن مرافق الشركة، الفعاليات، وغيرها.',
        icon: 'fas fa-info-circle',
        articleCount: 1,
    }
];

export const helpCenterArticles: HelpCenterArticle[] = [
    // HR
    {
        id: 'art_hr_01',
        title: 'كيف أقدم طلب إجازة؟',
        categoryId: 'cat_hr',
        content: '<p>لتقديم طلب إجازة، يرجى اتباع الخطوات التالية:</p><ol><li>اذهب إلى <strong>بوابة الموظف</strong>.</li><li>اختر قسم <strong>الإجازات</strong>.</li><li>انقر على زر <strong>"طلب جديد"</strong>.</li><li>املأ النموذج بالتواريخ المطلوبة والسبب.</li><li>انقر على <strong>"تقديم"</strong> وانتظر موافقة مديرك.</li></ol>',
        author: 'فريق الموارد البشرية',
        lastUpdated: 'June 1, 2024',
        views: 125,
        isPopular: true,
    },
    {
        id: 'art_hr_02',
        title: 'سياسة العمل عن بعد',
        categoryId: 'cat_hr',
        content: '<p>تنص سياسة العمل عن بعد على أنه يمكن للموظفين العمل من المنزل يومين في الأسبوع بموافقة المدير المباشر. يجب ضمان توفر اتصال إنترنت مستقر وبيئة عمل مناسبة.</p>',
        author: 'فريق الموارد البشرية',
        lastUpdated: 'May 15, 2024',
        views: 88,
        isPopular: true,
    },
    {
        id: 'art_hr_03',
        title: 'فهم تقييم الأداء السنوي',
        categoryId: 'cat_hr',
        content: '<p>يتم إجراء تقييم الأداء السنوي في شهر ديسمبر من كل عام. يهدف التقييم إلى مراجعة إنجازاتك وتحديد أهداف العام القادم ومناقشة فرص التطوير المهني.</p>',
        author: 'فريق الموارد البشرية',
        lastUpdated: 'April 20, 2024',
        views: 45,
        isPopular: false,
    },
    // IT
    {
        id: 'art_it_01',
        title: 'كيفية إعادة تعيين كلمة مرور البريد الإلكتروني',
        categoryId: 'cat_it',
        content: '<p>إذا نسيت كلمة مرور بريدك الإلكتروني، يمكنك إعادة تعيينها عبر بوابة الدعم التقني. انقر على "هل نسيت كلمة المرور؟" واتبع التعليمات التي ستصلك على هاتفك المسجل.</p>',
        author: 'فريق تقنية المعلومات',
        lastUpdated: 'June 5, 2024',
        views: 150,
        isPopular: true,
    },
    {
        id: 'art_it_02',
        title: 'إعداد اتصال VPN',
        categoryId: 'cat_it',
        content: '<p>للوصول إلى شبكة الشركة من الخارج، يجب عليك إعداد اتصال VPN. يمكنك العثور على دليل الإعداد الكامل والبرنامج المطلوب في مجلد "أدوات IT" المشترك.</p>',
        author: 'فريق تقنية المعلومات',
        lastUpdated: 'March 10, 2024',
        views: 62,
        isPopular: false,
    },
    // Payroll
    {
        id: 'art_payroll_01',
        title: 'متى يتم صرف الرواتب؟',
        categoryId: 'cat_payroll',
        content: '<p>يتم إيداع الرواتب في حسابات الموظفين في اليوم الخامس والعشرين من كل شهر ميلادي. إذا كان يوم 25 عطلة نهاية أسبوع أو عطلة رسمية، يتم الصرف في يوم العمل السابق له.</p>',
        author: 'فريق الرواتب',
        lastUpdated: 'January 1, 2024',
        views: 210,
        isPopular: true,
    },
    {
        id: 'art_payroll_02',
        title: 'كيفية الوصول إلى قسيمة الدفع (Payslip)',
        categoryId: 'cat_payroll',
        content: '<p>يمكنك عرض وتحميل قسائم الدفع الشهرية من خلال بوابة الموظف، تحت قسم "الرواتب". تتوفر القسائم عادة قبل يومين من تاريخ صرف الراتب.</p>',
        author: 'فريق الرواتب',
        lastUpdated: 'February 2, 2024',
        views: 95,
        isPopular: false,
    },
    // General
    {
        id: 'art_general_01',
        title: 'سياسة استخدام سيارات الشركة',
        categoryId: 'cat_general',
        content: '<p>سيارات الشركة مخصصة للاستخدامات المتعلقة بالعمل فقط. يجب على الموظفين الحفاظ على نظافة السيارة والالتزام بجدول الصيانة الدورية.</p>',
        author: 'إدارة المرافق',
        lastUpdated: 'May 5, 2024',
        views: 33,
        isPopular: false,
    },
];