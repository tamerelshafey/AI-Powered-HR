import React, { useMemo } from 'react';
import { Kudo, Employee } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface LeaderboardWidgetProps {
    kudos: Kudo[];
}

const LeaderboardList: React.FC<{ title: string; data: { employee: Employee, count: number }[] }> = ({ title, data }) => {
    const { t } = useI18n();
    return (
        <div>
            <h4 className="font-semibold text-gray-800 mb-3">{title}</h4>
            <div className="space-y-3">
                {data.slice(0, 3).map(({ employee, count }, index) => (
                    <div key={employee.id} className="flex items-center space-x-3 space-x-reverse">
                        <span className="w-6 text-center font-bold text-gray-500">{index + 1}</span>
                         <div className={`w-8 h-8 ${employee.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                            <span className="text-white text-xs font-medium">{employee.avatarInitials}</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{`${employee.firstName} ${employee.lastName}`}</p>
                        </div>
                        <span className="text-sm font-bold text-blue-600">{count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({ kudos }) => {
    const { t } = useI18n();

    const leaderboards = useMemo(() => {
        const givers = new Map<string, { employee: Employee, count: number }>();
        const receivers = new Map<string, { employee: Employee, count: number }>();

        kudos.forEach(kudo => {
            // Givers
            const giver = givers.get(kudo.sender.id);
            givers.set(kudo.sender.id, { employee: kudo.sender, count: (giver?.count || 0) + 1 });
            
            // Receivers
            const receiver = receivers.get(kudo.receiver.id);
            receivers.set(kudo.receiver.id, { employee: kudo.receiver, count: (receiver?.count || 0) + 1 });
        });

        const sortedGivers = Array.from(givers.values()).sort((a, b) => b.count - a.count);
        const sortedReceivers = Array.from(receivers.values()).sort((a, b) => b.count - a.count);
        
        return { topGivers: sortedGivers, topReceivers: sortedReceivers };
    }, [kudos]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.recognition.leaderboard.title')}</h3>
            </div>
            <div className="p-6 space-y-6">
                <LeaderboardList title={t('page.recognition.leaderboard.topReceivers')} data={leaderboards.topReceivers} />
                <div className="border-t"></div>
                <LeaderboardList title={t('page.recognition.leaderboard.topGivers')} data={leaderboards.topGivers} />
            </div>
        </div>
    );
};

export default LeaderboardWidget;
