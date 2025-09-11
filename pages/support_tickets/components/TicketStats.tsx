
import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { SupportTicket, TicketStatus } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface TicketStatsProps {
    tickets: SupportTicket[];
}

const TicketStats: React.FC<TicketStatsProps> = ({ tickets }) => {
    const { t } = useI18n();
    const total = tickets.length;
    const open = tickets.filter(t => t.status === TicketStatus.OPEN || t.status === TicketStatus.IN_PROGRESS).length;
    const avgResolutionTime = t('ticketStats.hoursUnit', { count: 3.5 });
    const satisfaction = '92%';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="fas fa-ticket-alt" labelKey="ticketStats.totalTickets" value={String(total)} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
            <StatsCard icon="fas fa-folder-open" labelKey="ticketStats.openTickets" value={String(open)} iconBgColor="bg-orange-100" iconColor="text-orange-600" />
            <StatsCard icon="fas fa-clock" labelKey="ticketStats.avgResolution" value={avgResolutionTime} iconBgColor="bg-green-100" iconColor="text-green-600" />
            <StatsCard icon="fas fa-smile" labelKey="ticketStats.satisfaction" value={satisfaction} iconBgColor="bg-purple-100" iconColor="text-purple-600" />
        </div>
    );
};

export default TicketStats;
