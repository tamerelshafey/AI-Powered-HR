
import { PerformanceReview, CompanyGoal, PerformanceStatus, UserRole } from '../../types';
import { employees } from '../employees/data';

// Find employees to assign reviews/goals
const marketingManager = employees.find(e => e.department === 'قسم التسويق' && e.role === UserRole.DEPARTMENT_MANAGER); // Jane Smith
const marketingSpecialist = employees.find(e => e.id === 'EMP008'); // سمير صالح
const engineeringEmployee = employees.find(e => e.department === 'قسم الهندسة'); // John Doe
const salesEmployee = employees.find(e => e.department === 'قسم المبيعات'); // Mike Wilson

export const allReviews: PerformanceReview[] = [
    {
        id: 'REV001',
        employee: marketingManager!,
        reviewDate: 'Jan 15, 2025',
        overallScore: 0,
        status: PerformanceStatus.PENDING,
        reviewType: 'مراجعة ربع سنوية',
        employeeComments: "أعتقد أنني حققت تقدمًا جيدًا في الحملة الأخيرة، لكنني أرغب في الحصول على تدريب إضافي في تحليل البيانات.",
        metrics: [
            { name: 'التواصل', score: 4, managerComments: 'يظهر مهارات تواصل قوية مع الفريق وأصحاب المصلحة.' },
            { name: 'تحقيق الأهداف', score: 3, managerComments: 'الأهداف تم تحقيقها جزئيًا، تحتاج إلى تركيز أكبر على النتائج الرئيسية.' },
            { name: 'العمل الجماعي', score: 5, managerComments: 'متعاون للغاية وداعم لأعضاء الفريق.' },
        ]
    },
    {
        id: 'REV002',
        employee: engineeringEmployee!,
        reviewDate: 'Jan 20, 2025',
        overallScore: 0,
        status: PerformanceStatus.PENDING,
        reviewType: 'مراجعة الأداء السنوية',
        employeeComments: "لقد تعلمت الكثير هذا العام وأتطلع إلى تولي المزيد من المسؤوليات في المشاريع القادمة.",
        metrics: [
            { name: 'جودة الكود', score: 0, managerComments: '' },
            { name: 'حل المشكلات', score: 0, managerComments: '' },
            { name: 'الالتزام بالمواعيد النهائية', score: 0, managerComments: '' },
        ]
    },
    {
        id: 'REV003',
        employee: salesEmployee!,
        reviewDate: 'Dec 30, 2024',
        overallScore: 4.8,
        status: PerformanceStatus.COMPLETED,
        reviewType: 'مراجعة ربع سنوية',
        employeeComments: "ربع ناجح للغاية، تمكنت من تجاوز أهدافي بفضل استراتيجية المبيعات الجديدة.",
        metrics: [
            { name: 'تحقيق المبيعات', score: 5, managerComments: 'أداء استثنائي وتجاوز الأهداف بنسبة 20%.' },
            { name: 'علاقات العملاء', score: 5, managerComments: 'تلقى ردود فعل إيجابية للغاية من العملاء الرئيسيين.' },
            { name: 'المبادرة', score: 4, managerComments: 'يقدم باستمرار أفكارًا جديدة لتحسين عملية المبيعات.' },
        ]
    },
    {
        id: 'REV004',
        employee: employees.find(e => e.jobTitle === 'HR Manager')!,
        reviewDate: 'Feb 1, 2025',
        overallScore: 0,
        status: PerformanceStatus.PENDING,
        reviewType: 'مراجعة الأهداف',
        employeeComments: "",
        metrics: []
    },
    {
        id: 'REV005',
        employee: { ...marketingManager!, firstName: 'Emily', lastName: 'Jones', id: 'EMP007', avatarInitials: 'EJ' },
        reviewDate: 'Jan 18, 2025',
        overallScore: 0,
        status: PerformanceStatus.PENDING,
        reviewType: 'مراجعة ربع سنوية',
        employeeComments: "",
        metrics: []
    },
    // New Monthly Reviews for Marketing Team
    {
        id: 'REV010',
        employee: marketingSpecialist!,
        reviewDate: 'July 31, 2024',
        overallScore: 0,
        status: PerformanceStatus.PENDING,
        reviewType: 'تقييم شهري',
        employeeComments: "أتطلع لمناقشة نتائج حملة الصيف.",
        metrics: [
            { name: 'إدارة الحملات', score: 0, managerComments: '' },
            { name: 'تحليل البيانات', score: 0, managerComments: '' },
            { name: 'المبادرة', score: 0, managerComments: '' },
        ]
    },
    {
        id: 'REV011',
        employee: marketingSpecialist!,
        reviewDate: 'June 30, 2024',
        overallScore: 4.2,
        status: PerformanceStatus.COMPLETED,
        reviewType: 'تقييم شهري',
        employeeComments: "كان شهرًا جيدًا، تعلمت الكثير من مشروع إطلاق المنتج الجديد.",
        metrics: [
            { name: 'إدارة الحملات', score: 4, managerComments: 'أظهر تحسناً في تتبع مؤشرات الأداء الرئيسية.' },
            { name: 'تحليل البيانات', score: 4, managerComments: 'قدم تقارير واضحة ومفيدة.' },
            { name: 'المبادرة', score: 5, managerComments: 'اقترح فكرة جديدة لقنوات التواصل الاجتماعي تم تطبيقها بنجاح.' },
        ]
    },

    // New Monthly Reviews for Engineering Team
    {
        id: 'REV012',
        employee: engineeringEmployee!, // John Doe
        reviewDate: 'July 28, 2024',
        overallScore: 0,
        status: PerformanceStatus.PENDING,
        reviewType: 'تقييم شهري',
        employeeComments: "أعمل حاليًا على تحسين أداء واجهة المستخدم، وسأشارك النتائج قريبًا.",
        metrics: [
            { name: 'جودة الكود', score: 0, managerComments: '' },
            { name: 'الالتزام بالمواعيد', score: 0, managerComments: '' },
        ]
    },
    {
        id: 'REV013',
        employee: engineeringEmployee!, // John Doe
        reviewDate: 'June 28, 2024',
        overallScore: 4.5,
        status: PerformanceStatus.COMPLETED,
        reviewType: 'تقييم شهري',
        employeeComments: "تم الانتهاء من ميزة X بنجاح قبل الموعد النهائي.",
        metrics: [
            { name: 'جودة الكود', score: 5, managerComments: 'كود نظيف وموثق جيدًا.' },
            { name: 'الالتزام بالمواعيد', score: 5, managerComments: 'سلم المشروع قبل الموعد بيومين.' },
        ]
    },

    // New Annual Review
    {
        id: 'REV014',
        employee: engineeringEmployee!, // John Doe
        reviewDate: 'Dec 15, 2024',
        overallScore: 0,
        status: PerformanceStatus.PENDING,
        reviewType: 'تقييم سنوي',
        employeeComments: "أتطلع لمراجعة أدائي خلال العام وتحديد أهداف العام القادم.",
        metrics: [
            { name: 'جودة الكود', score: 0, managerComments: '' },
            { name: 'الالتزام بالمواعيد', score: 0, managerComments: '' },
            { name: 'العمل الجماعي', score: 0, managerComments: '' },
            { name: 'الابتكار', score: 0, managerComments: '' },
        ]
    }
];

