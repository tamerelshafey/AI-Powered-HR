

import React from 'react';

export enum UserRole {
  EMPLOYEE = 'EMPLOYEE',
  TRAINEE = 'TRAINEE',
  JOKER_EMPLOYEE = 'JOKER_EMPLOYEE',
  DEPARTMENT_MANAGER = 'DEPARTMENT_MANAGER',
  HR_MANAGER = 'HR_MANAGER',
  HR_EMPLOYEE = 'HR_EMPLOYEE',
  RECRUITMENT_OFFICER = 'RECRUITMENT_OFFICER',
  SYSTEM_ADMINISTRATOR = 'SYSTEM_ADMINISTRATOR',
  BRANCH_MANAGER = 'BRANCH_MANAGER',
  BOARD_MEMBER = 'BOARD_MEMBER',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INVITED = 'INVITED',
    INACTIVE = 'INACTIVE',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  avatarInitials: string;
  jobTitle: string;
  department: string;
  status: UserStatus;
}

export interface NavItem {
  path: string;
  nameKey: string;
  icon: React.ReactNode;
}

export enum OnlineStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  AWAY = 'AWAY',
}

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  ON_LEAVE = 'ON_LEAVE',
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  avatarInitials: string;
  avatarColor: string;
  jobTitle: string;
  department: string;
  branch: string;
  status: EmployeeStatus;
  onlineStatus: OnlineStatus;
  role: UserRole;
  shiftId?: string;
}

export interface Department {
  id: string;
  name: string;
  manager: Employee;
  employeeCount: number;
  parentDepartmentId: string | null;
  icon: string;
  color: string; // e.g., 'blue', 'green' for theming the card
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  manager: Employee;
  employeeCount: number;
}

// FIX: Added missing AttendanceStatsData type definition.
export interface AttendanceStatsData {
    present: number;
    late: number;
    absent: number;
    onLeave: number;
    earlyDeparture: number;
    attendanceRate: number;
    onMission: number;
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EARLY_DEPARTURE = 'EARLY_DEPARTURE',
  ON_LEAVE = 'ON_LEAVE',
  ON_MISSION = 'ON_MISSION',
}

export interface AttendanceRecord {
  employee: Employee;
  checkIn: string | null;
  checkOut: string | null;
  status: AttendanceStatus;
  hours: string;
  shift?: { id: string; name: string; };
}

export interface FeedItem {
    id: number;
    icon: string;
    iconColor: string;
    title: string;
    subtitle: string;
    time: string;
}

export interface WeeklyStat {
    day: string;
    percentage: number;
}

export enum LeaveType {
    VACATION = 'VACATION',
    SICK = 'SICK',
    PERSONAL = 'PERSONAL',
    CASUAL = 'CASUAL',
    PILGRIMAGE = 'PILGRIMAGE',
    UNPAID = 'UNPAID',
    EXAMINATION = 'EXAMINATION',
    MATERNITY = 'MATERNITY',
    NEWBORN = 'NEWBORN',
    SPECIAL_NEEDS = 'SPECIAL_NEEDS',
}

export enum LeaveStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export interface LeaveRequest {
    id: string;
    employee: Employee;
    leaveType: LeaveType;
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
    status: LeaveStatus;
}

export interface LeaveBalance {
    type: string;
    used: number;
    total: number;
    color: string;
}

export interface ActivityItem {
    id: number;
    icon: string;
    iconColor: string;
    title: {
      text: string;
      highlight?: string;
    };
    subtitle: string;
    time: string;
}

export interface Kpi {
    label: string;
    value: string;
    change: string;
    icon: string;
    progress: number;
    color: 'green' | 'red' | 'blue' | 'purple';
}

export interface Performer {
    employee: Employee;
    score: number;
    trend: number;
}

export enum Trend {
    UP,
    DOWN,
    NEUTRAL
}

export interface Report {
    id: string;
    name: string;
    icon: string;
    iconColor: string;
    generated: string;
    size: string;
}

// FIX: Added missing PredictiveInsight type definition.
export interface PredictiveInsight {
    title: string;
    badge: string;
    badgeColor: 'red' | 'blue' | 'green';
    value: string;
    description: string;
    icon: string;
    details: string;
    gradient: string;
}

