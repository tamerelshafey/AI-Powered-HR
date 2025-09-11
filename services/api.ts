import { supabase } from './supabaseClient';
import { Employee, JobPosting, Candidate, OnboardingProcess, EmployeeDocument, PayrollRun, CompanyAsset, JobTitle, Course, EmployeeEnrollment, HelpCenterCategory, HelpCenterArticle, SupportTicket, EmployeeActivity, AssetStatus, PerformanceReview, CompanyGoal, LeaveRequest, Payslip, CourseCategory, EmployeeLeaveBalance, ExternalCourseRecord, CompRequestStatus, CompensationChangeRequest, IndividualDevelopmentPlan, DevelopmentGoalStatus, ChatMessage, Department, Branch, DocumentStatus, PerformanceStatus, TicketStatus, TicketDepartment, User, AttendanceRecord, FeedItem, AttendanceStatus, PayrollStatus, LeaveStatus, Notification, EmployeeProfileOverviewData, Survey, SurveyAnalytics, SurveyStatus, SurveyQuestionType, Sentiment, Kudo, Milestone, CompanyValue } from '../types';
import { employees as mockEmployees, employeeActivities as mockEmployeeActivities } from '../pages/employees/data';
import { jobPostings as mockJobPostings, candidates as mockCandidates } from '../pages/recruitment/data';
import { onboardingProcesses as mockOnboardingProcesses } from '../pages/onboarding_offboarding/data';
import { employeeDocuments as mockEmployeeDocuments } from '../pages/documents/data';
import { payrollRuns as mockPayrollRuns, employeePayslipsData } from '../pages/payroll/data';
import { companyAssets as mockCompanyAssets } from '../pages/assets/data';
import { jobTitles as mockJobTitles } from '../pages/job_titles/data';
import { courses as mockCourses, enrollments as mockEnrollments } from '../pages/learning/data';
import { helpCenterCategories as mockHelpCenterCategories, helpCenterArticles as mockHelpCenterArticles } from '../pages/help_center/data';
import { supportTickets as mockSupportTickets } from '../pages/support_tickets/data';
import { allReviews as mockPerformanceReviews, allGoals as mockGoals } from '../pages/performance/data';
import { allLeaveRequests as mockAllLeaveRequests } from '../pages/leaves/data';
import { departments as mockDepartments } from '../pages/departments/data';
import { branches as mockBranches } from '../pages/branches/data';
import { users } from '../users';


export interface PaginatedResponse<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    hasMore: boolean;
}

// --- AUTHENTICATION REMOVED ---
// The login and checkAuthStatus functions that interacted with Supabase have been removed
// to bypass the database error and implement a demo-friendly user switching mechanism.
// --- END AUTHENTICATION ---


export const compensationChangeRequests: CompensationChangeRequest[] = [
    {
        id: 'COMP001',
        employee: mockEmployees.find(e => e.id === 'EMP003')!, // Mike Wilson
        requestDate: '2024-12-31',
        effectiveDate: '2025-01-01',
        requestedBy: 'Khalid Al-Ghamdi',
        status: CompRequestStatus.APPROVED,
        salaryIncreasePercentage: 8,
        oneTimeBonus: 20000,
        justification: 'أداء استثنائي وتجاوز الأهداف للربع الرابع على التوالي.',
        reviewId: 'REV003',
    },
    {
        id: 'COMP002',
        employee: mockEmployees.find(e => e.id === 'EMP002')!, // Jane Smith
        requestDate: '2025-01-02',
        effectiveDate: '2025-02-01',
        requestedBy: 'Robert (CEO)',
        status: CompRequestStatus.PENDING_APPROVAL,
        salaryIncreasePercentage: 10,
        justification: 'أداء قيادي متميز ونجاح في إطلاق الحملة التسويقية الجديدة.',
        reviewId: 'REV001',
    },
    {
        id: 'COMP003',
        employee: mockEmployees.find(e => e.id === 'EMP001')!, // John Doe
        requestDate: '2025-01-05',
        effectiveDate: '2025-02-01',
        requestedBy: 'Engineering Manager',
        status: CompRequestStatus.PENDING_APPROVAL,
        oneTimeBonus: 0,
        salaryIncreasePercentage: 12.5,
        justification: 'أداء تقني عالي باستمرار وقيادة في مشروع X.',
        reviewId: 'REV014',
    }
];

export interface PaginatedEmployeesResponse {
    data: Employee[];
    total: number;
    hasMore: boolean;
}

/**
 * Fetches a list of all employees for dropdowns and non-paginated lists.
 * @returns A promise that resolves to an array of Employee objects.
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    console.log("Fetching ALL employees from mock API...");
    return mockEmployees;
};

/**
 * Fetches a paginated list of employees.
 * @param page The page number to fetch.
 * @param limit The number of employees per page.
 * @returns A promise that resolves to a paginated response of Employee objects.
 */
export const getEmployees = async (page: number = 1, limit: number = 12): Promise<PaginatedEmployeesResponse> => {
    console.log(`Fetching employees from mock API... Page: ${page}, Limit: ${limit}`);
    
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = mockEmployees.slice(start, end);
    const total = mockEmployees.length;

    return {
        data: paginatedData,
        total,
        hasMore: end < total,
    };
};


/**
 * Fetches a single employee by their ID.
 * @param id The ID of the employee to fetch.
 * @returns A promise that resolves to an Employee object or undefined if not found.
 */
export const getEmployeeById = async (id: string): Promise<Employee | undefined> => {
    console.log(`Fetching employee with ID: ${id}`);
    return mockEmployees.find(emp => emp.id === id);
};

/**
 * Fetches activity log for a specific employee.
 * @param employeeId The ID of the employee.
 * @returns A promise that resolves to an array of EmployeeActivity objects.
 */
