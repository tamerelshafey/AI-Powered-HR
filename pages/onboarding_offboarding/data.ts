import { OnboardingProcess, ProcessType, ProcessStatus, OnboardingTaskStatus } from '../../types';
import { employees } from '../employees/data';

export const onboardingProcesses: OnboardingProcess[] = [
    {
        id: 'ONB001',
        employee: { ...employees[0], firstName: 'نورة', lastName: 'القحطاني', avatarInitials: 'نق', avatarColor: 'bg-teal-500' },
        type: ProcessType.ONBOARDING,
        date: 'July 1, 2024',
        manager: 'سارة جونسون',
        status: ProcessStatus.IN_PROGRESS,
        progress: 43,
        tasks: [
            { id: 't1', title: 'إرسال خطاب العرض', status: OnboardingTaskStatus.COMPLETED, dueDate: 'June 15, 2024', assignee: 'HR' },
            { id: 't2', title: 'توقيع العقد', status: OnboardingTaskStatus.COMPLETED, dueDate: 'June 20, 2024', assignee: 'الموظف' },
            { id: 't3', title: 'إعداد حسابات النظام', status: OnboardingTaskStatus.COMPLETED, dueDate: 'June 28, 2024', assignee: 'IT' },
            { 
                id: 't4', 
                title: 'تجهيز المعدات (لابتوب)', 
                status: OnboardingTaskStatus.PENDING, 
                dueDate: 'June 30, 2024', 
                assignee: 'IT',
                notes: [
                    { text: 'تم طلب موديل MacBook Pro M3.', author: 'قسم IT', date: '2024-06-29' },
                    { text: 'من المتوقع وصول الجهاز غداً.', author: 'قسم IT', date: '2024-06-30' }
                ]
            },
            { id: 't5', title: 'جدولة اللقاء التعريفي', status: OnboardingTaskStatus.PENDING, dueDate: 'July 1, 2024', assignee: 'المدير' },
            { id: 't6', title: 'تسليم أصول الشركة', type: 'ASSIGN_ASSETS', status: OnboardingTaskStatus.PENDING, dueDate: 'July 1, 2024', assignee: 'IT' },
            { id: 't7', title: 'شرح تعديلات قانون العمل الجديد للموظف', status: OnboardingTaskStatus.PENDING, dueDate: 'July 2, 2024', assignee: 'HR' }
        ]
    },
    {
        id: 'ONB002',
        employee: { ...employees[2], firstName: 'علي', lastName: 'الشهري', avatarInitials: 'عش', avatarColor: 'bg-orange-500' },
        type: ProcessType.ONBOARDING,
        date: 'June 25, 2024',
        manager: 'خالد الغامدي',
        status: ProcessStatus.OVERDUE,
        progress: 25,
        tasks: [
            { id: 't1', title: 'إرسال خطاب العرض', status: OnboardingTaskStatus.COMPLETED, dueDate: 'June 10, 2024', assignee: 'HR' },
            { 
                id: 't2', 
                title: 'توقيع العقد', 
                status: OnboardingTaskStatus.PENDING, 
                dueDate: 'June 15, 2024', 
                assignee: 'الموظف',
                notes: [
                     { text: 'تم إرسال تذكير للموظف للتوقيع.', author: 'فريق الموارد البشرية', date: '2024-06-18' }
                ]
            },
            { id: 't3', title: 'إعداد حسابات النظام', status: OnboardingTaskStatus.PENDING, dueDate: 'June 24, 2024', assignee: 'IT' },
            { id: 't4', title: 'تجهيز المعدات (لابتوب)', status: OnboardingTaskStatus.PENDING, dueDate: 'June 24, 2024', assignee: 'IT' },
        ]
    },
     {
        id: 'ONB003',
        employee: { ...employees[4], firstName: 'فهد', lastName: 'المطيري', avatarInitials: 'فم', avatarColor: 'bg-cyan-500' },
        type: ProcessType.ONBOARDING,
        date: 'May 15, 2024',
        manager: 'عبدالله محمد',
        status: ProcessStatus.COMPLETED,
        progress: 100,
        tasks: [
             { id: 't1', title: 'جميع المهام مكتملة', status: OnboardingTaskStatus.COMPLETED, dueDate: 'May 14, 2024', assignee: 'System' },
        ]
    },
    {
        id: 'OFF001',
        employee: employees[1],
        type: ProcessType.OFFBOARDING,
        date: 'July 15, 2024',
        manager: 'روبرت (الرئيس التنفيذي)',
        status: ProcessStatus.IN_PROGRESS,
        progress: 40,
        tasks: [
            { id: 't1', title: 'استلام إشعار الاستقالة', status: OnboardingTaskStatus.COMPLETED, dueDate: 'June 15, 2024', assignee: 'HR' },
            { id: 't2', title: 'إجراء مقابلة المغادرة', status: OnboardingTaskStatus.COMPLETED, dueDate: 'July 10, 2024', assignee: 'HR' },
            { id: 't3', title: 'استعادة أصول الشركة', type: 'RETRIEVE_ASSETS', status: OnboardingTaskStatus.PENDING, dueDate: 'July 15, 2024', assignee: 'IT' },
            { id: 't4', title: 'تعطيل الوصول للأنظمة', status: OnboardingTaskStatus.PENDING, dueDate: 'July 15, 2024', assignee: 'IT' },
            { id: 't5', title: 'معالجة التسوية النهائية', status: OnboardingTaskStatus.PENDING, dueDate: 'July 25, 2024', assignee: 'الرواتب' },
        ]
    },
];