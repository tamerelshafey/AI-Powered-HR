
import { ExpenseClaim, ExpenseCategory, ExpenseStatus } from '../../types';
import { employees } from '../employees/data';
import { missions } from '../missions/data';

export const expenseClaims: ExpenseClaim[] = [
    {
        id: 'EXP001',
        employee: employees.find(e => e.id === 'EMP014')!, // Maria Garcia
        category: ExpenseCategory.TRAVEL,
        amount: 1500,
        date: '2024-07-20',
        description: 'تذاكر طيران لحضور مؤتمر TechSummit',
        status: ExpenseStatus.PENDING,
        missionId: 'MSN002',
        receiptUrl: '#'
    },
    {
        id: 'EXP002',
        employee: employees.find(e => e.id === 'EMP003')!, // Mike Wilson
        category: ExpenseCategory.MEALS,
        amount: 350,
        date: '2024-07-19',
        description: 'غداء عمل مع العميل (شركة ABC)',
        status: ExpenseStatus.APPROVED,
        missionId: 'MSN001',
        receiptUrl: '#'
    },
    {
        id: 'EXP003',
        employee: employees.find(e => e.id === 'EMP008')!, // سمير صالح
        category: ExpenseCategory.SUPPLIES,
        amount: 275.50,
        date: '2024-07-18',
        description: 'شراء أدوات مكتبية للقسم',
        status: ExpenseStatus.PAID,
        receiptUrl: '#'
    },
    {
        id: 'EXP004',
        employee: employees.find(e => e.id === 'EMP001')!, // John Doe
        category: ExpenseCategory.OTHER,
        amount: 800,
        date: '2024-07-15',
        description: 'رسوم اشتراك في منصة تعليمية للفريق',
        status: ExpenseStatus.REJECTED,
        receiptUrl: '#'
    },
     {
        id: 'EXP005',
        employee: employees.find(e => e.id === 'EMP002')!, // Jane Smith
        category: ExpenseCategory.TRAVEL,
        amount: 560,
        date: '2024-07-21',
        description: 'تكاليف مواصلات لزيارات العملاء',
        status: ExpenseStatus.PENDING,
        receiptUrl: '#'
    },
];