// AI Analyst Types
export type AiResultType = 'kpi' | 'table' | 'text';

export interface AiKpiData {
    title: string;
    value: string;
}

export type AiTableData = Record<string, any>[];

export interface AiAnalysisResult {
    summary: string;
    resultType: AiResultType;
    data: AiKpiData | AiTableData | string;
}


// Employee Portal Types
export interface PortalNavItem {
    id: string;
    nameKey: string;
    icon: string;
    badgeCount?: number;
    badgeKey?: string;
    badgeColor?: string;
}

export interface UpcomingEvent {
    title: string;
    time: string;
    icon: string;
    color: 'blue' | 'green' | 'purple';
}

export interface PortalActivity {
    text: string;
    time: string;
    icon: string;
    color: 'green' | 'blue' | 'purple';
}

export interface Announcement {
    title: string;
    content: string;
    author: string;
    time: string;
    color: 'blue' | 'green';
}

export interface TimeOffRequestPortal {
    type: string;
    icon: string;
    iconColor: string;
    dates: string;
    days: number;
    status: LeaveStatus;
}

export interface LearningCourse {
    title: string;
    category: string;
    duration: string;
    rating: number;
    categoryColor: 'blue' | 'green' | 'purple';
}

export interface Skill {
    name: string;
    progress: number;
}

export interface Achievement {
    title: string;
    description: string;
    icon: string;
    color: 'yellow' | 'blue' | 'green';
}

export interface EmployeeLeaveBalance {
    annual: { used: number; total: number; };
    sick: { used: number; total: number; };
    personal: { used: number; total: number; };
    totalUsed: number;
}

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  articleLink?: string;
}

// Performance Module Types
export enum PerformanceStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

export interface ReviewMetric {
    name: string;
    score?: number; // out of 5, optional for new reviews
    managerComments: string;
}

export interface KeyResult {
    description: string;
    isCompleted: boolean;
}

export interface PerformanceReview {
    id: string;
    employee: Employee;
    reviewDate: string;
    overallScore: number;
    status: PerformanceStatus;
    reviewType: string;
    metrics: ReviewMetric[];
    employeeComments: string;
}

export interface CompanyGoal {
    id: string;
    title: string;
    progress: number; // percentage 0-100
    department: string | 'All'; // Can be company-wide or department-specific
    employeeId?: string; // Can be specific to an employee
    keyResults: KeyResult[];
}

export enum DevelopmentGoalStatus {
    NOT_STARTED = 'NOT_STARTED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

export interface DevelopmentGoal {
    id: string;
    description: string;
    targetDate: string;
    status: DevelopmentGoalStatus;
    resources?: { title: string; type: 'course' | 'article' | 'mentor'; link?: string; }[];
}


export interface IndividualDevelopmentPlan {
    id: string;
    employeeId: string;
    reviewId: string;
    strengths: string[];
    areasForImprovement: string[];
    goals: DevelopmentGoal[];
}


// Recruitment Module Types
export enum JobStatus {
    ACTIVE = 'ACTIVE',
    CLOSED = 'CLOSED',
    ON_HOLD = 'ON_HOLD',
}

export interface JobPosting {
    id: string;
    title: string;
    department: string;
    status: JobStatus;
    applicantsCount: number;
    postedDate: string;
}

export enum HiringStage {
    APPLIED = 'APPLIED',
    SCREENING = 'SCREENING',
    INTERVIEW = 'INTERVIEW',
    OFFER = 'OFFER',
    HIRED = 'HIRED',
}

export interface CandidateActivity {
    id: string;
    activity: string;
    date: string;
    notes?: string;
    user: string;
}

export interface Candidate {
    id: string;
    name: string;
    avatar?: string;
    avatarInitials: string;
    avatarColor: string;
    positionApplied: string;
    stage: HiringStage;
    appliedDate: string;
    email: string;
    phone: string;
    resumeUrl: string;
    skills: string[];
    aiSummary: string;
    activities: CandidateActivity[];
}

// Onboarding & Offboarding Types
export enum OnboardingTaskStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
}

