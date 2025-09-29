
import React, { useState, useEffect } from 'react';
import { Employee, EmployeeProfileOverviewData, EmployeeActivity, CalculatedLeaveBalance } from '../../../../types';
import { getEmployeeProfileOverviewData, getEmployeeActivities } from '../../../../services/api';
import { calculateLeaveBalances } from '../../../../services/leaveCalculator';
import StatsCard from '../../../../components/dashboard/StatsCard';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import ActivityTimeline from './ActivityTimeline';
import { useI18n } from '../../../../context/I18nContext';

interface OverviewTabProps {
  employee: Employee;
}

const InfoItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800 break-words">{value}</p>
    </div>
);

const LeaveBalanceBar: React.FC<{ title: string; used: number; total: number; color: string }> = ({ title, used, total, color }) => {
    const percentage = total > 0 ? (used / total) * 100 : 0;
    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{title}</span>
                <span className="text-sm text-gray-600">{used}/{total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

const OverviewTab: React.FC<OverviewTabProps> = ({ employee }) => {
    const [overviewData, setOverviewData] = useState<EmployeeProfileOverviewData | null>(null);
    const [activities, setActivities] = useState<EmployeeActivity[]>([]);
    const [leaveBalances, setLeaveBalances] = useState<CalculatedLeaveBalance[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useI18n();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [overview, activityData, balancesData] = await Promise.all([
                    getEmployeeProfileOverviewData(employee.id),
                    getEmployeeActivities(employee.id),
                    calculateLeaveBalances(employee)
                ]);
                setOverviewData(overview);
                setActivities(activityData);
                setLeaveBalances(balancesData);
            } catch (error) {
                console.error("Failed to fetch overview data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [employee]);

    if (loading) {
        return <div className="h-96"><LoadingSpinner /></div>;
    }

    if (!overviewData) {
        return <p>Could not load overview data.</p>;
    }
    
    const kpis = overviewData.kpis;
    const personalInfo = [
        { label: t('profile.info.email'), value: `${employee.firstName.toLowerCase()}@bokra.hr` },
        { label: t('profile.info.phone'), value: '+966 50 123 4567' },
        { label: t('profile.info.startDate'), value: employee.hireDate },
        { label: t('profile.info.manager'), value: 'سارة جونسون' },
    ];

    const jobInfo = [
        { label: t('profile.info.userRole'), value: t(`enum.userRole.${employee.role}`) },
        { label: t('profile.info.contractType'), value: 'دوام كامل' },
        { label: t('profile.info.branch'), value: employee.branch },
        { label: t('profile.info.employeeId'), value: employee.id },
    ];


    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard icon="fas fa-user-check" labelKey="profile.kpi.attendanceRate" value={`${kpis.attendanceRate}%`} iconBgColor="bg-green-100" iconColor="text-green-600" />
                <StatsCard icon="fas fa-star" labelKey="profile.kpi.performanceScore" value={`${kpis.performanceScore}/5`} iconBgColor="bg-yellow-100" iconColor="text-yellow-600" />
                <StatsCard icon="fas fa-bullseye" labelKey="profile.kpi.goalsCompleted" value={`${kpis.goalsCompleted}/${kpis.goalsTotal}`} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
                <StatsCard icon="fas fa-calendar-day" labelKey="profile.kpi.leaveDays" value={`${kpis.leaveTaken}/${kpis.leaveTotal}`} iconBgColor="bg-orange-100" iconColor="text-orange-600" />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Info Card */}
                    <div className="bg-white rounded-lg border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <i className="fas fa-id-card text-gray-500 me-2"></i>
                            {t('profile.info.title')}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border-b pb-4">
                           {personalInfo.map(item => <InfoItem key={item.label} {...item} />)}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 pt-4">
                           {jobInfo.map(item => <InfoItem key={item.label} {...item} />)}
                        </div>
                    </div>
                    {/* Goals Card */}
                    <div className="bg-white rounded-lg border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profile.goals.title')}</h3>
                        <div className="space-y-4">
                            {overviewData.goals.length > 0 ? overviewData.goals.map(goal => (
                                <div key={goal.id}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-700">{goal.title}</span>
                                        <span className="text-sm font-bold text-blue-600">{goal.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-sm text-gray-500">{t('profile.goals.none')}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Leave Balance Card */}
                     <div className="bg-white rounded-lg border p-6">
                         <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('profile.leave.title')}</h3>
                         <div className="space-y-4">
                             {leaveBalances.filter(b => b.type === 'VACATION' || b.type === 'SICK').map(balance => (
                                <LeaveBalanceBar 
                                    key={balance.type}
                                    title={t(balance.nameKey)} 
                                    used={balance.used} 
                                    total={balance.total} 
                                    color={balance.color}
                                />
                             ))}
                         </div>
                    </div>
                    {/* Activity Timeline Card */}
                    <div className="bg-white rounded-lg border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {t('profile.activity.title')}
                        </h3>
                        <ActivityTimeline activities={activities} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewTab;