export const getEmployeeActivities = async (employeeId: string): Promise<EmployeeActivity[]> => {
    console.log(`Fetching activities for employee ID: ${employeeId}`);
    // In a real app, you would filter activities based on employeeId.
    // Here we return a generic list for demonstration.
    return mockEmployeeActivities;
};

export const getEmployeeProfileOverviewData = async (employeeId: string): Promise<EmployeeProfileOverviewData> => {
    console.log(`Fetching profile overview data for employee ID: ${employeeId}`);
    // In a real app, this data would be calculated from various sources.
    // Here we generate plausible mock data based on the employeeId.

    // Mock data generation
    const employeeGoals = mockGoals.filter(g => g.employeeId === employeeId || g.department === 'All');
    const goalsCompleted = employeeGoals.filter(g => g.progress === 100).length;

    const lastReview = mockPerformanceReviews
        .filter(r => r.employee.id === employeeId && r.status === PerformanceStatus.COMPLETED)
        .sort((a, b) => new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime())[0];
        
    const leaveBalance = await getLeaveBalanceForEmployee(employeeId);


    const data: EmployeeProfileOverviewData = {
        kpis: {
            attendanceRate: 97.5, // Mock static value
            performanceScore: lastReview ? lastReview.overallScore : 4.2,
            goalsCompleted: goalsCompleted,
            goalsTotal: employeeGoals.length,
            leaveTaken: leaveBalance.totalUsed,
            leaveTotal: leaveBalance.annual.total,
        },
        goals: employeeGoals.slice(0, 3), // Show top 3 goals
        leaveBalance: {
            annual: leaveBalance.annual,
            sick: leaveBalance.sick
        }
    };

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    return data;
};



/**
 * Fetches a list of all job postings.
 * @returns A promise that resolves to an array of JobPosting objects.
 */
export const getJobPostings = async (): Promise<JobPosting[]> => {
    console.log("Fetching job postings from mock API...");
    return mockJobPostings;
};

/**
 * Fetches a list of all candidates.
 * @returns A promise that resolves to an array of Candidate objects.
 */
export const getCandidates = async (): Promise<Candidate[]> => {
    console.log("Fetching candidates from mock API...");
    return mockCandidates;
};

/**
 * Fetches all onboarding and offboarding processes.
 * @returns A promise that resolves to an array of OnboardingProcess objects.
 */
export const getOnboardingProcesses = async (): Promise<OnboardingProcess[]> => {
    console.log("Fetching onboarding/offboarding processes from mock API...");
    return mockOnboardingProcesses;
}

/**
 * Fetches all employee documents, optionally filtered by employee ID.
 * @param employeeId Optional ID of an employee to filter documents for.
 * @returns A promise that resolves to an array of EmployeeDocument objects.
 */
export const getEmployeeDocuments = async (employeeId?: string): Promise<EmployeeDocument[]> => {
    console.log(`Fetching employee documents... ${employeeId ? `for employee ${employeeId}`: ''}`);
    if (employeeId) {
        return mockEmployeeDocuments.filter(doc => doc.employee.id === employeeId);
    }
    return mockEmployeeDocuments;
}


/**
 * Fetches statistics about all employee documents.
 * @returns A promise that resolves to an object with document stats.
 */
export const getDocumentsStats = async (): Promise<{ total: number; expiringSoon: number; expired: number; missing: number; }> => {
    console.log("Fetching document stats from mock API...");
    const total = mockEmployeeDocuments.length;
    const expiringSoon = mockEmployeeDocuments.filter(d => d.status === DocumentStatus.EXPIRING_SOON).length;
    const expired = mockEmployeeDocuments.filter(d => d.status === DocumentStatus.EXPIRED).length;
    const missing = mockEmployeeDocuments.filter(d => d.status === DocumentStatus.MISSING).length;
    return { total, expiringSoon, expired, missing };
};

/**
 * Fetches a paginated and filtered list of employee documents.
 * @param page The page number.
 * @param limit The number of items per page.
 * @param filters The filters to apply.
 * @returns A promise resolving to a paginated response of documents.
 */
export const getEmployeeDocumentsPaginated = async (
    page: number = 1,
    limit: number = 10,
    filters: { searchTerm: string; filterType: string; filterStatus: string }
): Promise<PaginatedResponse<EmployeeDocument>> => {
    console.log(`Fetching paginated documents with filters:`, filters);

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
    const paginatedData = filteredData.slice(start, start + limit);

    return {
        data: paginatedData,
        totalItems,
        totalPages,
        currentPage: page,
        hasMore: start + limit < totalItems
    };
};

/**
 * Fetches all payroll runs.
 * @returns A promise that resolves to an array of PayrollRun objects.
 */
export const getPayrollRuns = async (): Promise<PayrollRun[]> => {
    console.log("Fetching payroll runs from mock API...");
    return mockPayrollRuns;
}

/**
 * Updates the status of a specific payroll run.
 * @param runId The ID of the payroll run to update.
 * @param status The new status.
 * @returns The updated payroll run object.
 */
export const updatePayrollRunStatus = async (runId: string, status: PayrollStatus): Promise<PayrollRun> => {
    console.log(`Updating payroll run ${runId} to status ${status}`);
    const runIndex = mockPayrollRuns.findIndex(r => r.id === runId);
    if (runIndex === -1) {
        throw new Error("Payroll run not found");
    }
    mockPayrollRuns[runIndex].status = status;
    return mockPayrollRuns[runIndex];
};


/**
 * Fetches all payslips for a given payroll run.
 * @param runId The ID of the payroll run.
 * @returns A promise that resolves to an array of Payslip objects.
 */
export const getEmployeePayslips = async (runId: string): Promise<Payslip[]> => {
    console.log(`Fetching payslips for run ID: ${runId}`);
    return employeePayslipsData[runId] || [];
}

