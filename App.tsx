
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { UserProvider, useUser } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import { I18nProvider } from './context/I18nContext';

// Lazily import all page components to improve initial load time
const LoginPage = lazy(() => import('./pages/LoginPage.tsx'));
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
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/portal"
        element={<EmployeePortalPage />}
      />
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="employees/:employeeId" element={<EmployeeProfilePage />} /> 
        <Route path="org-chart" element={<OrgChartPage />} />
        <Route path="departments" element={<DepartmentsPage />} />
        <Route path="branches" element={<BranchesPage />} />
        <Route path="attendance" element={<AttendancePage />} />
        <Route path="leaves" element={<LeavesPage />} />
        <Route path="job-titles" element={<JobTitlesPage />} />
        <Route path="payroll" element={<PayrollPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="recruitment" element={<RecruitmentPage />} />
        <Route path="performance" element={<PerformancePage />} />
        <Route path="learning" element={<LearningPage />} />
        <Route path="onboarding-offboarding" element={<OnboardingOffboardingPage />} />
        <Route path="assets" element={<AssetsPage />} />
        <Route path="recognition" element={<RecognitionPage />} />
        <Route path="surveys" element={<SurveysPage />} />
        <Route path="support-tickets" element={<SupportTicketsPage />} />
        <Route path="help-center" element={<HelpCenterPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
};


const App: React.FC = () => {
  return (
    <I18nProvider>
      <HashRouter>
        <UserProvider>
          <Suspense fallback={<LoadingSpinner fullScreen />}>
            <AppRoutes />
          </Suspense>
        </UserProvider>
      </HashRouter>
    </I18nProvider>
  );
};

export default App;