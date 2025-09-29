

import React, { Suspense, lazy, createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { UserProvider, useUser } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import { I18nProvider } from './context/I18nContext';
import { ActiveModules, ModuleContextType, OptionalModuleKey } from './types';

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
const MissionsPage = lazy(() => import('./pages/missions/index.tsx'));
const SuccessionPage = lazy(() => import('./pages/succession/index.tsx'));
const ExpensesPage = lazy(() => import('./pages/expenses/index.tsx'));
const WorkforcePlanningPage = lazy(() => import('./pages/workforce_planning/index.tsx'));

// --- Module Management Context ---

const initialModules: ActiveModules = {
    payroll: true,
    documents: false,
    recruitment: true,
    performance: false,
    learning: true,
    onboarding: true,
    assets: false,
    support: true,
    help_center: true,
    recognition: false,
    surveys: false,
    missions: true,
    succession: false,
    expenses: true,
    workforce_planning: true,
};

const DEPENDENCIES: Partial<Record<OptionalModuleKey, OptionalModuleKey[]>> = {
  onboarding: ['recruitment'],
  assets: ['onboarding'],
  help_center: ['support'],
};

const DEPENDENTS: Partial<Record<OptionalModuleKey, OptionalModuleKey[]>> = {
  recruitment: ['onboarding', 'assets'],
  onboarding: ['assets'],
  support: ['help_center'],
};

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

const ModuleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeModules, setActiveModules] = useState<ActiveModules>(() => {
        try {
            const stored = localStorage.getItem('activeModules');
            return stored ? JSON.parse(stored) : initialModules;
        } catch {
            return initialModules;
        }
    });

    const [dependencyConfirmation, setDependencyConfirmation] = useState({
        isOpen: false,
        moduleToDisable: null as OptionalModuleKey | null,
        dependentsToDisable: [] as OptionalModuleKey[],
    });

    useEffect(() => {
        localStorage.setItem('activeModules', JSON.stringify(activeModules));
    }, [activeModules]);

    const toggleModule = (moduleKey: OptionalModuleKey) => {
        const isCurrentlyActive = activeModules[moduleKey];

        if (!isCurrentlyActive) { // Enabling a module
            const toEnable = new Set<OptionalModuleKey>([moduleKey]);
            const queue: OptionalModuleKey[] = [moduleKey];

            while(queue.length > 0) {
                const current = queue.shift()!;
                const deps = DEPENDENCIES[current];
                if (deps) {
                    deps.forEach(dep => {
                        if (!activeModules[dep]) {
                            toEnable.add(dep);
                            queue.push(dep);
                        }
                    });
                }
            }
            setActiveModules(prev => ({...prev, ...Object.fromEntries(Array.from(toEnable).map(k => [k, true]))}));
        } else { // Disabling a module
            const dependents = DEPENDENTS[moduleKey] || [];
            const activeDependents = dependents.filter(d => activeModules[d]);

            if (activeDependents.length > 0) {
                setDependencyConfirmation({
                    isOpen: true,
                    moduleToDisable: moduleKey,
                    dependentsToDisable: activeDependents,
                });
            } else {
                setActiveModules(prev => ({ ...prev, [moduleKey]: false }));
            }
        }
    };
    
    const confirmDisable = () => {
        if (dependencyConfirmation.moduleToDisable) {
             const toDisable = [dependencyConfirmation.moduleToDisable, ...dependencyConfirmation.dependentsToDisable];
             setActiveModules(prev => ({...prev, ...Object.fromEntries(toDisable.map(k => [k, false]))}));
        }
        cancelDisable();
    };

    const cancelDisable = () => {
        setDependencyConfirmation({ isOpen: false, moduleToDisable: null, dependentsToDisable: [] });
    };

    return (
        <ModuleContext.Provider value={{ activeModules, toggleModule, dependencyConfirmation, confirmDisable, cancelDisable }}>
            {children}
        </ModuleContext.Provider>
    );
};

export const useModules = (): ModuleContextType => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error('useModules must be used within a ModuleProvider');
  }
  return context;
};

// --- App Routes & Main Component ---

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
        <Route path="missions" element={<MissionsPage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="recognition" element={<RecognitionPage />} />
        <Route path="surveys" element={<SurveysPage />} />
        <Route path="succession" element={<SuccessionPage />} />
        <Route path="workforce-planning" element={<WorkforcePlanningPage />} />
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
          <ModuleProvider>
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <AppRoutes />
            </Suspense>
          </ModuleProvider>
        </UserProvider>
      </HashRouter>
    </I18nProvider>
  );
};

export default App;
