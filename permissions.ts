
import { UserRole } from './types';

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  [UserRole.SYSTEM_ADMINISTRATOR]: [
    '/dashboard', '/reports', '/employees', '/departments', '/branches', '/attendance', '/leaves', '/job-titles', 
    '/payroll', '/documents', '/recruitment', '/performance', '/learning', 
    '/onboarding-offboarding', '/assets', '/support-tickets', '/help-center', 
    '/portal', '/org-chart', '/surveys', '/recognition', '/missions',
    '/settings'
  ],
  [UserRole.HR_MANAGER]: [
    '/dashboard', '/reports', '/employees', '/departments', '/branches', '/attendance', '/leaves', '/job-titles', 
    '/payroll', '/documents', '/recruitment', '/performance', '/learning', 
    '/onboarding-offboarding', '/assets', '/support-tickets', '/help-center',
    '/portal', '/org-chart', '/surveys', '/recognition', '/missions'
  ],
  [UserRole.HR_EMPLOYEE]: [
    '/dashboard', '/employees', '/departments', '/branches', '/attendance', '/leaves', '/documents', 
    '/recruitment', '/learning', '/onboarding-offboarding', '/support-tickets',
    '/portal', '/org-chart', '/recognition', '/missions'
  ],
  [UserRole.RECRUITMENT_OFFICER]: [
    '/dashboard', '/recruitment', '/employees',
    '/portal', '/recognition'
  ],
  [UserRole.DEPARTMENT_MANAGER]: [
    '/dashboard', '/reports', '/employees', '/departments', '/attendance', '/leaves', '/performance',
    '/portal', '/org-chart', '/recognition', '/missions'
  ],
  [UserRole.BRANCH_MANAGER]: [
    '/dashboard', '/reports', '/employees', '/branches', '/attendance', '/leaves',
    '/portal', '/org-chart', '/recognition', '/missions'
  ],
  [UserRole.BOARD_MEMBER]: [
    '/dashboard', '/reports', '/org-chart',
    '/portal', '/recognition'
  ],
  [UserRole.EMPLOYEE]: [],
  [UserRole.TRAINEE]: [],
  [UserRole.JOKER_EMPLOYEE]: [],
};

export const ADMIN_ROLES: UserRole[] = [
  UserRole.SYSTEM_ADMINISTRATOR,
  UserRole.HR_MANAGER,
  UserRole.HR_EMPLOYEE,
  UserRole.RECRUITMENT_OFFICER,
  UserRole.DEPARTMENT_MANAGER,
  UserRole.BRANCH_MANAGER,
  UserRole.BOARD_MEMBER,
];