export interface ProcessTask {
    id: string;
    title: string;
    status: OnboardingTaskStatus;
    dueDate: string;
    assignee: string; // e.g., 'HR', 'IT', 'Manager'
    notes?: { text: string; author: string; date: string; }[];
    type?: 'ASSIGN_ASSETS' | 'RETRIEVE_ASSETS';
}

export enum ProcessStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    OVERDUE = 'OVERDUE',
}

export enum ProcessType {
    ONBOARDING = 'ONBOARDING',
    OFFBOARDING = 'OFFBOARDING',
}

export interface OnboardingProcess {
    id: string;
    employee: Employee;
    type: ProcessType;
    date: string; // Start date for onboarding, End date for offboarding
    manager: string;
    status: ProcessStatus;
    progress: number; // percentage 0-100
    tasks: ProcessTask[];
}

// Document Management Types
export enum DocumentType {
    PASSPORT = 'PASSPORT',
    NATIONAL_ID = 'NATIONAL_ID',
    CONTRACT = 'CONTRACT',
    VISA = 'VISA',
    DRIVING_LICENSE = 'DRIVING_LICENSE',
    CONTRACT_2025 = 'CONTRACT_2025',
    OTHER = 'OTHER',
}

export enum DocumentStatus {
    VALID = 'VALID',
    EXPIRING_SOON = 'EXPIRING_SOON',
    EXPIRED = 'EXPIRED',
    MISSING = 'MISSING',
}

export interface EmployeeDocument {
    id: string;
    employee: Employee;
    documentType: DocumentType;
    documentNumber: string;
    issueDate: string;
    expiryDate: string | null; // Some documents might not expire
    status: DocumentStatus;
    fileUrl: string; // A link to the document
}

// Payroll Types
export enum PayrollStatus {
    DRAFT = 'DRAFT',
    PROCESSED = 'PROCESSED',
    PAID = 'PAID',
}

export interface PayrollRun {
    id: string;
    period: string;
    payDate: string;
    status: PayrollStatus;
    totalCost: number;
    netPay: number;
    deductions: number;
    employeesCount: number;
}

export interface PayslipItem {
    name: string;
    amount: number;
}

export interface Payslip {
    employee: Employee;
    run: PayrollRun;
    earnings: PayslipItem[];
    deductions: PayslipItem[];
    grossPay: number;
    netPay: number;
    totalDeductions: number;
}

export enum CompRequestStatus {
    PENDING_APPROVAL = 'PENDING_APPROVAL',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export interface CompensationChangeRequest {
    id: string;
    employee: Employee;
    requestDate: string;
    effectiveDate: string;
    requestedBy: string; // Manager's name
    status: CompRequestStatus;
    salaryIncreasePercentage?: number;
    oneTimeBonus?: number;
    justification: string;
    reviewId: string; // Link back to the performance review
}


// Asset Management Types
export enum AssetStatus {
    IN_USE = 'IN_USE',
    AVAILABLE = 'AVAILABLE',
    IN_REPAIR = 'IN_REPAIR',
    RETIRED = 'RETIRED',
}

export enum AssetCategory {
    LAPTOP = 'LAPTOP',
    PHONE = 'PHONE',
    VEHICLE = 'VEHICLE',
    FURNITURE = 'FURNITURE',
    OTHER = 'OTHER',
}

export interface CompanyAsset {
    id: string;
    name: string;
    category: AssetCategory;
    serialNumber: string;
    purchaseDate: string;
    status: AssetStatus;
    assignedTo?: Employee;
    assignmentDate?: string;
}

// Job Titles Module Types
export interface JobTitle {
  id: string;
  name: string;
  description: string;
  department: string;
  parentJobTitleId: string | null;
  employeeCount: number;
}

// Learning & Development Types
export enum CourseCategory {
    TECHNICAL = 'TECHNICAL',
    LEADERSHIP = 'LEADERSHIP',
    SOFT_SKILLS = 'SOFT_SKILLS',
    COMPLIANCE = 'COMPLIANCE',
}

export interface Course {
    id: string;
    title: string;
    category: CourseCategory;
    description: string;
    durationHours: number;
    provider: string;
    enrollmentCount: number;
}

export enum EnrollmentStatus {
    ENROLLED = 'ENROLLED',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}

export interface EmployeeEnrollment {
    id: string;
    employee: Employee;
    course: Course;
    enrollmentDate: string;
    status: EnrollmentStatus;
    progress: number; // percentage 0-100
    completionDate?: string;
}

export interface ExternalCourseRecord {
    id: string;
    employeeId: string;
    courseName: string;
    provider: string; // Training Center
    completionDate: string;
    score?: string; // Result
    certificateUrl: string; // Link to uploaded certificate
}

// Help Center Types
export interface HelpCenterCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
    articleCount: number;
}

