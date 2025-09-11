
import React, { useState } from 'react';
import StatsCard from './dashboard/StatsCard';
import ModuleCard from './dashboard/ModuleCard';
import AiInsightCard from './dashboard/AiInsightCard';
import QuickActionButton from './dashboard/QuickActionButton';
import { useUser } from '../context/UserContext';
import RoleBanner from './dashboard/RoleBanner';
import { useI18n } from '../context/I18nContext';

const initialModules = {
    payroll: true,
    documents: false,
    recruitment: true,
    performance: false,
    learning: true,
    onboarding: false,
    assets: false,
    support: true,
};

const Dashboard: React.FC = () => {
    const { currentUser } = useUser();
    const { t } = useI18n();
    const [optionalModules, setOptionalModules] = useState(initialModules);

    const handleToggleModule = (moduleKey: keyof typeof initialModules) => {
        setOptionalModules(prev => ({ ...prev, [moduleKey]: !prev[moduleKey] }));
    };

    const coreModules = [
        { nameKey: 'dashboard.module.employees', descriptionKey: 'dashboard.module.employeesDesc', icon: 'fas fa-users' },
        { nameKey: 'dashboard.module.attendance', descriptionKey: 'dashboard.module.attendanceDesc', icon: 'fas fa-clock' },
        { nameKey: 'dashboard.module.leaves', descriptionKey: 'dashboard.module.leavesDesc', icon: 'fas fa-calendar-alt' },
        { nameKey: 'dashboard.module.jobTitles', descriptionKey: 'dashboard.module.jobTitlesDesc', icon: 'fas fa-sitemap' },
    ];

    const optionalModuleConfig = [
        { key: 'payroll', nameKey: 'dashboard.module.payroll', descriptionKey: 'dashboard.module.payrollDesc', icon: 'fas fa-money-bill-wave' },
        { key: 'documents', nameKey: 'dashboard.module.documents', descriptionKey: 'dashboard.module.documentsDesc', icon: 'fas fa-file-alt' },
        { key: 'recruitment', nameKey: 'dashboard.module.recruitment', descriptionKey: 'dashboard.module.recruitmentDesc', icon: 'fas fa-user-plus' },
        { key: 'performance', nameKey: 'dashboard.module.performance', descriptionKey: 'dashboard.module.performanceDesc', icon: 'fas fa-chart-line' },
        { key: 'learning', nameKey: 'dashboard.module.learning', descriptionKey: 'dashboard.module.learningDesc', icon: 'fas fa-graduation-cap' },
        { key: 'onboarding', nameKey: 'dashboard.module.onboarding', descriptionKey: 'dashboard.module.onboardingDesc', icon: 'fas fa-door-open' },
        { key: 'assets', nameKey: 'dashboard.module.assets', descriptionKey: 'dashboard.module.assetsDesc', icon: 'fas fa-laptop' },
        { key: 'support', nameKey: 'dashboard.module.support', descriptionKey: 'dashboard.module.supportDesc', icon: 'fas fa-headset' },
    ];
    
    return (
        <div>
            <RoleBanner role={currentUser.role} />
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('dashboard.welcome', { name: currentUser.name.split(' ')[0] })}</h2>
                <p className="text-gray-600">{t('dashboard.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatsCard icon="fas fa-users" labelKey="dashboard.totalEmployees" value="247" change={`↗ +12 ${t('dashboard.thisMonth')}`} changeColor="text-green-600" iconBgColor="bg-blue-100" iconColor="text-blue-600" />
                <StatsCard icon="fas fa-check-circle" labelKey="dashboard.presentToday" value="231" change={t('dashboard.attendancePercentage', {value: 93.5})} changeColor="text-green-600" iconBgColor="bg-green-100" iconColor="text-green-600" />
                <StatsCard icon="fas fa-clock" labelKey="dashboard.pendingRequests" value="18" change={t('dashboard.requiresAttention')} changeColor="text-orange-600" iconBgColor="bg-orange-100" iconColor="text-orange-600" />
                <StatsCard icon="fas fa-brain" labelKey="dashboard.aiInsights" value="7" change={t('dashboard.newRecommendations')} changeColor="text-purple-600" iconBgColor="bg-purple-100" iconColor="text-purple-600" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('dashboard.systemModules')}</h3>
                    <p className="text-gray-600 text-sm">{t('dashboard.systemModulesDesc')}</p>
                </div>
                
                <div className="p-6">
                    <div className="mb-6">
                        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                            <i className="fas fa-star text-yellow-500 me-2"></i>
                            {t('dashboard.coreModules')}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {coreModules.map(mod => <ModuleCard key={mod.nameKey} name={t(mod.nameKey)} description={t(mod.descriptionKey)} icon={mod.icon} isCore />)}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                            <i className="fas fa-toggle-on text-blue-500 me-2"></i>
                            {t('dashboard.optionalModules')}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {optionalModuleConfig.map(mod => (
                                <ModuleCard 
                                    key={mod.key}
                                    name={t(mod.nameKey)}
                                    description={t(mod.descriptionKey)}
                                    icon={mod.icon}
                                    isActive={optionalModules[mod.key as keyof typeof initialModules]}
                                    onToggle={() => handleToggleModule(mod.key as keyof typeof initialModules)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <i className="fas fa-brain text-purple-600 me-2"></i>
                            {t('dashboard.aiInsightsTitle')}
                        </h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <AiInsightCard icon="fas fa-lightbulb" color="blue" title={t('dashboard.insight.attendance')} description={t('dashboard.insight.attendanceDesc')}/>
                        <AiInsightCard icon="fas fa-chart-line" color="green" title={t('dashboard.insight.performance')} description={t('dashboard.insight.performanceDesc')}/>
                        <AiInsightCard icon="fas fa-exclamation-triangle" color="orange" title={t('dashboard.insight.leaves')} description={t('dashboard.insight.leavesDesc')}/>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.quickActions')}</h3>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <QuickActionButton icon="fas fa-user-plus" color="text-blue-600" labelKey="dashboard.action.addEmployee" />
                        <QuickActionButton icon="fas fa-file-export" color="text-green-600" labelKey="dashboard.action.exportReport" />
                        <QuickActionButton icon="fas fa-calendar-check" color="text-purple-600" labelKey="dashboard.action.approveLeaves" />
                        <QuickActionButton icon="fas fa-cog" color="text-gray-600" labelKey="dashboard.action.systemSettings" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