/**
 * Fetches all payslips for a given employee.
 * @param employeeId The ID of the employee.
 * @returns A promise that resolves to an array of Payslip objects.
 */
export const getPayslipsByEmployeeId = async (employeeId: string): Promise<Payslip[]> => {
    console.log(`Fetching payslips for employee ID: ${employeeId}`);
    const allPayslips: Payslip[] = Object.values(employeePayslipsData).flat();
    return allPayslips.filter(p => p.employee.id === employeeId);
}



/**
 * Fetches all company assets, optionally filtered by employee ID.
 * @param employeeId Optional ID of an employee to filter assets for.
 * @returns A promise that resolves to an array of CompanyAsset objects.
 */
export const getCompanyAssets = async (employeeId?: string): Promise<CompanyAsset[]> => {
    console.log(`Fetching company assets... ${employeeId ? `for employee ${employeeId}`: ''}`);
    if (employeeId) {
        return mockCompanyAssets.filter(asset => asset.assignedTo?.id === employeeId);
    }
    return mockCompanyAssets;
}

/**
 * Fetches statistics about all company assets.
 * @returns A promise that resolves to an object with asset stats.
 */
export const getAssetsStats = async (): Promise<{ total: number; assigned: number; available: number; inRepair: number; }> => {
    console.log("Fetching asset stats from mock API...");
    const total = mockCompanyAssets.length;
    const assigned = mockCompanyAssets.filter(a => a.status === AssetStatus.IN_USE).length;
    const available = mockCompanyAssets.filter(a => a.status === AssetStatus.AVAILABLE).length;
    const inRepair = mockCompanyAssets.filter(a => a.status === AssetStatus.IN_REPAIR).length;
    return { total, assigned, available, inRepair };
};

/**
 * Fetches a paginated and filtered list of company assets.
 * @param page The page number.
 * @param limit The number of items per page.
 * @param filters The filters to apply.
 * @returns A promise resolving to a paginated response of assets.
 */
export const getCompanyAssetsPaginated = async (
    page: number = 1,
    limit: number = 10,
    filters: { searchTerm: string; filterCategory: string; filterStatus: string }
): Promise<PaginatedResponse<CompanyAsset>> => {
    console.log(`Fetching paginated assets with filters:`, filters);

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
    const paginatedData = filteredData.slice(start, start + limit);

    return {
        data: paginatedData,
        totalItems,
        totalPages,
        currentPage: page,
        hasMore: start + limit < totalItems
    };
};

/**
 * Fetches all available company assets.
 * @returns A promise that resolves to an array of CompanyAsset objects with 'AVAILABLE' status.
 */
export const getAvailableAssets = async (): Promise<CompanyAsset[]> => {
    console.log("Fetching available company assets from mock API...");
    return mockCompanyAssets.filter(asset => asset.status === AssetStatus.AVAILABLE);
}

/**
 * Fetches all job titles.
 * @returns A promise that resolves to an array of JobTitle objects.
 */
export const getJobTitles = async (): Promise<JobTitle[]> => {
    console.log("Fetching job titles from mock API...");
    return mockJobTitles;
}

/**
 * Fetches all available courses.
 * @returns A promise that resolves to an array of Course objects.
 */
export const getCourses = async (): Promise<Course[]> => {
    console.log("Fetching courses from mock API...");
    return mockCourses;
};

/**
 * Fetches all employee enrollments.
 * @returns A promise that resolves to an array of EmployeeEnrollment objects.
 */
export const getEmployeeEnrollments = async (): Promise<EmployeeEnrollment[]> => {
    console.log("Fetching employee enrollments from mock API...");
    return mockEnrollments;
};

/**
 * Fetches enrollments for a specific employee.
 * @param employeeId The ID of the employee.
 * @returns A promise that resolves to an array of EmployeeEnrollment objects.
 */
export const getEmployeeEnrollmentsByEmployeeId = async (employeeId: string): Promise<EmployeeEnrollment[]> => {
    console.log(`Fetching enrollments for employee ID: ${employeeId}`);
    return mockEnrollments.filter(enr => enr.employee.id === employeeId);
};


/**
 * Fetches all help center categories.
 * @returns A promise that resolves to an array of HelpCenterCategory objects.
 */
export const getHelpCenterCategories = async (): Promise<HelpCenterCategory[]> => {
    console.log("Fetching help center categories from mock API...");
    return mockHelpCenterCategories;
};

/**
 * Fetches all help center articles.
 * @returns A promise that resolves to an array of HelpCenterArticle objects.
 */
export const getHelpCenterArticles = async (): Promise<HelpCenterArticle[]> => {
    console.log("Fetching help center articles from mock API...");
    return mockHelpCenterArticles;
};

/**
 * Fetches all support tickets.
 * @returns A promise that resolves to an array of SupportTicket objects.
 */
export const getSupportTickets = async (): Promise<SupportTicket[]> => {
    console.log("Fetching support tickets from mock API...");
    return mockSupportTickets;
};


/**
 * Fetches a paginated and filtered list of support tickets.
 * @param page The page number.
 * @param limit The number of items per page.
 * @param filters The filters to apply.
 * @returns A promise resolving to a paginated response of tickets.
 */
export const getSupportTicketsPaginated = async (
    page: number = 1,
    limit: number = 20,
    filters: { searchTerm: string; filterStatus: string; filterDepartment: string }
): Promise<PaginatedResponse<SupportTicket>> => {
    console.log(`Fetching paginated tickets with filters:`, filters);

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
    const paginatedData = filteredData.slice(start, start + limit);

    return {
        data: paginatedData,
        totalItems,
        totalPages,
        currentPage: page,
        hasMore: start + limit < totalItems,
    };
};

