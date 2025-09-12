
import {
  OnlineStatus,
  EmployeeStatus,
  AttendanceStatus,
  LeaveStatus,
  LeaveType,
  JobStatus,
  ProcessStatus,
  DocumentStatus,
  PayrollStatus,
  AssetStatus,
  PerformanceStatus,
  EnrollmentStatus,
  TicketStatus,
  TicketPriority,
  UserStatus,
  SurveyStatus,
} from '../types';

export const ONLINE_STATUS_CLASSES: Record<OnlineStatus, string> = {
  [OnlineStatus.ONLINE]: 'status-online',
  [OnlineStatus.OFFLINE]: 'status-offline',
  [OnlineStatus.AWAY]: 'status-away',
};

export const EMPLOYEE_STATUS_CLASSES: Record<EmployeeStatus, { bg: string; text: string }> = {
  [EmployeeStatus.ACTIVE]: { bg: 'bg-green-100', text: 'text-green-800' },
  [EmployeeStatus.ON_LEAVE]: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
};

export const ATTENDANCE_STATUS_CLASSES: Record<AttendanceStatus, string> = {
  [AttendanceStatus.PRESENT]: 'bg-green-100 text-green-800',
  [AttendanceStatus.ABSENT]: 'bg-red-100 text-red-800',
  [AttendanceStatus.LATE]: 'bg-orange-100 text-orange-800',
  [AttendanceStatus.EARLY_DEPARTURE]: 'bg-purple-100 text-purple-800',
  [AttendanceStatus.ON_LEAVE]: 'bg-yellow-100 text-yellow-800',
};

export const LEAVE_STATUS_CLASSES: Record<LeaveStatus, string> = {
  [LeaveStatus.APPROVED]: 'bg-green-100 text-green-800',
  [LeaveStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [LeaveStatus.REJECTED]: 'bg-red-100 text-red-800',
};

export const LEAVE_TYPE_CLASSES: Record<LeaveType, string> = {
  [LeaveType.VACATION]: 'bg-blue-100 text-blue-800',
  [LeaveType.SICK]: 'bg-red-100 text-red-800',
  [LeaveType.PERSONAL]: 'bg-purple-100 text-purple-800',
  [LeaveType.CASUAL]: 'bg-yellow-100 text-yellow-800',
  [LeaveType.PILGRIMAGE]: 'bg-green-100 text-green-800',
  [LeaveType.UNPAID]: 'bg-gray-100 text-gray-800',
  [LeaveType.EXAMINATION]: 'bg-indigo-100 text-indigo-800',
  [LeaveType.MATERNITY]: 'bg-pink-100 text-pink-800',
  [LeaveType.NEWBORN]: 'bg-teal-100 text-teal-800',
  [LeaveType.SPECIAL_NEEDS]: 'bg-cyan-100 text-cyan-800',
};

export const JOB_STATUS_CLASSES: Record<JobStatus, string> = {
  [JobStatus.ACTIVE]: 'bg-green-100 text-green-800',
  [JobStatus.CLOSED]: 'bg-red-100 text-red-800',
  [JobStatus.ON_HOLD]: 'bg-yellow-100 text-yellow-800',
};

export const PROCESS_STATUS_CLASSES: Record<ProcessStatus, string> = {
  [ProcessStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [ProcessStatus.COMPLETED]: 'bg-green-100 text-green-800',
  [ProcessStatus.OVERDUE]: 'bg-red-100 text-red-800',
};

export const DOCUMENT_STATUS_CLASSES: Record<DocumentStatus, string> = {
  [DocumentStatus.VALID]: 'bg-green-100 text-green-800',
  [DocumentStatus.EXPIRING_SOON]: 'bg-yellow-100 text-yellow-800',
  [DocumentStatus.EXPIRED]: 'bg-red-100 text-red-800',
  [DocumentStatus.MISSING]: 'bg-orange-100 text-orange-800',
};

export const PAYROLL_STATUS_CLASSES: Record<PayrollStatus, string> = {
  [PayrollStatus.DRAFT]: 'bg-yellow-100 text-yellow-800',
  [PayrollStatus.PROCESSED]: 'bg-blue-100 text-blue-800',
  [PayrollStatus.PAID]: 'bg-green-100 text-green-800',
};

export const ASSET_STATUS_CLASSES: Record<AssetStatus, string> = {
  [AssetStatus.IN_USE]: 'bg-green-100 text-green-800',
  [AssetStatus.AVAILABLE]: 'bg-blue-100 text-blue-800',
  [AssetStatus.IN_REPAIR]: 'bg-orange-100 text-orange-800',
  [AssetStatus.RETIRED]: 'bg-gray-100 text-gray-800',
};

export const PERFORMANCE_STATUS_CLASSES: Record<PerformanceStatus, string> = {
  [PerformanceStatus.PENDING]: 'bg-orange-100 text-orange-800',
  [PerformanceStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [PerformanceStatus.COMPLETED]: 'bg-green-100 text-green-800',
};

export const ENROLLMENT_STATUS_CLASSES: Record<EnrollmentStatus, string> = {
  [EnrollmentStatus.ENROLLED]: 'bg-gray-100 text-gray-800',
  [EnrollmentStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [EnrollmentStatus.COMPLETED]: 'bg-green-100 text-green-800',
};

export const TICKET_STATUS_CLASSES: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'bg-orange-100 text-orange-800',
  [TicketStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [TicketStatus.CLOSED]: 'bg-green-100 text-green-800',
};

export const TICKET_PRIORITY_CLASSES: Record<TicketPriority, string> = {
  [TicketPriority.HIGH]: 'border-red-500 text-red-600',
  [TicketPriority.MEDIUM]: 'border-yellow-500 text-yellow-600',
  [TicketPriority.LOW]: 'border-gray-500 text-gray-600',
};

export const USER_STATUS_CLASSES: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'bg-green-100 text-green-800',
  [UserStatus.INVITED]: 'bg-blue-100 text-blue-800',
  [UserStatus.INACTIVE]: 'bg-gray-100 text-gray-800',
};

export const SURVEY_STATUS_CLASSES: Record<SurveyStatus, string> = {
    [SurveyStatus.ACTIVE]: 'bg-green-100 text-green-800',
    [SurveyStatus.CLOSED]: 'bg-gray-100 text-gray-800',
    [SurveyStatus.DRAFT]: 'bg-yellow-100 text-yellow-800',
};
