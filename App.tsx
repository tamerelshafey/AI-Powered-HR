



import React, { Suspense, lazy } from 'react';
// FIX: Switched to namespace import for react-router-dom to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import Layout from './components/Layout';
import { UserProvider, useUser } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import { I18nProvider } from './context/I18nContext';

// Lazily import all page components to improve initial load time
const Dashboard = lazy(() => import('./components/Dashboard'));
const EmployeesPage = lazy(() => import('./pages/employees/index.tsx'));
const EmployeeProfilePage = lazy(() => import('./pages/employees/profile/index.tsx'));
const AttendancePage = lazy(() => import('./pages/attendance/index.tsx'));
const LeavesPage = lazy(() => import('./pages/leaves/index.tsx'));
const JobTitlesPage = lazy(() => import('./pages/job_titles/index.tsx'));
const PayrollPage = lazy(() => import('./pages/payroll/index.tsx'));
const DocumentsPage = lazy(() => import('./pages/documents/index.tsx'));
const RecruitmentPage = lazy(() => import('./pages/recruitment/index.tsx'));
const PerformancePage = lazy(() => import('./pages/performance/index.tsx'));
const LearningPage = lazy(() => import('./pages/learning/index.tsx'));
const OnboardingOffboardingPage = lazy(() => import('./pages/onboarding_offboarding/index.tsx'));
const AssetsPage = lazy(() => import('./pages/assets/index.tsx'));
const SupportTicketsPage = lazy(() => import('./pages/support_tickets/index.tsx'));
const HelpCenterPage = lazy(() => import('./pages/help_center/index.tsx'));
const ReportsPage = lazy(() => import('./pages/reports/index.tsx'));
const SettingsPage = lazy(() => import('./pages/settings/index.tsx'));
const EmployeePortalPage = lazy(() => import('./pages/portal/index.tsx'));
const DepartmentsPage = lazy(() => import('./pages/departments/index.tsx'));
const BranchesPage = lazy(() => import('./pages/branches/index.tsx'));
const OrgChartPage = lazy(() => import('./pages/org_chart/index.tsx'));
const SurveysPage = lazy(() => import('./pages/surveys/index.tsx'));
const RecognitionPage = lazy(() => import('./pages/recognition/index.tsx'));

const AppRoutes: React.FC = () => {
  const { loading } = useUser();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }
  
  return (
    <ReactRouterDOM.Routes>
      <ReactRouterDOM.Route
        path="/portal"
        element={<EmployeePortalPage />}
      />
      <ReactRouterDOM.Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <ReactRouterDOM.Route index element={<ReactRouterDOM.Navigate to="/dashboard" replace />} />
        <ReactRouterDOM.Route path="dashboard" element={<Dashboard />} />
        <ReactRouterDOM.Route path="reports" element={<ReportsPage />} />
        <ReactRouterDOM.Route path="employees" element={<EmployeesPage />} />
        <ReactRouterDOM.Route path="employees/:employeeId" element={<EmployeeProfilePage />} /> 
        <ReactRouterDOM.Route path="org-chart" element={<OrgChartPage />} />
        <ReactRouterDOM.Route path="departments" element={<DepartmentsPage />} />
        <ReactRouterDOM.Route path="branches" element={<BranchesPage />} />
        <ReactRouterDOM.Route path="attendance" element={<AttendancePage />} />
        <ReactRouterDOM.Route path="leaves" element={<LeavesPage />} />
        <ReactRouterDOM.Route path="job-titles" element={<JobTitlesPage />} />
        <ReactRouterDOM.Route path="payroll" element={<PayrollPage />} />
        <ReactRouterDOM.Route path="documents" element={<DocumentsPage />} />
        <ReactRouterDOM.Route path="recruitment" element={<RecruitmentPage />} />
        <ReactRouterDOM.Route path="performance" element={<PerformancePage />} />
        <ReactRouterDOM.Route path="learning" element={<LearningPage />} />
        <ReactRouterDOM.Route path="onboarding-offboarding" element={<OnboardingOffboardingPage />} />
        <ReactRouterDOM.Route path="assets" element={<AssetsPage />} />
        <ReactRouterDOM.Route path="recognition" element={<RecognitionPage />} />
        <ReactRouterDOM.Route path="surveys" element={<SurveysPage />} />
        <ReactRouterDOM.Route path="support-tickets" element={<SupportTicketsPage />} />
        <ReactRouterDOM.Route path="help-center" element={<HelpCenterPage />} />
        <ReactRouterDOM.Route path="settings" element={<SettingsPage />} />
      </ReactRouterDOM.Route>
    </ReactRouterDOM.Routes>
  );
};


const App: React.FC = () => {
  return (
    <I18nProvider>
      <ReactRouterDOM.HashRouter>
        <UserProvider>
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <AppRoutes />
          </Suspense>
        </UserProvider>
      </ReactRouterDOM.HashRouter>
    </I18nProvider>
  );
};

export default App;