export interface HelpCenterArticle {
    id: string;
    title: string;
    categoryId: string;
    content: string;
    author: string;
    lastUpdated: string;
    views: number;
    isPopular: boolean;
}

// Support Tickets Types
export enum TicketStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    CLOSED = 'CLOSED',
}

export enum TicketPriority {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW',
}

export enum TicketDepartment {
    IT = 'IT',
    HR = 'HR',
    FACILITIES = 'FACILITIES',
    FINANCE = 'FINANCE',
    GENERAL = 'GENERAL',
}

export interface SupportTicket {
    id: string;
    employee: Employee;
    subject: string;
    department: TicketDepartment;
    priority: TicketPriority;
    status: TicketStatus;
    createdDate: string;
    lastUpdated: string;
    aiSuggestion?: {
        department: TicketDepartment;
        priority: TicketPriority;
    };
}

// Settings Module Types
export enum LeaveCategory {
    STANDARD = 'STANDARD',
    CASUAL = 'CASUAL',
    SPECIAL = 'SPECIAL',
}

export interface LeaveTypeSetting {
    id: string;
    name: LeaveType;
    balanceDays: number;
    color: string;
    category: LeaveCategory;
    isDeductedFromAnnual: boolean;
    eligibilityYears?: number;
    maxTimesInService?: number;
    usableAfterMonths?: number;
    maxDaysPerRequest?: number;
}

export interface PublicHoliday {
    id: string;
    name: string;
    date: string;
}

export enum SalaryComponentType {
    EARNING = 'EARNING',
    DEDUCTION = 'DEDUCTION',
}

export interface SalaryComponent {
    id: string;
    name: string;
    type: SalaryComponentType;
    isTaxable: boolean;
}

export interface LateDeductionRule {
  id: number;
  fromMinutes: number;
  toMinutes: number;
  deductMinutes: number;
}