export const allGoals: CompanyGoal[] = [
    {
        id: 'GOAL01',
        title: 'زيادة رضا العملاء بنسبة 10%',
        progress: 75,
        department: 'All',
        keyResults: [
            { description: 'إجراء 50 مقابلة مع العملاء للحصول على ملاحظاتهم', isCompleted: true },
            { description: 'تقليل متوسط وقت الرد على تذاكر الدعم إلى أقل من 4 ساعات', isCompleted: true },
            { description: 'تحقيق درجة NPS (صافي نقاط الترويج) تبلغ 50 أو أعلى', isCompleted: false },
        ]
    },
    {
        id: 'GOAL02',
        title: 'إطلاق حملة تسويقية جديدة للربع الأول',
        progress: 40,
        department: 'قسم التسويق',
        keyResults: [
            { description: 'تحديد الجمهور المستهدف والرسائل الرئيسية', isCompleted: true },
            { description: 'إنشاء محتوى الحملة (إعلانات، منشورات مدونة)', isCompleted: true },
            { description: 'إطلاق الحملة على 3 منصات رئيسية', isCompleted: false },
        ]
    },
    {
        id: 'GOAL03',
        title: 'تقليل وقت استجابة الخادم بنسبة 20%',
        progress: 90,
        department: 'قسم الهندسة',
        employeeId: 'EMP001', // Specific to John Doe
        keyResults: [
             { description: 'تحسين استعلامات قاعدة البيانات البطيئة', isCompleted: true },
             { description: 'تطبيق شبكة توصيل المحتوى (CDN) للأصول الثابتة', isCompleted: true },
             { description: 'ترقية خطط الخادم', isCompleted: false },
        ]
    },
    {
        id: 'GOAL04',
        title: 'تحقيق 500 ألف دولار في المبيعات الجديدة',
        progress: 65,
        department: 'قسم المبيعات',
        keyResults: [
             { description: 'إغلاق 10 صفقات كبيرة (أكبر من 20 ألف دولار)', isCompleted: true },
             { description: 'إجراء 100 عرض تجريبي للمنتج', isCompleted: false },
        ]
    },
    {
        id: 'GOAL05',
        title: 'إكمال تدريب القيادة',
        progress: 100,
        department: 'قسم التسويق',
        employeeId: 'EMP002', // Specific to Jane Smith
        keyResults: [
            { description: 'حضور جميع ورش العمل التدريبية', isCompleted: true },
            { description: 'إكمال المشروع النهائي بنجاح', isCompleted: true },
        ]
    },
];
