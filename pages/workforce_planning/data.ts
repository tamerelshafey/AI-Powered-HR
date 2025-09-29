import { Employee, DepartmentWorkforce } from '../../types';
import { employees } from '../employees/data';
import { departments } from '../departments/data';

const getDepartmentWorkforceData = (): DepartmentWorkforce[] => {
    const departmentMap: Record<string, { totalSalary: number; count: number }> = {};

    employees.forEach(employee => {
        if (!departmentMap[employee.department]) {
            departmentMap[employee.department] = { totalSalary: 0, count: 0 };
        }
        departmentMap[employee.department].count += 1;
        // Assign a mock salary if not present
        const salary = employee.salary || 50000 + (employee.id.charCodeAt(5) % 10) * 5000;
        departmentMap[employee.department].totalSalary += salary;
    });

    return departments.map(dept => {
        const data = departmentMap[dept.name];
        if (!data || data.count === 0) {
            return {
                department: dept.name,
                headcount: 0,
                averageSalary: 0,
            };
        }
        return {
            department: dept.name,
            headcount: data.count,
            averageSalary: Math.round(data.totalSalary / data.count),
        };
    });
};

export const departmentWorkforceData = getDepartmentWorkforceData();
