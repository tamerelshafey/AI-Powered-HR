
import React from 'react';
import StatsCard from './dashboard/StatsCard';
import ModuleCard from './dashboard/ModuleCard';
import AiInsightCard from './dashboard/AiInsightCard';
import QuickActionButton from './dashboard/QuickActionButton';
import { useUser } from '../context/UserContext';
import RoleBanner from './dashboard/RoleBanner';
import { useI18n } from '../context/I18nContext';
import { useModules } from '../App';
import { UserRole, OptionalModuleKey } from '../types';
import Modal, { ModalBody, ModalFooter } from './Modal';


interface DependencyConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    moduleToDisable: OptionalModuleKey | null;
    dependentsToDisable: OptionalModuleKey[];
    moduleNames: Record<OptionalModuleKey, string>;
}

const DependencyConfirmationModal: React.FC<DependencyConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    moduleToDisable,
    dependentsToDisable,
    moduleNames,
}) => {
    if (!isOpen || !moduleToDisable) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
             <ModalBody>
                <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 text-yellow-500 rounded-full mx-auto flex items-center justify-center mb-4">
                        <i className="fas fa-exclamation-triangle text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">تأكيد تعطيل الوحدة</h3>
                    <p className="text-gray-600 mt-2 text-sm">
                        إن تعطيل وحدة "{moduleNames[moduleToDisable]}" يتطلب تعطيل الوحدات الأخرى التي تعتمد عليها.
                    </p>
                    <div className="mt-4 text-start bg-gray-50 p-3 rounded-lg border">
                         <p className="text-sm font-medium text-gray-800">سيتم تعطيل الوحدات التالية أيضًا:</p>
                         <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                             {dependentsToDisable.map(key => (
                                 <li key={key}>{moduleNames[key]}</li>
                             ))}
                         </ul>
                    </div>
                     <p className="text-gray-600 mt-4 text-sm">
                        هل أنت متأكد أنك تريد المتابعة؟
                    </p>
                </div>
            </ModalBody>
            <ModalFooter>
                 <div className="flex justify-center space-x-4 space-x-reverse">
                    <button type="button" onClick={onClose} className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 font-medium">
                        إلغاء
                    </button>
                    <button type="button" onClick={handleConfirm} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                        نعم، قم بالتعطيل
                    </button>
                </div>
            </ModalFooter>
        </Modal>
    );
};


const Dashboard: React.FC = () => {
    const { currentUser } = useUser();
    const { t } = useI18n();
    const { activeModules, toggleModule, dependencyConfirmation, confirmDisable, cancelDisable } = useModules();

    const isSuperAdmin = currentUser.role === UserRole.SYSTEM_ADMINISTRATOR;

    const coreModules = [
        { nameKey: 'dashboard.module.employees', descriptionKey: 'dashboard.module.employeesDesc', icon: 'fas fa-users' },
        { nameKey: 'dashboard.module.attendance', descriptionKey: 'dashboard.module.attendanceDesc', icon: 'fas fa-clock' },
        { nameKey: 'dashboard.module.leaves', descriptionKey: 'dashboard.module.leavesDesc', icon: 'fas fa-calendar-alt' },
        { nameKey: 'dashboard.module.jobTitles', descriptionKey: 'dashboard.module.jobTitlesDesc', icon: 'fas fa-sitemap' },
    ];

    const optionalModuleConfig: { key: OptionalModuleKey, nameKey: string, descriptionKey: string, icon: string }[] = [
        { key: 'payroll', nameKey: 'dashboard.module.payroll', descriptionKey: 'dashboard.module.payrollDesc', icon: 'fas fa-money-bill-wave' },
        { key: 'documents', nameKey: 'dashboard.module.documents', descriptionKey: 'dashboard.module.documentsDesc', icon: 'fas fa-file-alt' },
        { key: 'recruitment', nameKey: 'dashboard.module.recruitment', descriptionKey: 'dashboard.module.recruitmentDesc', icon: 'fas fa-user-plus' },
        { key: 'performance', nameKey: 'dashboard.module.performance', descriptionKey: 'dashboard.module.performanceDesc', icon: 'fas fa-chart-line' },
        { key: 'learning', nameKey: 'dashboard.module.learning', descriptionKey: 'dashboard.module.learningDesc', icon: 'fas fa-graduation-cap' },
        { key: 'onboarding', nameKey: 'dashboard.module.onboarding', descriptionKey: 'dashboard.module.onboardingDesc', icon: 'fas fa-door-open' },
        { key: 'assets', nameKey: 'dashboard.module.assets', descriptionKey: 'dashboard.module.assetsDesc', icon: 'fas fa-laptop-house' },
        { key: 'missions', nameKey: 'dashboard.module.missions', descriptionKey: 'dashboard.module.missionsDesc', icon: 'fas fa-tasks' },
        { key: 'support', nameKey: 'dashboard.module.support', descriptionKey: 'dashboard.module.supportDesc', icon: 'fas fa-headset' },
        { key: 'help_center', nameKey: 'dashboard.module.help_center', descriptionKey: 'dashboard.module.help_centerDesc', icon: 'fas fa-question-circle' },
        { key: 'recognition', nameKey: 'dashboard.module.recognition', descriptionKey: 'dashboard.module.recognitionDesc', icon: 'fas fa-award' },
        { key: 'surveys', nameKey: 'dashboard.module.surveys', descriptionKey: 'dashboard.module.surveysDesc', icon: 'fas fa-poll' },
    ];
    
    const moduleNames = optionalModuleConfig.reduce((acc, mod) => {
        acc[mod.key] = t(mod.nameKey);
        return acc;
    }, {} as Record<OptionalModuleKey, string>);

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
                                    isActive={activeModules[mod.key]}
                                    onToggle={() => toggleModule(mod.key)}
                                    isToggleable={isSuperAdmin}
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
            
            <DependencyConfirmationModal
                isOpen={dependencyConfirmation.isOpen}
                onClose={cancelDisable}
                onConfirm={confirmDisable}
                moduleToDisable={dependencyConfirmation.moduleToDisable}
                dependentsToDisable={dependencyConfirmation.dependentsToDisable}
                moduleNames={moduleNames}
            />
        </div>
    );
};

export default Dashboard;