export interface AttendanceSettings {
  workStartTime?: string;
  workEndTime?: string;
  lateGracePeriodMinutes?: number;
  lateDeductionPolicyEnabled?: boolean;
  lateDeductionRules?: LateDeductionRule[];
  overtimeEnabled?: boolean;
  overtimeMinimumMinutes?: number;
  overtimeRateWeekday?: number;
  overtimeRateWeekend?: number;
  overtimeRateHoliday?: number;
  weekendDays?: ('Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[];
  allowedIpAddresses?: string[];
}

// Employee Profile Types
export interface EmployeeActivity {
    id: string;
    icon: string;
    color: 'blue' | 'green' | 'red' | 'purple' | 'orange';
    title: string;
    description: string;
    timestamp: string;
}

export interface EmployeeProfileKpis {
    attendanceRate: number;
    performanceScore: number;
    goalsCompleted: number;
    goalsTotal: number;
    leaveTaken: number;
    leaveTotal: number;
}

export interface EmployeeProfileOverviewData {
    kpis: EmployeeProfileKpis;
    goals: CompanyGoal[];
    leaveBalance: {
        annual: { used: number; total: number; };
        sick: { used: number; total: number; };
    };
}


// Portal - Benefits
export interface Benefit {
    id: string;
    category: 'Health' | 'Financial' | 'Wellness';
    title: string;
    icon: string;
    details: { label: string; value: string }[];
    action: { label: string; link: string; };
}

// Portal - Feedback
export interface Feedback {
    id: string;
    type: 'received' | 'given';
    from: string; // Can be 'Anonymous'
    to?: string; // for 'given' feedback
    content: string;
    date: string;
    category: 'Praise' | 'Constructive';
}

// Notifications
export interface Notification {
    id: string;
    type: 'leave' | 'document' | 'recruitment' | 'system';
    title: string;
    description: string;
    time: string;
    read: boolean;
    link?: string;
}

// Succession Planning
export enum SuccessorReadiness {
    READY_NOW = 'READY_NOW',
    READY_1_2_YEARS = 'READY_1_2_YEARS',
    FUTURE_POTENTIAL = 'FUTURE_POTENTIAL',
}

export interface Successor {
    employee: Employee;
    readiness: SuccessorReadiness;
    performance: 'High' | 'Medium' | 'Low';
    potential: 'High' | 'Medium' | 'Low';
}

export interface SuccessionPlan {
    jobTitle: JobTitle;
    incumbent: Employee;
    successors: Successor[];
}

// Employee Surveys
export enum SurveyStatus {
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
    CLOSED = 'CLOSED',
}

export enum SurveyQuestionType {
    SCALE = 'SCALE', // e.g., 1-5
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
    OPEN_TEXT = 'OPEN_TEXT',
}

export interface SurveyQuestion {
    id: string;
    text: string;
    type: SurveyQuestionType;
    options?: string[]; // For MULTIPLE_CHOICE
}

export interface Survey {
    id: string;
    title: string;
    description: string;
    status: SurveyStatus;
    creationDate: string;
    endDate?: string;
    questions: SurveyQuestion[];
    participantCount: number;
    completionRate: number;
}

export interface SurveyResponse {
    questionId: string;
    answer: string | number;
}

export type Sentiment = 'Positive' | 'Negative' | 'Neutral';

export interface SurveyAnalytics {
    participationRate: number;
    engagementScore: number; // Average for scale questions
    questionResults: {
        questionId: string;
        questionText: string;
        type: SurveyQuestionType;
        // For SCALE: { '1': count, '2': count, ... }
        // For MULTIPLE_CHOICE: { 'Option A': count, 'Option B': count, ... }
        results: Record<string, number>; 
    }[];
    openTextAnalysis: {
        theme: string;
        sentiment: Sentiment;
        count: number;
        quotes: string[];
    }[];
}

// Recognition & Milestones
export enum CompanyValue {
    TEAMWORK = 'TEAMWORK',
    INNOVATION = 'INNOVATION',
    CUSTOMER_FOCUS = 'CUSTOMER_FOCUS',
    INTEGRITY = 'INTEGRITY',
    EXCELLENCE = 'EXCELLENCE',
}

export interface Kudo {
    id: string;
    sender: Employee;
    receiver: Employee;
    message: string;
    values: CompanyValue[];
    timestamp: string;
    reactions: {
        count: number;
        // In a real app, you'd store who reacted
    };
}

export interface Milestone {
    id: string;
    employee: Employee;
    type: 'BIRTHDAY' | 'ANNIVERSARY';
    date: string; // e.g., "July 25" for birthday, "July 25, 2024" for anniversary
    years?: number; // for anniversaries
}

// Module Management
export type OptionalModuleKey = 
  | 'payroll' 
  | 'documents' 
  | 'recruitment' 
  | 'performance' 
  | 'learning' 
  | 'onboarding' 
  | 'assets' 
  | 'support' 
  | 'help_center' 
  | 'recognition' 
  | 'surveys'
  | 'missions';

export type ActiveModules = Record<OptionalModuleKey, boolean>;

export interface ModuleContextType {
    activeModules: ActiveModules;
    toggleModule: (moduleKey: OptionalModuleKey) => void;
    dependencyConfirmation: {
        isOpen: boolean;
        moduleToDisable: OptionalModuleKey | null;
        dependentsToDisable: OptionalModuleKey[];
    };
    confirmDisable: () => void;
    cancelDisable: () => void;
}

// Mission Management Types
export enum MissionStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
}

export interface Mission {
    id: string;
    employee: Employee;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    status: MissionStatus;
    requestedBy: 'employee' | 'manager';
    isMultiDay: boolean;
    startTime?: string | null;
    endTime?: string | null;
}

export interface MissionSettings {
    isTimeMandatoryForSingleDay: boolean;
}