/**
 * Fetches performance reviews for a specific employee.
 * @param employeeId The ID of the employee.
 * @returns A promise that resolves to an array of PerformanceReview objects.
 */
export const getPerformanceReviewsByEmployeeId = async (employeeId: string): Promise<PerformanceReview[]> => {
    console.log(`Fetching performance reviews for employee ID: ${employeeId}`);
    return mockPerformanceReviews.filter(review => review.employee.id === employeeId);
};

/**
 * Fetches a paginated and filtered list of performance reviews.
 * @param page The page number.
 * @param limit The number of items per page.
 * @param filters The filters to apply.
 * @returns A promise resolving to a paginated response of reviews.
 */
export const getPerformanceReviewsPaginated = async (
    page: number = 1,
    limit: number = 20,
    filters: { status: string; type: string }
): Promise<PaginatedResponse<PerformanceReview>> => {
    console.log(`Fetching paginated reviews with filters:`, filters);

    let filteredData = mockPerformanceReviews;

    if (filters.status !== 'All') {
        filteredData = filteredData.filter(review => review.status === filters.status);
    }
    if (filters.type !== 'All') {
        filteredData = filteredData.filter(review => review.reviewType === filters.type);
    }
    
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / limit);
    const start = (page - 1) * limit;
    const paginatedData = filteredData.slice(start, start + limit);

    return {
        data: paginatedData,
        totalItems,
        totalPages,
        currentPage: page,
        hasMore: start + limit < totalItems,
    };
};

/**
 * Adds a new performance review.
 * @param reviewData The data for the new review.
 * @returns The newly created review.
 */
export const addPerformanceReview = async (reviewData: Omit<PerformanceReview, 'id'>): Promise<PerformanceReview> => {
    const newReview: PerformanceReview = {
        id: `REV${Date.now()}`,
        ...reviewData,
    };
    mockPerformanceReviews.unshift(newReview);
    return newReview;
};

/**
 * Updates an existing performance review.
 * @param reviewId The ID of the review to update.
 * @param updates The partial data to update.
 * @returns The updated review.
 */
export const updatePerformanceReview = async (reviewId: string, updates: Partial<PerformanceReview>): Promise<PerformanceReview> => {
    const reviewIndex = mockPerformanceReviews.findIndex(r => r.id === reviewId);
    if (reviewIndex === -1) {
        throw new Error("Review not found");
    }
    const updatedReview = { ...mockPerformanceReviews[reviewIndex], ...updates };
    mockPerformanceReviews[reviewIndex] = updatedReview;
    return updatedReview;
};


/**
 * Fetches goals for a specific employee.
 * @param employeeId The ID of the employee.
 * @returns A promise that resolves to an array of CompanyGoal objects.
 */
export const getGoalsByEmployeeId = async (employeeId: string): Promise<CompanyGoal[]> => {
    console.log(`Fetching goals for employee ID: ${employeeId}`);
    // Filters goals assigned directly to the employee OR company-wide goals.
    return mockGoals.filter(goal => goal.employeeId === employeeId || goal.department === 'All');
};

/**
 * Adds a new company goal.
 * @param goalData The data for the new goal.
 * @returns The newly created goal.
 */
export const addGoal = async (goalData: Omit<CompanyGoal, 'id' | 'progress'>): Promise<CompanyGoal> => {
    const newGoal: CompanyGoal = {
        id: `GOAL${Date.now()}`,
        progress: 0,
        ...goalData,
    };
    mockGoals.unshift(newGoal);
    return newGoal;
};

/**
 * Updates an existing company goal.
 * @param goalId The ID of the goal to update.
 * @param updates The partial data to update.
 * @returns The updated goal.
 */
export const updateGoal = async (goalId: string, updates: Partial<CompanyGoal>): Promise<CompanyGoal> => {
    const goalIndex = mockGoals.findIndex(g => g.id === goalId);
    if (goalIndex === -1) {
        throw new Error("Goal not found");
    }
    const updatedGoal = { ...mockGoals[goalIndex], ...updates };
    mockGoals[goalIndex] = updatedGoal;
    return updatedGoal;
};


/**
 * Fetches leave requests for a specific employee.
 * @param employeeId The ID of the employee.
 * @returns A promise that resolves to an array of LeaveRequest objects.
 */
export const getLeaveRequestsByEmployeeId = async (employeeId: string): Promise<LeaveRequest[]> => {
    console.log(`Fetching leave requests for employee ID: ${employeeId}`);
    return mockAllLeaveRequests.filter(req => req.employee.id === employeeId);
};

/**
 * Updates the status of a specific leave request.
 * @param requestId The ID of the leave request to update.
 * @param status The new status for the request.
 * @returns A promise that resolves to the updated LeaveRequest object.
 */
