
import React from 'react';
import { useI18n } from '../../../context/I18nContext';

const WorkflowStep: React.FC<{ icon: string; titleKey: string; descriptionKey: string; status: 'completed' | 'active' | 'pending' }> = ({ icon, titleKey, descriptionKey, status }) => {
    const { t } = useI18n();
    const statusClasses = {
        completed: { bg: 'bg-green-50', iconBg: 'bg-green-500', text: 'text-green-600' },
        active: { bg: 'bg-blue-50', iconBg: 'bg-blue-500', text: 'text-blue-600' },
        pending: { bg: 'bg-gray-50', iconBg: 'bg-gray-400', text: 'text-gray-500' },
    };
    
    const currentStatus = statusClasses[status];
    const statusTextKey = `page.leaves.workflow.status.${status}`;

    return (
        <div className={`workflow-step ${status} ${currentStatus.bg} p-4 rounded-lg`}>
            <div className="flex items-center space-x-3 space-x-reverse mb-3">
                <div className={`w-8 h-8 ${currentStatus.iconBg} rounded-full flex items-center justify-center`}>
                    <i className={`${icon} text-white text-sm`}></i>
                </div>
                <h4 className="font-medium text-gray-900">{t(titleKey)}</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">{t(descriptionKey)}</p>
            <div className={`text-xs font-medium ${currentStatus.text}`}>
                {t(statusTextKey)}
            </div>
        </div>
    );
};

const ApprovalWorkflow: React.FC = () => {
    const { t } = useI18n();
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.leaves.workflow.title')}</h3>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6">
                    <WorkflowStep 
                        icon="fas fa-check" 
                        titleKey="page.leaves.workflow.step1.title" 
                        descriptionKey="page.leaves.workflow.step1.desc" 
                        status="completed" 
                    />
                    <WorkflowStep 
                        icon="fas fa-user-tie" 
                        titleKey="page.leaves.workflow.step2.title" 
                        descriptionKey="page.leaves.workflow.step2.desc" 
                        status="active" 
                    />
                    <WorkflowStep 
                        icon="fas fa-users" 
                        titleKey="page.leaves.workflow.step3.title" 
                        descriptionKey="page.leaves.workflow.step3.desc" 
                        status="pending" 
                    />
                </div>
            </div>
        </div>
    );
};

export default ApprovalWorkflow;
