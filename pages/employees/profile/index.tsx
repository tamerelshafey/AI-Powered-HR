
import React, { useState, useEffect, lazy, Suspense } from 'react';
// FIX: Switched to namespace import for react-router-dom to resolve module resolution errors.
import * as ReactRouterDOM from 'react-router-dom';
import { Employee } from '../../../types';
import { getEmployeeById } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ProfileHeader from './components/ProfileHeader';

// Lazily load tab components to improve initial page load performance
const OverviewTab = lazy(() => import('./components/OverviewTab'));
const DocumentsTab = lazy(() => import('./components/DocumentsTab'));
const AssetsTab = lazy(() => import('./components/AssetsTab'));
const PerformanceTab = lazy(() => import('./components/PerformanceTab'));
const LearningTab = lazy(() => import('./components/LearningTab'));
const LeaveHistoryTab = lazy(() => import('./components/LeaveHistoryTab'));


type ActiveTab = 'overview' | 'documents' | 'assets' | 'performance' | 'learning' | 'leave';

const EmployeeProfilePage: React.FC = () => {
    const { employeeId } = ReactRouterDOM.useParams<{ employeeId: string }>();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

    useEffect(() => {
        if (!employeeId) {
            setError("Employee ID is missing.");
            setLoading(false);
            return;
        }

        const fetchEmployee = async () => {
            setLoading(true);
            try {
                const data = await getEmployeeById(employeeId);
                if (data) {
                    setEmployee(data);
                } else {
                    setError("Employee not found.");
                }
            } catch (err) {
                setError("Failed to fetch employee data.");
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [employeeId]);
    
    const TabButton: React.FC<{ tab: ActiveTab; label: string; icon: string }> = ({ tab, label, icon }) => (
        <button
            id={`${tab}-tab`}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center space-x-2 space-x-reverse px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab}-panel`}
        >
            <i className={icon}></i>
            <span>{label}</span>
        </button>
    );


    if (loading) {
        return <LoadingSpinner fullScreen={false} />;
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <i className="fas fa-exclamation-triangle text-5xl text-red-500 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700">{error}</h3>
                <ReactRouterDOM.Link to="/employees" className="mt-4 inline-block text-blue-600 hover:underline">
                    العودة إلى قائمة الموظفين
                </ReactRouterDOM.Link>
            </div>
        );
    }

    if (!employee) {
        return null;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab employee={employee} />;
            case 'documents':
                return <DocumentsTab employee={employee} />;
            case 'assets':
                return <AssetsTab employee={employee} />;
            case 'performance':
                return <PerformanceTab employee={employee} />;
            case 'learning':
                return <LearningTab employee={employee} />;
            case 'leave':
                return <LeaveHistoryTab employee={employee} />;
            default:
                return (
                    <div className="text-center py-12 text-gray-500">
                        <i className="fas fa-layer-group text-4xl mb-3"></i>
                        <p>محتوى تبويب "{activeTab}" سيكون متاحًا قريبًا.</p>
                    </div>
                );
        }
    }


    return (
        <div>
            <ProfileHeader employee={employee} />
            
            <div className="border-b border-gray-200 bg-white rounded-t-lg shadow-sm mt-8">
                <nav className="flex space-x-4 space-x-reverse px-6 overflow-x-auto" role="tablist" aria-label="Employee Profile Tabs">
                    <TabButton tab="overview" label="نظرة عامة" icon="fas fa-user-circle" />
                    <TabButton tab="documents" label="المستندات" icon="fas fa-file-alt" />
                    <TabButton tab="assets" label="الأصول" icon="fas fa-laptop" />
                    <TabButton tab="performance" label="الأداء" icon="fas fa-chart-line" />
                    <TabButton tab="learning" label="التعلم والتطوير" icon="fas fa-graduation-cap" />
                    <TabButton tab="leave" label="سجل الإجازات" icon="fas fa-calendar-alt" />
                </nav>
            </div>
            
            <div id={`${activeTab}-panel`} role="tabpanel" aria-labelledby={`${activeTab}-tab`} className="bg-white p-6 rounded-b-lg shadow-sm min-h-[50vh]">
                <Suspense fallback={<LoadingSpinner />}>
                    {renderContent()}
                </Suspense>
            </div>
        </div>
    );
};

export default EmployeeProfilePage;