import { Course, CourseCategory, EmployeeEnrollment, EnrollmentStatus } from '../../types';
import { employees } from '../employees/data';

export const courses: Course[] = [
    {
        id: 'CRS001',
        title: 'مقدمة في React Hooks',
        category: CourseCategory.TECHNICAL,
        description: 'دورة شاملة حول أساسيات وميزات React Hooks المتقدمة.',
        durationHours: 8,
        provider: 'Bokra Academy',
        enrollmentCount: 2,
    },
    {
        id: 'CRS002',
        title: 'أساسيات القيادة للمديرين الجدد',
        category: CourseCategory.LEADERSHIP,
        description: 'تطوير المهارات القيادية الأساسية للنجاح في دور إداري.',
        durationHours: 12,
        provider: 'Coursera',
        enrollmentCount: 1,
    },
    {
        id: 'CRS003',
        title: 'مهارات التواصل الفعال',
        category: CourseCategory.SOFT_SKILLS,
        description: 'تعلم كيفية التواصل بوضوح وتأثير في بيئة العمل.',
        durationHours: 4,
        provider: 'Internal',
        enrollmentCount: 1,
    },
    {
        id: 'CRS004',
        title: 'تدريب الامتثال السنوي',
        category: CourseCategory.COMPLIANCE,
        description: 'تدريب إلزامي على سياسات الشركة وإجراءات الامتثال.',
        durationHours: 2,
        provider: 'HR Department',
        enrollmentCount: 0,
    },
     {
        id: 'CRS005',
        title: 'إدارة المشاريع Agile',
        category: CourseCategory.TECHNICAL,
        description: 'تعلم مبادئ Agile ومنهجيات Scrum لإدارة المشاريع.',
        durationHours: 16,
        provider: 'Udemy',
        enrollmentCount: 0,
    }
];

export const enrollments: EmployeeEnrollment[] = [
    {
        id: 'ENR001',
        employee: employees.find(e => e.id === 'EMP001')!, // John Doe
        course: courses.find(c => c.id === 'CRS001')!,
        enrollmentDate: '2024-06-01',
        status: EnrollmentStatus.IN_PROGRESS,
        progress: 75,
    },
    {
        id: 'ENR002',
        employee: employees.find(e => e.id === 'EMP002')!, // Jane Smith
        course: courses.find(c => c.id === 'CRS002')!,
        enrollmentDate: '2024-05-15',
        status: EnrollmentStatus.COMPLETED,
        progress: 100,
        completionDate: '2024-06-10'
    },
    {
        id: 'ENR003',
        employee: employees.find(e => e.id === 'EMP005')!, // Alex Chen
        course: courses.find(c => c.id === 'CRS001')!,
        enrollmentDate: '2024-06-10',
        status: EnrollmentStatus.IN_PROGRESS,
        progress: 25,
    },
    {
        id: 'ENR004',
        employee: employees.find(e => e.id === 'EMP003')!, // Mike Wilson
        course: courses.find(c => c.id === 'CRS003')!,
        enrollmentDate: '2024-06-20',
        status: EnrollmentStatus.ENROLLED,
        progress: 0,
    }
];
