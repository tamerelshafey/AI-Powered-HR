import { supabase } from './supabaseClient';
// FIX: Added missing LeaveType import.
import { Employee, JobPosting, Candidate, OnboardingProcess, EmployeeDocument, PayrollRun, CompanyAsset, JobTitle, Course, EmployeeEnrollment, HelpCenterCategory, HelpCenterArticle, SupportTicket, EmployeeActivity, AssetStatus, PerformanceReview, CompanyGoal, LeaveRequest, LeaveType, Payslip, CourseCategory, EmployeeLeaveBalance, ExternalCourseRecord, CompRequestStatus, CompensationChangeRequest, IndividualDevelopmentPlan, DevelopmentGoalStatus, ChatMessage, Department, Branch, DocumentStatus, PerformanceStatus, TicketStatus, TicketDepartment, User, AttendanceRecord, FeedItem, AttendanceStatus, AttendanceStatsData, PayrollStatus, LeaveStatus, Notification, EmployeeProfileOverviewData, Survey, SurveyAnalytics, SurveyStatus, SurveyQuestionType, Sentiment, Kudo, Milestone, CompanyValue, WeeklyStat, LeaveBalance, ActivityItem, Kpi, Performer, Report, PredictiveInsight, PortalNavItem, UpcomingEvent, PortalActivity, Announcement, LearningCourse, Skill, Achievement, Benefit, Feedback, LeaveTypeSetting, PublicHoliday, SalaryComponent, AttendanceSettings, EmployeeStatus, OnlineStatus, UserRole } from '../types';
import { employees as mockEmployees, employeeActivities as mockEmployeeActivities } from '../pages/employees/data';
import { jobPostings as mockJobPostings, candidates as mockCandidates } from '../pages/recruitment/data';
import { onboardingProcesses as mockOnboardingProcesses } from '../pages/onboarding_offboarding/data';
import { employeeDocuments as mockEmployeeDocuments } from '../pages/documents/data';
import { payrollRuns as mockPayrollRuns, employeePayslipsData, costBreakdownData } from '../pages/payroll/data';
import { companyAssets as mockCompanyAssets } from '../pages/assets/data';
import { jobTitles as mockJobTitles } from '../pages/job_titles/data';
import { courses as mockCourses, enrollments as mockEnrollments } from '../pages/learning/data';
import { helpCenterCategories as mockHelpCenterCategories, helpCenterArticles as mockHelpCenterArticles } from '../pages/help_center/data';
import { supportTickets as mockSupportTickets } from '../pages/support_tickets/data';
import { allReviews as mockPerformanceReviews, allGoals as mockAllGoals } from '../pages/performance/data';
import { allLeaveRequests as mockAllLeaveRequests } from '../pages/leaves/data';
import { departments as mockDepartments } from '../pages/departments/data';
import { branches as mockBranches } from '../pages/branches/data';
import { users } from '../users';
import { leaveTypeSettingsData, publicHolidaysData, salaryComponentsData, defaultAttendanceSettings, branchAttendanceSettings } from '../pages/settings/data';
// import { compensationChangeRequests as mockCompensationChangeRequests } from './api'; // Self-import removed
import { kpis as mockKpis, topPerformers as mockTopPerformers, recentReportsData as mockRecentReportsData, predictiveInsightsData as mockPredictiveInsightsData } from '../pages/reports/data';
import { upcomingEvents as mockUpcomingEvents, portalActivities as mockPortalActivities, announcements as mockAnnouncements, learningCourses as mockLearningCourses, skills as mockSkills, achievements as mockAchievements, benefitsData as mockBenefitsData, feedbackData as mockFeedbackData } from '../pages/portal/data';
// import { weeklyStats as mockWeeklyStats, userLeaveBalances as mockUserLeaveBalances, recentActivity as mockRecentActivity } from './api'; // Self-import removed


// Helper mapping for demo purposes until user and employee IDs are unified.
const userIdToEmployeeIdMap: Record<string, string> = {
    'usr_admin': 'EMP001',
    'usr_board_member': 'EMP001',
    'usr_hr_manager': 'EMP004',
    'usr_dept_manager': 'EMP002',
    'usr_branch_manager': 'EMP004',
    'usr_hr_employee': 'EMP012',
    'usr_recruitment_officer': 'EMP018',
    'usr_employee': 'EMP005',
    'usr_trainee': 'EMP005',
    'usr_joker': 'EMP006',
};

export const getEmployeeIdForUser = (user: User): string => {
    return userIdToEmployeeIdMap[user.id] || user.id;
};


export interface PaginatedResponse<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
}

export interface PaginatedEmployeesResponse {
    data: Employee[];
    total: number;
    hasMore: boolean;
}

// --- Mappers: Supabase (snake_case) to Application (camelCase) ---

const fromSupabaseEmployee = (dbEmployee: any): Employee => ({
    id: dbEmployee.id,
    firstName: dbEmployee.first_name,
    lastName: dbEmployee.last_name,
    avatar: dbEmployee.avatar,
    avatarInitials: dbEmployee.avatar_initials,
    avatarColor: dbEmployee.avatar_color,
    jobTitle: dbEmployee.job_title,
    department: dbEmployee.department,
    status: dbEmployee.status as EmployeeStatus,
    onlineStatus: dbEmployee.online_status as OnlineStatus,
    role: dbEmployee.role as UserRole,
    shiftId: dbEmployee.shift_id,
});

