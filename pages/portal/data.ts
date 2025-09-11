import { PortalNavItem, UpcomingEvent, PortalActivity, Announcement, TimeOffRequestPortal, LeaveStatus, LearningCourse, Skill, Achievement, Benefit, Feedback } from '../../types';

export const portalNavItems: PortalNavItem[] = [
    { id: 'dashboard', name: 'لوحة التحكم', icon: 'fas fa-home' },
    { id: 'profile', name: 'ملفي الشخصي', icon: 'fas fa-user' },
    { id: 'timeoff', name: 'الإجازات', icon: 'fas fa-calendar-alt', badge: '2', badgeColor: 'bg-orange-500' },
    { id: 'payroll', name: 'الرواتب', icon: 'fas fa-dollar-sign' },
    { id: 'benefits', name: 'المنافع', icon: 'fas fa-shield-alt' },
    { id: 'documents', name: 'المستندات', icon: 'fas fa-file-alt' },
    { id: 'learning', name: 'التعلم', icon: 'fas fa-graduation-cap' },
    { id: 'development_plan', name: 'خطتي التطويرية', icon: 'fas fa-rocket', badge: 'جديد', badgeColor: 'bg-purple-500' },
    { id: 'feedback', name: 'الملاحظات', icon: 'fas fa-comment' },
];

export const upcomingEvents: UpcomingEvent[] = [
    { title: 'اجتماع الفريق اليومي', time: 'اليوم، 10:00 صباحًا', icon: 'fas fa-video', color: 'blue' },
    { title: 'مراجعة المشروع', time: 'غدًا، 2:00 مساءً', icon: 'fas fa-users', color: 'green' },
    { title: 'جلسة تدريبية', time: 'الجمعة، 3:00 مساءً', icon: 'fas fa-graduation-cap', color: 'purple' },
];

export const portalActivities: PortalActivity[] = [
    { text: 'تمت الموافقة على طلب الإجازة', time: 'منذ ساعتين', icon: 'fas fa-check', color: 'green' },
    { text: 'قسيمة الدفع متاحة', time: 'منذ يوم', icon: 'fas fa-file', color: 'blue' },
    { text: 'تم إكمال التدريب', time: 'منذ 3 أيام', icon: 'fas fa-star', color: 'purple' },
];

export const announcements: Announcement[] = [
    { title: 'باقة تأمين صحي جديدة', content: 'يسرنا أن نعلن عن تحسينات في باقة التأمين الصحي تبدأ من الشهر القادم. تحقق من بوابة المنافع للحصول على التفاصيل.', author: 'فريق الموارد البشرية', time: 'منذ يومين', color: 'blue' },
    { title: 'نزهة الشركة - احفظ التاريخ!', content: 'انضم إلينا في نزهة الشركة السنوية يوم السبت، 15 يونيو في الحديقة المركزية. طعام وألعاب ومرح لجميع أفراد العائلة!', author: 'فريق الفعاليات', time: 'منذ أسبوع', color: 'green' },
];

export const learningCourses: LearningCourse[] = [
    { title: 'أنماط React المتقدمة', category: 'تقني', duration: '4 ساعات', rating: 4.8, categoryColor: 'blue' },
    { title: 'قيادة الفريق الفعالة', category: 'قيادة', duration: '6 ساعات', rating: 4.2, categoryColor: 'green' },
    { title: 'التميز في التواصل', category: 'مهارات شخصية', duration: '3 ساعات', rating: 4.9, categoryColor: 'purple' },
];

export const skills: Skill[] = [
    { name: 'JavaScript', progress: 85 },
    { name: 'React', progress: 78 },
    { name: 'Leadership', progress: 65 },
];

export const achievements: Achievement[] = [
    { title: 'إكمال الدورة', description: 'أكمل 5 دورات', icon: 'fas fa-medal', color: 'yellow' },
    { title: 'أفضل أداء', description: 'أفضل 10% في القسم', icon: 'fas fa-star', color: 'blue' },
    { title: 'لاعب فريق', description: 'تعاون ممتاز', icon: 'fas fa-users', color: 'green' },
];

export const benefitsData: Benefit[] = [
    {
        id: 'ben01',
        category: 'Health',
        title: 'التأمين الصحي',
        icon: 'fas fa-heartbeat',
        details: [
            { label: 'الشركة', value: 'Bupa Arabia' },
            { label: 'الفئة', value: 'ذهبية' },
            { label: 'رقم البوليصة', value: 'BUPA-123456' },
        ],
        action: { label: 'عرض بطاقة التأمين', link: '#' }
    },
    {
        id: 'ben02',
        category: 'Financial',
        title: 'خطة التقاعد',
        icon: 'fas fa-piggy-bank',
        details: [
            { label: 'مساهمة الموظف', value: '5%' },
            { label: 'مساهمة الشركة', value: '5%' },
            { label: 'الرصيد الحالي', value: '125,000 جنيه' },
        ],
        action: { label: 'إدارة الخطة', link: '#' }
    },
     {
        id: 'ben03',
        category: 'Wellness',
        title: 'برنامج العافية',
        icon: 'fas fa-spa',
        details: [
            { label: 'عضوية الجيم', value: 'Gold\'s Gym' },
            { label: 'دعم الصحة النفسية', value: 'متاح عبر تطبيق Calm' },
            { label: 'فحوصات سنوية', value: 'متاحة' },
        ],
        action: { label: 'معرفة المزيد', link: '#' }
    },
];

export const feedbackData: Feedback[] = [
    {
        id: 'fb01',
        type: 'received',
        from: 'Anonymous',
        content: 'كان عرضك التقديمي عن نتائج الربع السنوي رائعًا! واضح جدًا وثاقب.',
        date: 'July 15, 2024',
        category: 'Praise'
    },
     {
        id: 'fb02',
        type: 'received',
        from: 'سارة جونسون',
        content: 'يرجى التأكد من تحديث حالة المشروع في نظام إدارة المشاريع بنهاية كل يوم. سيساعد هذا في تحسين التنسيق مع الفرق الأخرى.',
        date: 'July 10, 2024',
        category: 'Constructive'
    },
    {
        id: 'fb03',
        type: 'given',
        from: 'أليكس تشين',
        to: 'فريق تقنية المعلومات',
        content: 'كان الدعم سريعًا وفعالًا جدًا عند مواجهة مشكلة في البريد الإلكتروني صباح اليوم. شكرًا لكم!',
        date: 'July 20, 2024',
        category: 'Praise'
    }
];