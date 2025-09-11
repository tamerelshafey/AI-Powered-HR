import { Department } from '../../types';
import { employees } from '../employees/data';

export const departments: Department[] = [
    {
        id: 'dep_eng',
        name: 'قسم الهندسة',
        manager: employees.find(e => e.id === 'EMP001')!, // John Doe (as placeholder manager)
        employeeCount: 25,
        parentDepartmentId: null,
        icon: 'fas fa-cogs',
        color: 'blue'
    },
    {
        id: 'dep_mkt',
        name: 'قسم التسويق',
        manager: employees.find(e => e.id === 'EMP002')!, // Jane Smith
        employeeCount: 15,
        parentDepartmentId: null,
        icon: 'fas fa-bullhorn',
        color: 'green'
    },
    {
        id: 'dep_sales',
        name: 'قسم المبيعات',
        manager: employees.find(e => e.id === 'EMP023')!, // Jason King
        employeeCount: 32,
        parentDepartmentId: null,
        icon: 'fas fa-chart-line',
        color: 'orange'
    },
    {
        id: 'dep_hr',
        name: 'الموارد البشرية',
        manager: employees.find(e => e.id === 'EMP004')!, // Sarah Johnson
        employeeCount: 12,
        parentDepartmentId: null,
        icon: 'fas fa-users',
        color: 'red'
    },
     {
        id: 'dep_design',
        name: 'قسم التصميم',
        manager: employees.find(e => e.id === 'EMP016')!, // Laura Martinez
        employeeCount: 8,
        parentDepartmentId: 'dep_eng',
        icon: 'fas fa-paint-brush',
        color: 'purple'
    },
     {
        id: 'dep_finance',
        name: 'قسم المالية',
        manager: employees.find(e => e.id === 'EMP006')!, // Lisa Brown
        employeeCount: 10,
        parentDepartmentId: null,
        icon: 'fas fa-dollar-sign',
        color: 'teal'
    }
];