const toSupabaseEmployee = (appEmployee: Partial<Employee>) => ({
    first_name: appEmployee.firstName,
    last_name: appEmployee.lastName,
    avatar: appEmployee.avatar,
    avatar_initials: appEmployee.avatarInitials,
    avatar_color: appEmployee.avatarColor,
    job_title: appEmployee.jobTitle,
    department: appEmployee.department,
    status: appEmployee.status,
    online_status: appEmployee.onlineStatus,
    role: appEmployee.role,
    shift_id: appEmployee.shiftId,
});

const fromSupabaseDepartment = (dbDepartment: any): Department => ({
    id: dbDepartment.id,
    name: dbDepartment.name,
    manager: dbDepartment.manager ? fromSupabaseEmployee(dbDepartment.manager) : mockEmployees[0],
    employeeCount: dbDepartment.employee_count,
    parentDepartmentId: dbDepartment.parent_department_id,
    icon: dbDepartment.icon,
    color: dbDepartment.color,
});

const fromSupabaseLeaveRequest = (dbRequest: any): LeaveRequest => ({
    id: dbRequest.id,
    employee: dbRequest.employee ? fromSupabaseEmployee(dbRequest.employee) : mockEmployees[0],
    leaveType: dbRequest.leave_type as LeaveType,
    startDate: dbRequest.start_date,
    endDate: dbRequest.end_date,
    days: dbRequest.days,
    reason: dbRequest.reason,
    status: dbRequest.status as LeaveStatus,
});


// --- Employee API (Now using Supabase with Mock Fallback) ---

export const getAllEmployees = async (): Promise<Employee[]> => {
    const { data, error } = await supabase.from('employees').select('*');
    if (error) {
        console.warn("Supabase connection failed for getAllEmployees. Falling back to mock data.", error.message);
        return [...mockEmployees];
    }
    return data.map(fromSupabaseEmployee);
};


export const getEmployees = async (page: number = 1, limit: number = 12): Promise<PaginatedEmployeesResponse> => {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error, count } = await supabase
        .from('employees')
        .select('*', { count: 'exact' })
        .range(start, end);

    if (error) {
        console.warn(`Supabase connection failed for getEmployees (Page: ${page}). Falling back to mock data.`, error.message);
        const paginatedMockData = mockEmployees.slice(start, end + 1);
        return {
            data: paginatedMockData,
            total: mockEmployees.length,
            hasMore: end < mockEmployees.length - 1,
        };
    }
    const total = count || 0;
    return {
        data: data.map(fromSupabaseEmployee),
        total,
        hasMore: end < total - 1,
    };
};

export const addEmployee = async (employeeData: Omit<Employee, 'id'>): Promise<Employee> => {
    const newEmployeeRecord = {
        ...toSupabaseEmployee(employeeData),
    };

    const { data, error } = await supabase
        .from('employees')
        .insert(newEmployeeRecord)
        .select()
        .single();
    
    if (error) {
        console.warn("Supabase connection failed for addEmployee. Adding to in-memory mock data.", error.message);
        const newEmployee: Employee = {
            id: `EMP${Date.now().toString().slice(-6)}`,
            ...employeeData,
        };
        mockEmployees.unshift(newEmployee);
        return newEmployee;
    }
    return fromSupabaseEmployee(data);
};


export const getEmployeeById = async (id: string): Promise<Employee | undefined> => {
    const { data, error } = await supabase.from('employees').select('*').eq('id', id).single();
    if (error) {
        console.warn(`Supabase query failed for getEmployeeById (ID: ${id}). Falling back to mock data.`, error.message);
        return mockEmployees.find(emp => emp.id === id);
    }
    return data ? fromSupabaseEmployee(data) : undefined;
};


// --- Departments API ---
export const getDepartments = async (): Promise<Department[]> => {
    const { data, error } = await supabase.from('departments').select('*, manager:manager_id(*)');
    if (error) {
        console.warn("Supabase failed for getDepartments. Falling back to mock data.", error.message);
        return [...mockDepartments];
    }
    return data.map(fromSupabaseDepartment);
};

// --- Branches API ---
export const getBranches = async (): Promise<Branch[]> => {
    const { data, error } = await supabase.from('branches').select('*, manager:manager_id(*)');
     if (error) {
        console.warn("Supabase failed for getBranches. Falling back to mock data.", error.message);
        return [...mockBranches];
    }
    // Basic mapper, assuming manager is expanded
    return data.map(b => ({
        id: b.id,
        name: b.name,
        location: b.location,
        manager: b.manager ? fromSupabaseEmployee(b.manager) : mockEmployees[0],
        employeeCount: b.employee_count,
    }));
};

// --- Job Titles API ---
export const getJobTitles = async (): Promise<JobTitle[]> => {
    const { data, error } = await supabase.from('job_titles').select('*');
    if (error) {
        console.warn("Supabase failed for getJobTitles. Falling back to mock data.", error.message);
        return [...mockJobTitles];
    }
    return data.map(jt => ({
        id: jt.id,
        name: jt.name,
        description: jt.description,
        department: jt.department,
        parentJobTitleId: jt.parent_job_title_id,
        employeeCount: jt.employee_count
    }));
};

// --- Leave Requests API ---
export const getAllLeaveRequests = async (): Promise<LeaveRequest[]> => {
    const { data, error } = await supabase.from('leave_requests').select('*, employee:employee_id(*)');
    if (error) {
        console.warn("Supabase failed for getAllLeaveRequests. Falling back to mock data.", error.message);
        return [...mockAllLeaveRequests];
    }
    return data.map(fromSupabaseLeaveRequest);
};