export const updateLeaveRequestStatus = async (requestId: string, status: LeaveStatus): Promise<LeaveRequest> => {
    const requestIndex = mockAllLeaveRequests.findIndex(r => r.id === requestId);
    if (requestIndex === -1) {
        throw new Error('Request not found');
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Update the request in the mock data source
    mockAllLeaveRequests[requestIndex].status = status;
    
    return mockAllLeaveRequests[requestIndex];
};


// Mock data for leave balances
const employeeLeaveBalances: Record<string, EmployeeLeaveBalance> = {
    'EMP001': { annual: { used: 6, total: 21 }, sick: { used: 0, total: 14 }, personal: { used: 1, total: 5 }, totalUsed: 7 },
    'EMP002': { annual: { used: 10, total: 25 }, sick: { used: 3, total: 14 }, personal: { used: 0, total: 7 }, totalUsed: 13 },
    'EMP003': { annual: { used: 2, total: 21 }, sick: { used: 4, total: 14 }, personal: { used: 3, total: 5 }, totalUsed: 9 },
    'EMP004': { annual: { used: 5, total: 25 }, sick: { used: 1, total: 14 }, personal: { used: 2, total: 7 }, totalUsed: 8 },
    'EMP005': { annual: { used: 8, total: 21 }, sick: { used: 2, total: 14 }, personal: { used: 1, total: 5 }, totalUsed: 11 },
    'EMP006': { annual: { used: 0, total: 21 }, sick: { used: 0, total: 14 }, personal: { used: 0, total: 5 }, totalUsed: 0 },
    'EMP008': { annual: { used: 1, total: 21 }, sick: { used: 1, total: 14 }, personal: { used: 0, total: 5 }, totalUsed: 2 },
};

/**
 * Fetches leave balance for a specific employee.
 * @param employeeId The ID of the employee.
 * @returns A promise that resolves to an EmployeeLeaveBalance object.
 */
export const getLeaveBalanceForEmployee = async (employeeId: string): Promise<EmployeeLeaveBalance> => {
    console.log(`Fetching leave balance for employee ID: ${employeeId}`);
    return employeeLeaveBalances[employeeId] || {
        annual: { used: 0, total: 21 },
        sick: { used: 0, total: 14 },
        personal: { used: 0, total: 5 },
        totalUsed: 0,
    };
};


/**
 * Finds relevant courses based on a skill or metric name.
 * @param skillName The name of the skill/metric to search for.
 * @returns A promise that resolves to an array of matching Course objects.
 */
export const findCoursesBySkill = async (skillName: string): Promise<Course[]> => {
    console.log(`Finding courses for skill: ${skillName}`);
    
    const lowercasedSkill = skillName.toLowerCase();
    
    // Simple mapping logic for demo purposes
    const skillToCategoryMap: Record<string, CourseCategory> = {
        'التواصل': CourseCategory.SOFT_SKILLS,
        'العمل الجماعي': CourseCategory.SOFT_SKILLS,
        'القيادة': CourseCategory.LEADERSHIP,
        'جودة الكود': CourseCategory.TECHNICAL,
        'حل المشكلات': CourseCategory.TECHNICAL,
    };
    
    // Find the category that matches part of the skill name
    const targetCategoryKey = Object.keys(skillToCategoryMap).find(key => lowercasedSkill.includes(key.toLowerCase()));
    const targetCategory = targetCategoryKey ? skillToCategoryMap[targetCategoryKey] : null;

    return mockCourses.filter(course => {
        const titleMatch = course.title.toLowerCase().includes(lowercasedSkill);
        const categoryMatch = targetCategory ? course.category === targetCategory : false;
        const descriptionMatch = course.description.toLowerCase().includes(lowercasedSkill);
        
        // Return true if any of the conditions are met
        return titleMatch || categoryMatch || descriptionMatch;
    });
};

const mockExternalCourses: ExternalCourseRecord[] = [
    {
        id: 'EXT001',
        employeeId: 'EMP005', // Alex Chen
        courseName: 'Certified Scrum Master',
        provider: 'Scrum Alliance',
        completionDate: '2024-05-20',
        score: 'Pass',
        certificateUrl: '#',
    },
    {
        id: 'EXT002',
        employeeId: 'EMP001', // John Doe
        courseName: 'Advanced Cloud Architecture',
        provider: 'AWS Training Center',
        completionDate: '2024-03-15',
        score: '92%',
        certificateUrl: '#',
    }
];

/**
 * Fetches external course records for a specific employee.
 * @param employeeId The ID of the employee.
 * @returns A promise that resolves to an array of ExternalCourseRecord objects.
 */
export const getExternalCoursesByEmployeeId = async (employeeId: string): Promise<ExternalCourseRecord[]> => {
    console.log(`Fetching external courses for employee ID: ${employeeId}`);
    return mockExternalCourses.filter(ec => ec.employeeId === employeeId);
};

export const getCompensationRequestsByStatus = async (status: CompRequestStatus): Promise<CompensationChangeRequest[]> => {
    console.log(`Fetching compensation requests with status: ${status}`);
    return compensationChangeRequests.filter(req => req.status === status);
};

// Simulate AI suggestion
export const getCompensationSuggestion = async (employeeId: string, performanceScore: number): Promise<{ salaryIncrease: number, bonus: number }> => {
    console.log(`Getting AI compensation suggestion for employee ${employeeId} with score ${performanceScore}`);
    
    // Simple logic for demo: higher score = better suggestion
    const baseIncrease = 2; // Base for everyone
    const performanceMultiplier = Math.max(0, (performanceScore - 3.5)) * 2; // e.g., 4.5 score -> (1)*2 = 2%
    const salaryIncrease = baseIncrease + performanceMultiplier + (Math.random() * 2); // Add some randomness

    const bonus = performanceScore > 4.2 ? Math.round(performanceScore * 5000) : 0;

    return {
        salaryIncrease: parseFloat(salaryIncrease.toFixed(1)),
        bonus: Math.round(bonus / 1000) * 1000, // Round to nearest 1000
    };
};

const mockDevelopmentPlans: Record<string, IndividualDevelopmentPlan> = {
    'EMP002': {
        id: 'IDP001',
        employeeId: 'EMP002',
        reviewId: 'REV001',
        strengths: [
            "مهارات تواصل قوية مع الفريق وأصحاب المصلحة.",
            "متعاون للغاية وداعم لأعضاء الفريق.",
            "يظهر مبادرة في اقتراح أفكار جديدة."
        ],
        areasForImprovement: [
            "التركيز بشكل أكبر على تحقيق النتائج الرئيسية للأهداف.",
            "تطوير مهارات تحليل البيانات لاتخاذ قرارات تسويقية أفضل."
        ],
        goals: [
            { id: 'dg1', description: 'إكمال دورة تدريبية في تحليل بيانات التسويق باستخدام Google Analytics.', targetDate: 'Q1 2025', status: DevelopmentGoalStatus.NOT_STARTED, resources: [{ title: 'Google Analytics for Beginners', type: 'course' }] },
            { id: 'dg2', description: 'قيادة مشروع واحد على الأقل مع تحديد ومتابعة النتائج الرئيسية (KRs) بوضوح.', targetDate: 'Q1 2025', status: DevelopmentGoalStatus.NOT_STARTED, resources: [{ title: 'OKRs fundamentals', type: 'article' }] },
        ]
    }
};

/**
 * Generates an Individual Development Plan (IDP) based on a performance review.
 * @param review The performance review to analyze.
 * @returns A promise that resolves to an IndividualDevelopmentPlan object.
 */
export const generateDevelopmentPlan = async (review: PerformanceReview): Promise<IndividualDevelopmentPlan> => {
    console.log(`Generating development plan for review ID: ${review.id}`);

    const plan = mockDevelopmentPlans[review.employee.id];
    if (plan) {
        return { ...plan, reviewId: review.id };
    }

    // Fallback for employees without a pre-defined plan
    return {
        id: `IDP_${review.id}`,
        employeeId: review.employee.id,
        reviewId: review.id,
        strengths: review.metrics.filter(m => (m.score || 0) >= 4).map(m => `إظهار أداء قوي في ${m.name}.`),
        areasForImprovement: review.metrics.filter(m => (m.score || 0) <= 2).map(m => `تحتاج إلى تطوير في مجال ${m.name}.`),
        goals: [
            { id: 'dg_generic_1', description: 'حضور ورشة عمل واحدة على الأقل متعلقة بمجالات التحسين.', targetDate: 'Next Quarter', status: DevelopmentGoalStatus.NOT_STARTED },
        ]
    };
};

/**
 * Fetches the latest approved development plan for an employee.
 * @param employeeId The ID of the employee.
 * @returns A promise that resolves to an IndividualDevelopmentPlan object or null.
 */
export const getDevelopmentPlanByEmployeeId = async (employeeId: string): Promise<IndividualDevelopmentPlan | null> => {
    console.log(`Fetching development plan for employee ID: ${employeeId}`);
    return mockDevelopmentPlans[employeeId] || null;
};

/**
 * Simulates an AI search for relevant help center articles.
 * @param query The user's search query from the ticket subject/description.
 * @returns A promise that resolves to an array of suggested HelpCenterArticle objects.
 */
export const getAiSuggestedArticles = async (query: string): Promise<HelpCenterArticle[]> => {
    console.log(`AI is searching for articles matching: "${query}"`);
    if (!query || query.trim().length < 4) {
        return [];
    }

    const keywords = query.toLowerCase().split(' ');
    const results = mockHelpCenterArticles.filter(article => {
        const title = article.title.toLowerCase();
        const content = article.content.toLowerCase();
        return keywords.some(kw => title.includes(kw) || content.includes(kw));
    });

    return results.slice(0, 3); // Return top 3 matches
};

/**
 * Simulates a response from an AI chatbot based on the help center articles.
 * @param message The user's message.
 * @returns A promise that resolves to a ChatMessage object with the bot's response.
 */
export const getChatbotResponse = async (message: string): Promise<ChatMessage> => {
    console.log(`Getting chatbot response for: "${message}"`);

    const lowercasedMessage = message.toLowerCase();

    // New law-related queries
    if (lowercasedMessage.includes('أمومة') || lowercasedMessage.includes('وضع')) {
        return {
            role: 'bot',
            text: 'وفقًا للقانون الجديد، رصيد إجازة الوضع (الأمومة) هو 120 يومًا، تُمنح بحد أقصى 3 مرات طوال فترة خدمة الموظفة.',
        };
    }
    if (lowercasedMessage.includes('إضافي') && (lowercasedMessage.includes('عطلة') || lowercasedMessage.includes('عطلات'))) {
        return {
            role: 'bot',
            text: 'يتم حساب العمل الإضافي في العطلات الرسمية بمعدل أجر يومين إضافيين عن كل يوم عمل، أي ما يعادل 200% من الأجر الأساسي اليومي.',
        };
    }
    if (lowercasedMessage.includes('سنوية') && (lowercasedMessage.includes('قواعد') || lowercasedMessage.includes('جديدة'))) {
        return {
            role: 'bot',
            text: 'الإجازة السنوية أصبحت: 15 يومًا في السنة الأولى (بعد 6 أشهر)، 21 يومًا من السنة الثانية، و30 يومًا لمن تجاوز 10 سنوات خدمة أو عمر الخمسين.',
        };
    }

    // Simple keyword matching for demo
    if (lowercasedMessage.includes('إجازة') || lowercasedMessage.includes('leave')) {
        const article = mockHelpCenterArticles.find(a => a.id === 'art_hr_01');
        return {
            role: 'bot',
            text: `لتقديم طلب إجازة، اذهب إلى بوابة الموظف واختر قسم "الإجازات"، ثم انقر على "طلب جديد". هل تود رؤية المقال الكامل؟`,
            articleLink: article?.id,
        };
    }
    if (lowercasedMessage.includes('راتب') || lowercasedMessage.includes('salary') || lowercasedMessage.includes('payslip')) {
        const article = mockHelpCenterArticles.find(a => a.id === 'art_payroll_01');
        return {
            role: 'bot',
            text: `يتم صرف الرواتب في اليوم الخامس والعشرين من كل شهر. يمكنك عرض قسائم الدفع من قسم "الرواتب" في البوابة.`,
            articleLink: article?.id,
        };
    }
    if (lowercasedMessage.includes('كلمة مرور') || lowercasedMessage.includes('password')) {
         const article = mockHelpCenterArticles.find(a => a.id === 'art_it_01');
        return {
            role: 'bot',
            text: `يمكنك إعادة تعيين كلمة مرور بريدك الإلكتروني عبر بوابة الدعم التقني بالنقر على "هل نسيت كلمة المرور؟".`,
            articleLink: article?.id,
        };
    }

    return {
        role: 'bot',
        text: 'عفواً، لم أفهم سؤالك. هل يمكنك إعادة صياغته؟ يمكنك أيضاً تصفح مركز المساعدة أو تقديم طلب دعم.',
    };
};

/**
 * Fetches all departments.
 * @returns A promise that resolves to an array of Department objects.
 */
export const getDepartments = async (): Promise<Department[]> => {
    console.log("Fetching departments from mock API...");
    return mockDepartments;
};

/**
 * Fetches all branches.
 * @returns A promise that resolves to an array of Branch objects.
 */
export const getBranches = async (): Promise<Branch[]> => {
    console.log("Fetching branches from mock API...");
    return mockBranches;
}

// --- ATTENDANCE MOCK API ---
const shifts: Record<string, { id: string, name: string }> = {
    shift_morning: { id: 'shift_morning', name: 'MORNING' },
    shift_evening: { id: 'shift_evening', name: 'EVENING' },
};

export const getAttendanceRecords = async (): Promise<AttendanceRecord[]> => {
    console.log("Fetching attendance records...");
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    // Simulate today's records for a subset of employees
    const todayRecords: AttendanceRecord[] = mockEmployees.slice(0, 15).map((employee, index) => {
        const shift = employee.shiftId ? shifts[employee.shiftId] : undefined;
        let status: AttendanceStatus;
        let checkIn: string | null = null;
        let checkOut: string | null = null;

        const random = Math.random();
        if (random < 0.7) { // 70% Present
            status = AttendanceStatus.PRESENT;
            checkIn = "09:05";
            if (Math.random() > 0.5) checkOut = "17:02";
        } else if (random < 0.85) { // 15% Late
            status = AttendanceStatus.LATE;
            checkIn = "09:40";
        } else { // 15% Absent
            status = AttendanceStatus.ABSENT;
        }

        if (employee.id === 'EMP003') { // Mike Wilson is on leave
             status = AttendanceStatus.ON_LEAVE;
             checkIn = null;
             checkOut = null;
        }

        return {
            employee,
            checkIn,
            checkOut,
            status,
            hours: checkOut ? '8:02' : '...',
            shift
        };
    });
    return todayRecords;
};

export interface AttendanceStatsData {
    present: number;
    late: number;
    absent: number;
    onLeave: number;
    earlyDeparture: number;
    attendanceRate: number;
}

export const getAttendanceStats = async (): Promise<AttendanceStatsData> => {
    console.log("Fetching attendance stats...");
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
        present: 180,
        late: 22,
        absent: 15,
        onLeave: 30,
        earlyDeparture: 8,
        attendanceRate: 92.5,
    };
};

