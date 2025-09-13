
import React, { useState, lazy, Suspense } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner';

// Lazily load components for each settings tab
const GeneralSettings = lazy(() => import('./GeneralSettings'));
const UserManagement = lazy(() => import('./UserManagement'));
const SettingsPlaceholder = lazy(() => import('./SettingsPlaceholder'));
const LeaveSettings = lazy(() => import('./LeaveSettings'));
const PayrollSettings = lazy(() => import('./PayrollSettings'));
const AttendanceSettings = lazy(() => import('./AttendanceSettings'));


type ActiveTab = 'general' | 'users' | 'payroll' | 'leaves' | 'attendance' | 'integrations';

interface NavItem {
    id: ActiveTab;
    name: string;
    icon: string;
}

const navItems: NavItem[] = [
    { id: 'general', name: 'عامة', icon: 'fas fa-cog' },
    { id: 'users', name: 'إدارة المستخدمين', icon: 'fas fa-users-cog' },
    { id: 'payroll', name: 'الرواتب', icon: 'fas fa-money-bill-wave' },
    { id: 'leaves', name: 'الإجازات', icon: 'fas fa-calendar-alt' },
    { id: 'attendance', name: 'الحضور', icon: 'fas fa-clock' },
    { id: 'integrations', name: 'التكامل', icon: 'fas fa-plug' },
];

const SettingsLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('general');

    const renderContent = () => {
        switch (activeTab) {
            case 'general':
                return <GeneralSettings />;
            case 'users':
                return <UserManagement />;
            case 'payroll':
                return <PayrollSettings />;
            case 'leaves':
                return <LeaveSettings />;
            case 'attendance':
                return <AttendanceSettings />;
            case 'integrations':
                return <SettingsPlaceholder title="التكامل مع الأنظمة الأخرى" icon="fas fa-plug" description="ربط النظام مع أنظمة خارجية مثل ERPNext لتسهيل تدفق البيانات." />;
            default:
                return <GeneralSettings />;
        }
    };

    const SuspenseFallback = () => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[60vh] flex items-center justify-center">
            <LoadingSpinner />
        </div>
    );

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">الإعدادات والتهيئة</h2>
                <p className="text-gray-600">إدارة وتخصيص إعدادات نظام الموارد البشرية.</p>
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8">
                <aside className="w-full md:w-64 flex-shrink-0 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <nav className="space-y-1" role="tablist" aria-label="Settings navigation">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                id={`${item.id}-tab`}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg text-start transition-colors duration-200 ${
                                    activeTab === item.id
                                        ? 'bg-blue-50 text-blue-600 font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                                role="tab"
                                aria-selected={activeTab === item.id}
                                aria-controls={`${item.id}-panel`}
                            >
                                <i className={`${item.icon} w-6 text-center text-lg`}></i>
                                <span>{item.name}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                <main className="flex-1 w-full" id={`${activeTab}-panel`} role="tabpanel" aria-labelledby={`${activeTab}-tab`}>
                   <Suspense fallback={<SuspenseFallback />}>
                        {renderContent()}
                    </Suspense>
                </main>
            </div>
        </div>
    );
};

export default SettingsLayout;