export const updateLeaveRequestStatus = async (requestId: string, status: LeaveStatus): Promise<LeaveRequest> => {
    const { data, error } = await supabase
        .from('leave_requests')
        .update({ status: status })
        .eq('id', requestId)
        .select('*, employee:employee_id(*)')
        .single();

    if (error) {
        console.warn(`Supabase failed to update leave request ${requestId}. Falling back to mock data.`, error.message);
        const requestIndex = mockAllLeaveRequests.findIndex(r => r.id === requestId);
        if (requestIndex === -1) throw new Error('Request not found in mock data');
        mockAllLeaveRequests[requestIndex].status = status;
        return mockAllLeaveRequests[requestIndex];
    }
    return fromSupabaseLeaveRequest(data);
};

// --- Mocked Functions (Aggregations, AI, Demo-specific) ---
// These functions will remain mocked for now as they represent complex queries or demo-specific logic.

export const getEmployeeActivities = async (employeeId: string): Promise<EmployeeActivity[]> => {
    return mockEmployeeActivities;
};

export const getEmployeeProfileOverviewData = async (employeeId: string): Promise<EmployeeProfileOverviewData> => {
    const employeeGoals = mockAllGoals.filter(g => g.employeeId === employeeId || g.department === 'All');
    const goalsCompleted = employeeGoals.filter(g => g.progress === 100).length;
    const lastReview = mockPerformanceReviews
        .filter(r => r.employee.id === employeeId && r.status === PerformanceStatus.COMPLETED)
        .sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime())[0];
    const leaveBalance = await getLeaveBalanceForEmployee(employeeId);
    return {
        kpis: {
            attendanceRate: 97.5,
            performanceScore: lastReview ? lastReview.overallScore : 4.2,
            goalsCompleted: goalsCompleted,
            goalsTotal: employeeGoals.length,
            leaveTaken: leaveBalance.totalUsed,
            leaveTotal: leaveBalance.annual.total,
        },
        goals: employeeGoals.slice(0, 3),
        leaveBalance: { annual: leaveBalance.annual, sick: leaveBalance.sick }
    };
};