export const getInitialFeedItems = async (): Promise<FeedItem[]> => {
     console.log("Fetching initial feed items...");
     return [
        { id: 1, icon: 'fas fa-sign-in-alt', iconColor: 'green', title: 'John Doe checked in', subtitle: 'Engineering • 09:15 AM • On time', time: '10m ago' },
        { id: 2, icon: 'fas fa-exclamation-triangle', iconColor: 'orange', title: 'Mike Wilson checked in late', subtitle: 'Sales • 09:45 AM • 45 min late', time: '12m ago' },
    ];
}

export const pollNewEvents = async (): Promise<FeedItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (Math.random() > 0.6) { // 40% chance of a new event
        const randomEmployee = mockEmployees[Math.floor(Math.random() * mockEmployees.length)];
        const isCheckIn = Math.random() > 0.5;
        const time = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });

        return [{
            id: Date.now(),
            icon: isCheckIn ? 'fas fa-sign-in-alt' : 'fas fa-sign-out-alt',
            iconColor: isCheckIn ? 'green' : 'purple',
            title: `${randomEmployee.firstName} ${isCheckIn ? 'checked in' : 'checked out'}`,
            subtitle: `${randomEmployee.department} • ${time}`,
            time: 'now',
        }];
    }
    return [];
};
// --- END ATTENDANCE MOCK ---
// FIX: Add mock data and functions for surveys to resolve missing export errors.
// --- SURVEYS MOCK API ---
const mockSurveys: Survey[] = [
    {
        id: 'survey_annual_2024',
        title: 'استبيان رضا الموظفين السنوي 2024',
        description: 'ملاحظاتك تساعدنا على تحسين بيئة العمل.',
        status: SurveyStatus.CLOSED,
        creationDate: '2024-06-01',
        endDate: '2024-06-30',
        questions: [
            { id: 'q1', text: 'ما مدى رضاك عن بيئة العمل بشكل عام؟', type: SurveyQuestionType.SCALE },
            { id: 'q2', text: 'ما هي اقتراحاتك للتحسين؟', type: SurveyQuestionType.OPEN_TEXT },
        ],
        participantCount: 220,
        completionRate: 95,
    },
    {
        id: 'survey_q2_pulse',
        title: 'استبيان نبض الربع الثاني',
        description: 'فحص سريع لآراء الفريق.',
        status: SurveyStatus.ACTIVE,
        creationDate: '2024-07-15',
        endDate: '2024-07-25',
        questions: [],
        participantCount: 180,
        completionRate: 60,
    }
];

