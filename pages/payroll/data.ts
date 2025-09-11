import { PayrollRun, PayrollStatus, Payslip } from '../../types';
import { employees } from '../employees/data';

export const payrollRuns: PayrollRun[] = [
     {
        id: 'PR005',
        period: 'يوليو 2024',
        payDate: '2024-07-28',
        status: PayrollStatus.DRAFT,
        totalCost: 9850000,
        netPay: 8650000,
        deductions: 1200000,
        employeesCount: 248,
    },
    {
        id: 'PR004',
        period: 'يونيو 2024',
        payDate: '2024-06-28',
        status: PayrollStatus.PAID,
        totalCost: 9812500,
        netPay: 8625000,
        deductions: 1187500,
        employeesCount: 247,
    },
    {
        id: 'PR003',
        period: 'مايو 2024',
        payDate: '2024-05-30',
        status: PayrollStatus.PAID,
        totalCost: 9756250,
        netPay: 8581250,
        deductions: 1175000,
        employeesCount: 245,
    },
    {
        id: 'PR002',
        period: 'أبريل 2024',
        payDate: '2024-04-29',
        status: PayrollStatus.PAID,
        totalCost: 9687500,
        netPay: 8525000,
        deductions: 1162500,
        employeesCount: 242,
    },
    {
        id: 'PR001',
        period: 'مارس 2024',
        payDate: '2024-03-28',
        status: PayrollStatus.PAID,
        totalCost: 9637500,
        netPay: 8487500,
        deductions: 1150000,
        employeesCount: 240,
    },
];

export const costBreakdownData = {
    labels: ['الراتب الأساسي', 'البدلات', 'العمل الإضافي', 'الخصومات', 'الضرائب'],
    datasets: [{
        data: [6250000, 1875000, 562500, 375000, 812500],
        backgroundColor: [
            '#3b82f6', // blue
            '#10b981', // green
            '#f59e0b', // amber
            '#ef4444', // red
            '#8b5cf6'  // violet
        ],
        hoverOffset: 4,
    }]
};

export const employeePayslipsData: Record<string, Payslip[]> = {
    'PR005': [
        {
            employee: employees[0],
            run: payrollRuns[0], // July 2024 run
            earnings: [
                { name: 'الراتب الأساسي', amount: 30000 },
                { name: 'بدل انتقال', amount: 2000 },
                { name: 'بدل سكن', amount: 5000 },
            ],
            deductions: [
                { name: 'التأمينات الاجتماعية', amount: -1500 },
                { name: 'ضريبة كسب العمل', amount: -2500 },
                { name: 'إجازة غير مدفوعة (يومان)', amount: -2000 },
            ],
            grossPay: 37000,
            totalDeductions: -6000,
            netPay: 31000,
        },
        {
            employee: employees[1],
            run: payrollRuns[0],
            earnings: [
                { name: 'الراتب الأساسي', amount: 45000 },
                { name: 'بدل إدارة', amount: 8000 },
                { name: 'بدل سكن', amount: 7000 },
            ],
            deductions: [
                { name: 'التأمينات الاجتماعية', amount: -2200 },
                { name: 'ضريبة كسب العمل', amount: -4800 },
            ],
            grossPay: 60000,
            totalDeductions: -7000,
            netPay: 53000,
        }
    ],
    'PR004': [], // June data can be added here
    'PR003': [
        {
            employee: employees[0],
            run: payrollRuns[2], // May 2024 run
            earnings: [
                { name: 'الراتب الأساسي', amount: 30000 },
                { name: 'بدل انتقال', amount: 2000 },
                { name: 'بدل سكن', amount: 5000 },
            ],
            deductions: [
                { name: 'التأمينات الاجتماعية', amount: -1500 },
                { name: 'ضريبة كسب العمل', amount: -2500 },
                { name: 'سلفة', amount: -1000 },
            ],
            grossPay: 37000,
            totalDeductions: -5000,
            netPay: 32000,
        },
        {
            employee: employees[1],
            run: payrollRuns[2],
            earnings: [
                { name: 'الراتب الأساسي', amount: 45000 },
                { name: 'بدل إدارة', amount: 8000 },
                { name: 'بدل سكن', amount: 7000 },
            ],
            deductions: [
                { name: 'التأمينات الاجتماعية', amount: -2200 },
                { name: 'ضريبة كسب العمل', amount: -4800 },
            ],
            grossPay: 60000,
            totalDeductions: -7000,
            netPay: 53000,
        }
    ]
};