export const getJobPostings = async (): Promise<JobPosting[]> => mockJobPostings;
export const getCandidates = async (): Promise<Candidate[]> => mockCandidates;
export const getOnboardingProcesses = async (): Promise<OnboardingProcess[]> => mockOnboardingProcesses;
export const getEmployeeDocuments = async (employeeId?: string): Promise<EmployeeDocument[]> => employeeId ? mockEmployeeDocuments.filter(doc => doc.employee.id === employeeId) : mockEmployeeDocuments;
export const getDocumentsStats = async (): Promise<{ total: number; expiringSoon: number; expired: number; missing: number; }> => ({ total: mockEmployeeDocuments.length, expiringSoon: mockEmployeeDocuments.filter(d => d.status === DocumentStatus.EXPIRING_SOON).length, expired: mockEmployeeDocuments.filter(d => d.status === DocumentStatus.EXPIRED).length, missing: mockEmployeeDocuments.filter(d => d.status === DocumentStatus.MISSING).length });
export const getEmployeeDocumentsPaginated = async (page: number, limit: number, filters: any): Promise<PaginatedResponse<EmployeeDocument>> => {
    const filteredData = mockEmployeeDocuments.filter(doc => {
        const employeeName = `${doc.employee.firstName} ${doc.employee.lastName}`.toLowerCase();
        const matchesSearch = filters.searchTerm === '' || employeeName.includes(filters.searchTerm.toLowerCase());
        const matchesType = filters.filterType === 'All' || doc.documentType === filters.filterType;
        const matchesStatus = filters.filterStatus === 'All' || doc.status === filters.filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const start = (page - 1) * limit;
    return { data: filteredData.slice(start, start + limit), totalItems, totalPages, currentPage: page, hasMore: start + limit < totalItems };
};
export const getPayrollRuns = async (): Promise<PayrollRun[]> => mockPayrollRuns;
export const getPayrollRunsPaginated = async (page: number, limit: number): Promise<PaginatedResponse<PayrollRun>> => {
    const totalItems = mockPayrollRuns.length;
    const totalPages = Math.ceil(totalItems / limit);
    const start = (page - 1) * limit;
    return { data: mockPayrollRuns.slice(start, start + limit), totalItems, totalPages, currentPage: page, hasMore: start + limit < totalItems };
};
export const getLatestPayrollRun = async (): Promise<PayrollRun | null> => mockPayrollRuns.find(run => run.status !== PayrollStatus.DRAFT) || mockPayrollRuns[0] || null;

export const updatePayrollRunStatus = async (runId: string, status: PayrollStatus): Promise<PayrollRun> => {
    const runIndex = mockPayrollRuns.findIndex(r => r.id === runId);
    if (runIndex === -1) throw new Error("Payroll run not found");
    mockPayrollRuns[runIndex].status = status;
    return mockPayrollRuns[runIndex];
};

export const getEmployeePayslips = async (runId: string): Promise<Payslip[]> => employeePayslipsData[runId] || [];
const allPayslipsFlat: Payslip[] = Object.values(employeePayslipsData).flat();
export const getPayslipsByEmployeeId = async (employeeId: string): Promise<Payslip[]> => allPayslipsFlat.filter(p => p.employee.id === employeeId);
export const getLatestPayslipByEmployeeId = async (employeeId: string): Promise<Payslip | null> => {
    const payslips = allPayslipsFlat.filter(p => p.employee.id === employeeId);
    if (payslips.length === 0) return null;
    return payslips.sort((a, b) => new Date(b.run.payDate).getTime() - new Date(a.run.payDate).getTime())[0];
};
export const getPayslipsByEmployeeIdPaginated = async (employeeId: string, page: number, limit: number): Promise<PaginatedResponse<Payslip>> => {
    const employeePayslips = allPayslipsFlat.filter(p => p.employee.id === employeeId).sort((a, b) => new Date(b.run.payDate).getTime() - new Date(a.run.payDate).getTime());
    const totalItems = employeePayslips.length;
    const totalPages = Math.ceil(totalItems / limit);
    const start = (page - 1) * limit;
    return { data: employeePayslips.slice(start, start + limit), totalItems, totalPages, currentPage: page, hasMore: start + limit < totalItems };
};

export const getCompanyAssets = async (employeeId?: string): Promise<CompanyAsset[]> => employeeId ? mockCompanyAssets.filter(asset => asset.assignedTo?.id === employeeId) : mockCompanyAssets;
export const getAssetsStats = async (): Promise<{ total: number; assigned: number; available: number; inRepair: number; }> => ({ total: mockCompanyAssets.length, assigned: mockCompanyAssets.filter(a => a.status === AssetStatus.IN_USE).length, available: mockCompanyAssets.filter(a => a.status === AssetStatus.AVAILABLE).length, inRepair: mockCompanyAssets.filter(a => a.status === AssetStatus.IN_REPAIR).length });
export const getCompanyAssetsPaginated = async (page: number, limit: number, filters: any): Promise<PaginatedResponse<CompanyAsset>> => {
    const filteredData = mockCompanyAssets.filter(asset => {
        const assigneeName = asset.assignedTo ? `${asset.assignedTo.firstName} ${asset.assignedTo.lastName}`.toLowerCase() : '';
        const assetName = asset.name.toLowerCase();
        const matchesSearch = filters.searchTerm === '' || assetName.includes(filters.searchTerm.toLowerCase()) || assigneeName.includes(filters.searchTerm.toLowerCase());
        const matchesCategory = filters.filterCategory === 'All' || asset.category === filters.filterCategory;
        const matchesStatus = filters.filterStatus === 'All' || asset.status === filters.filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const start = (page - 1) * limit;
    return { data: filteredData.slice(start, start + limit), totalItems, totalPages, currentPage: page, hasMore: start + limit < totalItems };
};
export const getAvailableAssets = async (): Promise<CompanyAsset[]> => mockCompanyAssets.filter(asset => asset.status === AssetStatus.AVAILABLE);

export const getCourses = async (): Promise<Course[]> => mockCourses;
export const getEmployeeEnrollments = async (): Promise<EmployeeEnrollment[]> => mockEnrollments;
export const getEmployeeEnrollmentsByEmployeeId = async (employeeId: string): Promise<EmployeeEnrollment[]> => mockEnrollments.filter(enr => enr.employee.id === employeeId);
export const getHelpCenterCategories = async (): Promise<HelpCenterCategory[]> => mockHelpCenterCategories;
export const getHelpCenterArticles = async (): Promise<HelpCenterArticle[]> => mockHelpCenterArticles;
export const getSupportTickets = async (): Promise<SupportTicket[]> => mockSupportTickets;
export const getSupportTicketsPaginated = async (page: number, limit: number, filters: any): Promise<PaginatedResponse<SupportTicket>> => {
    const filteredData = mockSupportTickets.filter(ticket => {
        const employeeName = `${ticket.employee.firstName} ${ticket.employee.lastName}`.toLowerCase();
        const subject = ticket.subject.toLowerCase();
        const matchesSearch = filters.searchTerm === '' || employeeName.includes(filters.searchTerm.toLowerCase()) || subject.includes(filters.searchTerm.toLowerCase());
        const matchesStatus = filters.filterStatus === 'All' || ticket.status === filters.filterStatus;
        const matchesDepartment = filters.filterDepartment === 'All' || ticket.department === filters.filterDepartment;
        return matchesSearch && matchesStatus && matchesDepartment;
    });
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const start = (page - 1) * limit;
    return { data: filteredData.slice(start, start + limit), totalItems, totalPages, currentPage: page, hasMore: start + limit < totalItems };
};
export const getPerformanceReviewsByEmployeeId = async (employeeId: string): Promise<PerformanceReview[]> => mockPerformanceReviews.filter(review => review.employee.id === employeeId);
export const getPerformanceReviewsPaginated = async (page: number, limit: number, filters: any): Promise<PaginatedResponse<PerformanceReview>> => {
    let filteredData = mockPerformanceReviews;
    if (filters.status !== 'All') filteredData = filteredData.filter(review => review.status === filters.status);
    if (filters.type !== 'All') filteredData = filteredData.filter(review => review.reviewType === filters.type);
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const start = (page - 1) * limit;
    return { data: filteredData.slice(start, start + limit), totalItems, totalPages, currentPage: page, hasMore: start + limit < totalItems };
};
export const addPerformanceReview = async (reviewData: Omit<PerformanceReview, 'id'>): Promise<PerformanceReview> => {
    const newReview: PerformanceReview = { id: `REV${Date.now()}`, ...reviewData };
    mockPerformanceReviews.unshift(newReview);
    return newReview;
};
export const updatePerformanceReview = async (reviewId: string, updates: Partial<PerformanceReview>): Promise<PerformanceReview> => {
    const reviewIndex = mockPerformanceReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) throw new Error("Review not found");
    const updatedReview = { ...mockPerformanceReviews[reviewIndex], ...updates };
    mockPerformanceReviews[reviewIndex] = updatedReview;
    return updatedReview;
};
export const getGoalsByEmployeeId = async (employeeId: string): Promise<CompanyGoal[]> => mockAllGoals.filter(goal => goal.employeeId === employeeId || goal.department === 'All');
export const addGoal = async (goalData: Omit<CompanyGoal, 'id' | 'progress'>): Promise<CompanyGoal> => {
    const newGoal: CompanyGoal = { id: `GOAL${Date.now()}`, progress: 0, ...goalData };
    mockAllGoals.unshift(newGoal);
    return newGoal;
};
export const updateGoal = async (goalId: string, updates: Partial<CompanyGoal>): Promise<CompanyGoal> => {
    const goalIndex = mockAllGoals.findIndex(g => g.id === goalId);
    if (goalIndex === -1) throw new Error("Goal not found");
    const updatedGoal = { ...mockAllGoals[goalIndex], ...updates };
    mockAllGoals[goalIndex] = updatedGoal;
    return updatedGoal;
};
export const getLeaveRequestsByEmployeeId = async (employeeId: string): Promise<LeaveRequest[]> => mockAllLeaveRequests.filter(req => req.employee.id === employeeId);

const employeeLeaveBalances: Record<string, EmployeeLeaveBalance> = {
    'EMP001': { annual: { used: 6, total: 21 }, sick: { used: 0, total: 14 }, personal: { used: 1, total: 5 }, totalUsed: 7 },
    'EMP002': { annual: { used: 10, total: 25 }, sick: { used: 3, total: 14 }, personal: { used: 0, total: 7 }, totalUsed: 13 },
    'EMP005': { annual: { used: 8, total: 21 }, sick: { used: 2, total: 14 }, personal: { used: 1, total: 5 }, totalUsed: 11 },
};
export const getLeaveBalanceForEmployee = async (employeeId: string): Promise<EmployeeLeaveBalance> => employeeLeaveBalances[employeeId] || { annual: { used: 0, total: 21 }, sick: { used: 0, total: 14 }, personal: { used: 0, total: 5 }, totalUsed: 0 };
export const findCoursesBySkill = async (skillName: string): Promise<Course[]> => {
    const lowercasedSkill = skillName.toLowerCase();
    const skillToCategoryMap: Record<string, CourseCategory> = { 'التواصل': CourseCategory.SOFT_SKILLS, 'العمل الجماعي': CourseCategory.SOFT_SKILLS, 'القيادة': CourseCategory.LEADERSHIP, 'جودة الكود': CourseCategory.TECHNICAL, 'حل المشكلات': CourseCategory.TECHNICAL };
    const targetCategoryKey = Object.keys(skillToCategoryMap).find(key => lowercasedSkill.includes(key.toLowerCase()));
    const targetCategory = targetCategoryKey ? skillToCategoryMap[targetCategoryKey] : null;
    return mockCourses.filter(course => course.title.toLowerCase().includes(lowercasedSkill) || (targetCategory && course.category === targetCategory) || course.description.toLowerCase().includes(lowercasedSkill));
};
const mockExternalCourses: ExternalCourseRecord[] = [ { id: 'EXT001', employeeId: 'EMP005', courseName: 'Certified Scrum Master', provider: 'Scrum Alliance', completionDate: '2024-05-20', score: 'Pass', certificateUrl: '#' }, { id: 'EXT002', employeeId: 'EMP001', courseName: 'Advanced Cloud Architecture', provider: 'AWS Training Center', completionDate: '2024-03-15', score: '92%', certificateUrl: '#' } ];
export const getExternalCoursesByEmployeeId = async (employeeId: string): Promise<ExternalCourseRecord[]> => mockExternalCourses.filter(ec => ec.employeeId === employeeId);
export const compensationChangeRequests: CompensationChangeRequest[] = [
    { id: 'CCR001', employee: mockEmployees[2], requestDate: '2024-07-15', effectiveDate: '2024-08-01', requestedBy: 'Jason King', status: CompRequestStatus.PENDING_APPROVAL, salaryIncreasePercentage: 10, justification: 'Exceeded sales targets for two consecutive quarters.', reviewId: 'REV003' },
    { id: 'CCR002', employee: mockEmployees[0], requestDate: '2024-07-18', effectiveDate: '2024-08-01', requestedBy: 'Engineering Lead', status: CompRequestStatus.PENDING_APPROVAL, oneTimeBonus: 50000, justification: 'Exceptional work on the new feature launch, significantly reducing server costs.', reviewId: 'REV013' },
    { id: 'CCR003', employee: mockEmployees[1], requestDate: '2024-06-20', effectiveDate: '2024-07-01', requestedBy: 'Marketing Lead', status: CompRequestStatus.APPROVED, salaryIncreasePercentage: 8, oneTimeBonus: 20000, justification: 'Successful completion of leadership training and taking on new responsibilities.', reviewId: 'REV001' }
];

export const getCompensationRequestsByStatus = async (status: CompRequestStatus): Promise<CompensationChangeRequest[]> => compensationChangeRequests.filter(req => req.status === status);
export const getCompensationSuggestion = async (employeeId: string, performanceScore: number): Promise<{ salaryIncrease: number, bonus: number }> => {
    const baseIncrease = 2;
    const performanceMultiplier = Math.max(0, (performanceScore - 3.5)) * 2;
    const salaryIncrease = baseIncrease + performanceMultiplier + (Math.random() * 2);
    const bonus = performanceScore > 4.2 ? Math.round(performanceScore * 5000) : 0;
    return { salaryIncrease: parseFloat(salaryIncrease.toFixed(1)), bonus: Math.round(bonus / 1000) * 1000 };
};
const mockDevelopmentPlans: Record<string, IndividualDevelopmentPlan> = { 'EMP002': { id: 'IDP001', employeeId: 'EMP002', reviewId: 'REV001', strengths: [ "مهارات تواصل قوية مع الفريق وأصحاب المصلحة.", "متعاون للغاية وداعم لأعضاء الفريق.", "يظهر مبادرة في اقتراح أفكار جديدة." ], areasForImprovement: [ "التركيز بشكل أكبر على تحقيق النتائج الرئيسية للأهداف.", "تطوير مهارات تحليل البيانات لاتخاذ قرارات تسويقية أفضل." ], goals: [ { id: 'dg1', description: 'إكمال دورة تدريبية في تحليل بيانات التسويق باستخدام Google Analytics.', targetDate: 'Q1 2025', status: DevelopmentGoalStatus.NOT_STARTED, resources: [{ title: 'Google Analytics for Beginners', type: 'course' }] }, { id: 'dg2', description: 'قيادة مشروع واحد على الأقل مع تحديد ومتابعة النتائج الرئيسية (KRs) بوضوح.', targetDate: 'Q1 2025', status: DevelopmentGoalStatus.NOT_STARTED, resources: [{ title: 'OKRs fundamentals', type: 'article' }] }, ] } };
export const generateDevelopmentPlan = async (review: PerformanceReview): Promise<IndividualDevelopmentPlan> => mockDevelopmentPlans[review.employee.id] ? { ...mockDevelopmentPlans[review.employee.id], reviewId: review.id } : { id: `IDP_${review.id}`, employeeId: review.employee.id, reviewId: review.id, strengths: review.metrics.filter(m => (m.score || 0) >= 4).map(m => `إظهار أداء قوي في ${m.name}.`), areasForImprovement: review.metrics.filter(m => (m.score || 0) <= 2).map(m => `تحتاج إلى تطوير في مجال ${m.name}.`), goals: [ { id: 'dg_generic_1', description: 'حضور ورشة عمل واحدة على الأقل متعلقة بمجالات التحسين.', targetDate: 'Next Quarter', status: DevelopmentGoalStatus.NOT_STARTED }, ] };
export const getDevelopmentPlanByEmployeeId = async (employeeId: string): Promise<IndividualDevelopmentPlan | null> => mockDevelopmentPlans[employeeId] || null;
export const getAiSuggestedArticles = async (query: string): Promise<HelpCenterArticle[]> => {
    if (!query || query.trim().length < 4) return [];
    const keywords = query.toLowerCase().split(' ');
    return mockHelpCenterArticles.filter(article => {
        const title = article.title.toLowerCase();
        const content = article.content.toLowerCase();
        return keywords.some(kw => title.includes(kw) || content.includes(kw));
    }).slice(0, 3);
};
export const getChatbotResponse = async (message: string): Promise<ChatMessage> => {
    const lowercasedMessage = message.toLowerCase();
    if (lowercasedMessage.includes('إجازة') || lowercasedMessage.includes('leave')) {
        const article = mockHelpCenterArticles.find(a => a.id === 'art_hr_01');
        return { role: 'bot', text: `لتقديم طلب إجازة، اذهب إلى بوابة الموظف واختر قسم "الإجازات"، ثم انقر على "طلب جديد". هل تود رؤية المقال الكامل؟`, articleLink: article?.id };
    }
    return { role: 'bot', text: 'عفواً، لم أفهم سؤالك. هل يمكنك إعادة صياغته؟' };
};

export const getAttendanceRecords = async (): Promise<AttendanceRecord[]> => {
    const employees = await getAllEmployees();
    return employees.slice(0, 15).map(employee => {
        const random = Math.random();
        let status: AttendanceStatus;
        if (random < 0.7) status = AttendanceStatus.PRESENT;
        else if (random < 0.85) status = AttendanceStatus.LATE;
        else status = AttendanceStatus.ABSENT;
        if (employee.id === 'EMP003') status = AttendanceStatus.ON_LEAVE;
        return { employee, checkIn: status === AttendanceStatus.ABSENT || status === AttendanceStatus.ON_LEAVE ? null : "09:05", checkOut: null, status, hours: '...' };
    });
};
export const getAttendanceStats = async (): Promise<AttendanceStatsData> => ({ present: 180, late: 22, absent: 15, onLeave: 30, earlyDeparture: 8, attendanceRate: 92.5 });
export const getInitialFeedItems = async (): Promise<FeedItem[]> => [ { id: 1, icon: 'fas fa-sign-in-alt', iconColor: 'green', title: 'John Doe checked in', subtitle: 'Engineering • 09:15 AM • On time', time: '10m ago' }, { id: 2, icon: 'fas fa-exclamation-triangle', iconColor: 'orange', title: 'Mike Wilson checked in late', subtitle: 'Sales • 09:45 AM • 45 min late', time: '12m ago' } ];
export const pollNewEvents = async (): Promise<FeedItem[]> => {
    if (Math.random() > 0.6) {
        const randomEmployee = mockEmployees[Math.floor(Math.random() * mockEmployees.length)];
        const isCheckIn = Math.random() > 0.5;
        const time = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
        return [{ id: Date.now(), icon: isCheckIn ? 'fas fa-sign-in-alt' : 'fas fa-sign-out-alt', iconColor: isCheckIn ? 'green' : 'purple', title: `${randomEmployee.firstName} ${isCheckIn ? 'checked in' : 'checked out'}`, subtitle: `${randomEmployee.department} • ${time}`, time: 'now' }];
    }
    return [];
};
const mockSurveys: Survey[] = [ { id: 'survey_annual_2024', title: 'استبيان رضا الموظفين السنوي 2024', description: 'ملاحظاتك تساعدنا على تحسين بيئة العمل.', status: SurveyStatus.CLOSED, creationDate: '2024-06-01', endDate: '2024-06-30', questions: [ { id: 'q1', text: 'ما مدى رضاك عن بيئة العمل بشكل عام؟', type: SurveyQuestionType.SCALE }, { id: 'q2', text: 'ما هي اقتراحاتك للتحسين؟', type: SurveyQuestionType.OPEN_TEXT }, ], participantCount: 220, completionRate: 95, }, { id: 'survey_q2_pulse', title: 'استبيان نبض الربع الثاني', description: 'فحص سريع لآراء الفريق.', status: SurveyStatus.ACTIVE, creationDate: '2024-07-15', endDate: '2024-07-25', questions: [], participantCount: 180, completionRate: 60, } ];
const mockSurveyAnalytics: SurveyAnalytics = { participationRate: 95.2, engagementScore: 4.3, questionResults: [ { questionId: 'q1', questionText: 'ما مدى رضاك عن بيئة العمل بشكل عام؟ (1-5)', type: SurveyQuestionType.SCALE, results: { '1': 5, '2': 10, '3': 25, '4': 110, '5': 70 } }, { questionId: 'q2', questionText: 'ما مدى رضاك عن التواصل الداخلي؟', type: SurveyQuestionType.SCALE, results: { '1': 2, '2': 18, '3': 40, '4': 100, '5': 60 } } ], openTextAnalysis: [ { theme: 'التواصل والشفافية', sentiment: 'Positive', count: 45, quotes: ['"أحب الاجتماعات العامة الشهرية."'] }, { theme: 'التوازن بين العمل والحياة', sentiment: 'Negative', count: 30, quotes: ['"نحتاج إلى مرونة أكبر في ساعات العمل."'] }, { theme: 'فرص التطوير', sentiment: 'Neutral', count: 25, quotes: ['"أتمنى وجود المزيد من الدورات التدريبية المتقدمة."'] } ] };
export const getSurveys = async (): Promise<Survey[]> => mockSurveys;
export const getSurveyAnalytics = async (surveyId: string): Promise<SurveyAnalytics> => mockSurveyAnalytics;
export const mockNotifications: Notification[] = [ { id: '1', type: 'leave', title: 'طلب إجازة جديد', description: 'قدم جون دو طلب إجازة سنوية.', time: 'منذ 5 دقائق', read: false }, { id: '2', type: 'document', title: 'مستند على وشك الانتهاء', description: 'جواز سفر جين سميث سينتهي خلال 30 يومًا.', time: 'منذ ساعة', read: false }, { id: '3', type: 'recruitment', title: 'مرشح جديد', description: 'تقدم أحمد محمود لوظيفة مهندس واجهات أمامية.', time: 'منذ 3 ساعات', read: true }, { id: '4', type: 'system', title: 'تحديث النظام', description: 'تم تحديث سياسات الإجازات لتتوافق مع القانون الجديد.', time: 'منذ يوم', read: true } ];
export const getNotifications = async (): Promise<Notification[]> => mockNotifications;
const mockKudos: Kudo[] = [ { id: 'kudo1', sender: { id: 'EMP002', firstName: 'Jane', lastName: 'Smith', avatar: '', avatarInitials: 'JS', avatarColor: 'bg-purple-500', jobTitle: 'Marketing Manager', department: 'Marketing', status: EmployeeStatus.ACTIVE, onlineStatus: OnlineStatus.ONLINE, role: UserRole.DEPARTMENT_MANAGER }, receiver: { id: 'EMP008', firstName: 'سمير', lastName: 'صالح', avatar: '', avatarInitials: 'سص', avatarColor: 'bg-cyan-500', jobTitle: 'Marketing Specialist', department: 'Marketing', status: EmployeeStatus.ACTIVE, onlineStatus: OnlineStatus.ONLINE, role: UserRole.EMPLOYEE }, message: 'شكرًا لك على جهودك الاستثنائية في حملة الربع الثاني، لقد كانت نتائجك مذهلة!', values: [CompanyValue.EXCELLENCE, CompanyValue.CUSTOMER_FOCUS], timestamp: 'منذ ساعتين', reactions: { count: 5 } }, ];
const mockMilestones: Milestone[] = [ { id: 'mile1', employee: { id: 'EMP004', firstName: 'Sarah', lastName: 'Johnson', avatar: '', avatarInitials: 'SJ', avatarColor: 'bg-red-500', jobTitle: 'HR Manager', department: 'HR', status: EmployeeStatus.ACTIVE, onlineStatus: OnlineStatus.ONLINE, role: UserRole.HR_MANAGER }, type: 'ANNIVERSARY', date: 'July 28, 2024', years: 3 }, { id: 'mile2', employee: { id: 'EMP003', firstName: 'Mike', lastName: 'Wilson', avatar: '', avatarInitials: 'MW', avatarColor: 'bg-green-500', jobTitle: 'Sales Rep', department: 'Sales', status: EmployeeStatus.ON_LEAVE, onlineStatus: OnlineStatus.AWAY, role: UserRole.EMPLOYEE }, type: 'BIRTHDAY', date: 'July 30' }, ];
export const getKudosFeed = async (): Promise<Kudo[]> => mockKudos;
export const getUpcomingMilestones = async (): Promise<Milestone[]> => mockMilestones;
export const sendKudo = async (kudoData: Omit<Kudo, 'id'|'timestamp'|'reactions'>): Promise<Kudo> => {
    const newKudo: Kudo = { id: `kudo${Date.now()}`, ...kudoData, timestamp: 'الآن', reactions: { count: 0 } };
    mockKudos.unshift(newKudo);
    return newKudo;
}
export const weeklyStats: WeeklyStat[] = [ { day: 'weekdays.Sunday', percentage: 95 }, { day: 'weekdays.Monday', percentage: 92 }, { day: 'weekdays.Tuesday', percentage: 97 }, { day: 'weekdays.Wednesday', percentage: 94 }, { day: 'weekdays.Thursday', percentage: 89 }, ];
export const getWeeklyStats = async (): Promise<WeeklyStat[]> => weeklyStats;
export const userLeaveBalances: LeaveBalance[] = [ { type: 'page.leaves.leaveBalance.type.annual', used: 18, total: 25, color: 'bg-blue-600' }, { type: 'page.leaves.leaveBalance.type.sick', used: 3, total: 12, color: 'bg-red-500' }, { type: 'page.leaves.leaveBalance.type.casual', used: 1, total: 7, color: 'bg-yellow-500' }, { type: 'page.leaves.leaveBalance.type.maternity', used: 0, total: 120, color: 'bg-green-500' }, { type: 'page.leaves.leaveBalance.type.specialNeeds', used: 0, total: 45, color: 'bg-indigo-500' }, ];
export const recentActivity: ActivityItem[] = [ { id: 1, icon: 'fas fa-check', iconColor: 'green', title: { text: 'page.leaves.recentActivity.approvedFor', highlight: "أليكس تشين" }, subtitle: 'إجازة • 23-27 ديسمبر • تمت الموافقة تلقائيًا', time: 'منذ دقيقتين' }, { id: 2, icon: 'fas fa-paper-plane', iconColor: 'blue', title: { text: 'page.leaves.recentActivity.newRequestFrom', highlight: "ليزا براون" }, subtitle: 'إجازة مرضية • 19 ديسمبر • في انتظار الموافقة', time: 'منذ 15 دقيقة' }, { id: 3, icon: 'fas fa-times', iconColor: 'red', title: { text: 'page.leaves.recentActivity.rejectedFor', highlight: "توم ديفيس" }, subtitle: 'شخصية • 20-22 ديسمبر • تغطية غير كافية', time: 'منذ ساعة' }, { id: 4, icon: 'fas fa-edit', iconColor: 'purple', title: { text: 'page.leaves.recentActivity.modifiedBy', highlight: "سارة ويلسون" }, subtitle: 'تم تغيير التواريخ إلى 21-23 ديسمبر', time: 'منذ ساعتين' }, ];
export const getUserLeaveBalances = async (): Promise<LeaveBalance[]> => userLeaveBalances;
export const getRecentActivities = async (): Promise<ActivityItem[]> => recentActivity;
export const getKpis = async (): Promise<Kpi[]> => mockKpis;
export const getTopPerformers = async (): Promise<Performer[]> => {
    const employees = await getAllEmployees();
    return [ { employee: employees[4], score: 98.5, trend: 2.3 }, { employee: employees[1], score: 96.8, trend: 1.7 }, { employee: employees[2], score: 95.2, trend: 0.0 } ];
};
export const getRecentReports = async (): Promise<Report[]> => mockRecentReportsData;
export const getPredictiveInsights = async (): Promise<PredictiveInsight[]> => mockPredictiveInsightsData;
export const getUpcomingEvents = async (): Promise<UpcomingEvent[]> => mockUpcomingEvents;
export const getPortalActivities = async (): Promise<PortalActivity[]> => mockPortalActivities;
export const getAnnouncements = async (): Promise<Announcement[]> => mockAnnouncements;
export const getPortalLearningCourses = async (): Promise<LearningCourse[]> => mockLearningCourses;
export const getPortalSkills = async (): Promise<Skill[]> => mockSkills;
export const getPortalAchievements = async (): Promise<Achievement[]> => mockAchievements;
export const getBenefits = async (): Promise<Benefit[]> => mockBenefitsData;
export const getFeedback = async (): Promise<Feedback[]> => mockFeedbackData;
export const getCostBreakdownData = async (): Promise<any> => costBreakdownData;
export const getAllGoals = async (): Promise<CompanyGoal[]> => mockAllGoals;
export const getLeaveTypeSettings = async (): Promise<LeaveTypeSetting[]> => leaveTypeSettingsData;
export const getPublicHolidays = async (): Promise<PublicHoliday[]> => publicHolidaysData;
export const getSalaryComponents = async (): Promise<SalaryComponent[]> => salaryComponentsData;
export const getAttendanceSettings = async (): Promise<{ defaultSettings: Required<AttendanceSettings>, branchSettings: Record<string, AttendanceSettings> }> => ({ defaultSettings: defaultAttendanceSettings, branchSettings: branchAttendanceSettings });