const mockSurveyAnalytics: SurveyAnalytics = {
    participationRate: 95.2,
    engagementScore: 4.3,
    questionResults: [
        {
            questionId: 'q1',
            questionText: 'ما مدى رضاك عن بيئة العمل بشكل عام؟ (1-5)',
            type: SurveyQuestionType.SCALE,
            results: { '1': 5, '2': 10, '3': 25, '4': 110, '5': 70 }
        },
        {
            questionId: 'q2',
            questionText: 'ما مدى رضاك عن التواصل الداخلي؟',
            type: SurveyQuestionType.SCALE,
            results: { '1': 2, '2': 18, '3': 40, '4': 100, '5': 60 }
        }
    ],
    openTextAnalysis: [
        { theme: 'التواصل والشفافية', sentiment: 'Positive', count: 45, quotes: ['"أحب الاجتماعات العامة الشهرية."'] },
        { theme: 'التوازن بين العمل والحياة', sentiment: 'Negative', count: 30, quotes: ['"نحتاج إلى مرونة أكبر في ساعات العمل."'] },
        { theme: 'فرص التطوير', sentiment: 'Neutral', count: 25, quotes: ['"أتمنى وجود المزيد من الدورات التدريبية المتقدمة."'] }
    ]
};

/**
 * Fetches all surveys.
 * @returns A promise that resolves to an array of Survey objects.
 */
