import React, { useState } from 'react';
import { Kudo, CompanyValue } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface KudosCardProps {
    kudo: Kudo;
}

const valueConfig: Record<CompanyValue, { color: string, icon: string }> = {
    [CompanyValue.TEAMWORK]: { color: 'blue', icon: 'fas fa-users' },
    [CompanyValue.INNOVATION]: { color: 'purple', icon: 'fas fa-lightbulb' },
    [CompanyValue.CUSTOMER_FOCUS]: { color: 'red', icon: 'fas fa-heart' },
    [CompanyValue.INTEGRITY]: { color: 'gray', icon: 'fas fa-shield-alt' },
    [CompanyValue.EXCELLENCE]: { color: 'yellow', icon: 'fas fa-award' },
};


const KudosCard: React.FC<KudosCardProps> = ({ kudo }) => {
    const { t } = useI18n();
    const [reactions, setReactions] = useState(kudo.reactions.count);
    const [reacted, setReacted] = useState(false);

    const handleReaction = () => {
        if (!reacted) {
            setReactions(prev => prev + 1);
            setReacted(true);
        } else {
            setReactions(prev => prev - 1);
            setReacted(false);
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-content-fade-in">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={`w-10 h-10 ${kudo.sender.avatarColor} rounded-full flex items-center justify-center font-bold text-white`}>
                        {kudo.sender.avatarInitials}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-800">{`${kudo.sender.firstName} ${kudo.sender.lastName}`}</p>
                        <p className="text-xs text-gray-500">{kudo.sender.jobTitle}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="text-center">
                        <i className="fas fa-arrow-right text-gray-400"></i>
                    </div>
                    <div className="text-end">
                         <p className="text-sm font-semibold text-gray-800">{`${kudo.receiver.firstName} ${kudo.receiver.lastName}`}</p>
                        <p className="text-xs text-gray-500">{kudo.receiver.jobTitle}</p>
                    </div>
                    <div className={`w-10 h-10 ${kudo.receiver.avatarColor} rounded-full flex items-center justify-center font-bold text-white`}>
                        {kudo.receiver.avatarInitials}
                    </div>
                </div>
            </div>
            
            <p className="text-gray-700 my-4 bg-gray-50 p-4 rounded-lg">{kudo.message}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
                {kudo.values.map(value => {
                    const config = valueConfig[value];
                    return (
                        <span key={value} className={`text-xs font-medium px-2 py-1 rounded-full bg-${config.color}-100 text-${config.color}-800`}>
                            <i className={`${config.icon} me-1.5`}></i>
                            {t(`enum.companyValue.${value}`)}
                        </span>
                    );
                })}
            </div>

            <div className="border-t pt-3 flex items-center justify-between">
                 <button 
                    onClick={handleReaction}
                    className={`flex items-center space-x-2 space-x-reverse px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${reacted ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    <i className="fas fa-hands-clapping"></i>
                    <span>{reactions}</span>
                </button>
                <span className="text-xs text-gray-500">{kudo.timestamp}</span>
            </div>
        </div>
    );
};

export default KudosCard;
