
import { Employee, LeaveType, CalculatedLeaveBalance, LeaveRequest } from '../types';
import { leaveTypeSettingsData } from '../pages/settings/data';
import { getAllLeaveRequests } from './api';

// Helper to calculate difference in full years/months
const dateDiff = (start: Date, end: Date) => {
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    return { years, months };
};


export const calculateLeaveBalances = async (employee: Employee): Promise<CalculatedLeaveBalance[]> => {
    const allRequests = await getAllLeaveRequests(); // In a real app, this should be pre-filtered by employee on the backend
    const employeeRequests = allRequests.filter(r => r.employee.id === employee.id && r.status === 'APPROVED');

    const today = new Date();
    const hireDate = new Date(employee.hireDate);
    const birthDate = new Date(employee.dateOfBirth);
    const { years: tenureYears, months: tenureMonths } = dateDiff(hireDate, today);
    const { years: age } = dateDiff(birthDate, today);

    const calculatedBalances: CalculatedLeaveBalance[] = [];

    for (const setting of leaveTypeSettingsData) {
        let total = setting.balanceDays;
        
        // Rule: Annual Leave based on tenure and age
        if (setting.name === LeaveType.VACATION) {
            if (tenureYears >= 10 || age >= 50) {
                total = 30;
            } else if (tenureYears > 0) { // After first year
                total = 21;
            } else { // First year, after 6 months
                total = 15;
            }
        }
        
        // Rule: Special Needs leave for PWD
        if (setting.name === LeaveType.SPECIAL_NEEDS && !employee.isPersonWithDisability) {
           continue; // Skip if employee is not PWD
        }

        const used = employeeRequests
            .filter(r => r.leaveType === setting.name)
            .reduce((sum, r) => sum + r.days, 0);

        calculatedBalances.push({
            type: setting.name,
            nameKey: `enum.leaveType.${setting.name}`,
            used,
            total,
            color: `bg-${setting.color}-500`,
            remaining: total - used
        });
    }

    return calculatedBalances;
};
