import { Branch, UserRole } from '../../types';
import { employees } from '../employees/data';

export const branches: Branch[] = [
  { 
    id: 'branch_ryd', 
    name: 'فرع الرياض الرئيسي', 
    location: 'الرياض، طريق الملك فهد',
    manager: employees.find(e => e.role === UserRole.BRANCH_MANAGER) || employees.find(e => e.id === 'EMP004')!, 
    employeeCount: 150 
  },
  { 
    id: 'branch_jed', 
    name: 'فرع جدة', 
    location: 'جدة، طريق الكورنيش', 
    manager: employees.find(e => e.id === 'EMP023')!, 
    employeeCount: 75 
  },
  { 
    id: 'branch_dmm', 
    name: 'فرع الدمام', 
    location: 'الدمام، حي الشاطئ', 
    manager: employees.find(e => e.id === 'EMP002')!, 
    employeeCount: 22 
  }
];