export const getSurveys = async (): Promise<Survey[]> => {
    console.log("Fetching surveys from mock API...");
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSurveys;
};

/**
 * Fetches analytics for a specific survey.
 * @param surveyId The ID of the survey.
 * @returns A promise that resolves to a SurveyAnalytics object.
 */
export const getSurveyAnalytics = async (surveyId: string): Promise<SurveyAnalytics> => {
    console.log(`Fetching analytics for survey ID: ${surveyId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSurveyAnalytics;
};
// --- END SURVEYS MOCK API ---


// --- NOTIFICATIONS MOCK API ---
export const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'leave',
        title: 'طلب إجازة جديد',
        description: 'قدم جون دو طلب إجازة سنوية.',
        time: 'منذ 5 دقائق',
        read: false
    },
    {
        id: '2',
        type: 'document',
        title: 'مستند على وشك الانتهاء',
        description: 'جواز سفر جين سميث سينتهي خلال 30 يومًا.',
        time: 'منذ ساعة',
        read: false
    },
    {
        id: '3',
        type: 'recruitment',
        title: 'مرشح جديد',
        description: 'تقدم أحمد محمود لوظيفة مهندس واجهات أمامية.',
        time: 'منذ 3 ساعات',
        read: true
    },
    {
        id: '4',
        type: 'system',
        title: 'تحديث النظام',
        description: 'تم تحديث سياسات الإجازات لتتوافق مع القانون الجديد.',
        time: 'منذ يوم',
        read: true
    }
];

export const getNotifications = async (): Promise<Notification[]> => {
    console.log("Fetching notifications...");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockNotifications;
};
// --- END NOTIFICATIONS MOCK ---

// --- RECOGNITION MOCK API ---
const mockKudos: Kudo[] = [
    {
        id: 'kudo1',
        sender: mockEmployees.find(e => e.id === 'EMP002')!, // Jane Smith
        receiver: mockEmployees.find(e => e.id === 'EMP008')!, // سمير صالح
        message: 'شكرًا لك على جهودك الاستثنائية في حملة الربع الثاني، لقد كانت نتائجك مذهلة!',
        values: [CompanyValue.EXCELLENCE, CompanyValue.CUSTOMER_FOCUS],
        timestamp: 'منذ ساعتين',
        reactions: { count: 5 }
    },
    {
        id: 'kudo2',
        sender: mockEmployees.find(e => e.id === 'EMP001')!, // John Doe
        receiver: mockEmployees.find(e => e.id === 'EMP011')!, // David Lee
        message: 'مساهمتك في حل مشكلة قاعدة البيانات كانت حاسمة. عمل رائع في الحفاظ على استقرار النظام.',
        values: [CompanyValue.TEAMWORK],
        timestamp: 'منذ 5 ساعات',
        reactions: { count: 12 }
    },
    {
        id: 'kudo3',
        sender: mockEmployees.find(e => e.id === 'EMP005')!, // Alex Chen
        receiver: mockEmployees.find(e => e.id === 'EMP016')!, // Laura Martinez
        message: 'شكرًا لمساعدتي في فهم أساسيات Figma. أنتِ دائمًا على استعداد للمساعدة.',
        values: [CompanyValue.TEAMWORK],
        timestamp: 'بالأمس',
        reactions: { count: 3 }
    }
];

const mockMilestones: Milestone[] = [
    { id: 'mile1', employee: mockEmployees.find(e => e.id === 'EMP004')!, type: 'ANNIVERSARY', date: 'July 28, 2024', years: 3 },
    { id: 'mile2', employee: mockEmployees.find(e => e.id === 'EMP003')!, type: 'BIRTHDAY', date: 'July 30' },
];

export const getKudosFeed = async (): Promise<Kudo[]> => {
    console.log("Fetching kudos feed...");
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockKudos;
}

export const getUpcomingMilestones = async (): Promise<Milestone[]> => {
    console.log("Fetching upcoming milestones...");
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockMilestones;
}

export const sendKudo = async (kudoData: Omit<Kudo, 'id'|'timestamp'|'reactions'>): Promise<Kudo> => {
    console.log("Sending a new kudo...");
    const newKudo: Kudo = {
        id: `kudo${Date.now()}`,
        ...kudoData,
        timestamp: 'الآن',
        reactions: { count: 0 }
    };
    mockKudos.unshift(newKudo);
    await new Promise(resolve => setTimeout(resolve, 500));
    return newKudo;
}
// --- END RECOGNITION MOCK ---


// Future API functions can be added here, for example:
// export const createEmployee = async (employeeData: Omit<Employee, 'id'>): Promise<Employee> => { ... };
// export const updateEmployee = async (id: string, updates: Partial<Employee>): Promise<Employee> => { ... };