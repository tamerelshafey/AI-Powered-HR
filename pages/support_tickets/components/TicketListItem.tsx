import React from 'react';
import { SupportTicket, TicketStatus, TicketPriority, TicketDepartment } from '../../../types';

interface TicketListItemProps {
    ticket: SupportTicket;
    onApplySuggestion: (ticketId: string) => void;
}

const statusClasses: Record<TicketStatus, string> = {
    [TicketStatus.OPEN]: 'bg-orange-100 text-orange-800',
    [TicketStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [TicketStatus.CLOSED]: 'bg-green-100 text-green-800',
};

const priorityClasses: Record<TicketPriority, string> = {
    [TicketPriority.HIGH]: 'border-red-500 text-red-600',
    [TicketPriority.MEDIUM]: 'border-yellow-500 text-yellow-600',
    [TicketPriority.LOW]: 'border-gray-500 text-gray-600',
};

const TicketListItem: React.FC<TicketListItemProps> = ({ ticket, onApplySuggestion }) => {
    
    const timeSince = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return `منذ ${Math.floor(interval)} سنوات`;
        interval = seconds / 2592000;
        if (interval > 1) return `منذ ${Math.floor(interval)} أشهر`;
        interval = seconds / 86400;
        if (interval > 1) return `منذ ${Math.floor(interval)} أيام`;
        interval = seconds / 3600;
        if (interval > 1) return `منذ ${Math.floor(interval)} ساعات`;
        interval = seconds / 60;
        if (interval > 1) return `منذ ${Math.floor(interval)} دقائق`;
        return 'الآن';
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 hover:bg-gray-50 w-full h-full">
            {/* Mobile View */}
            <div className="md:hidden p-4 space-y-3">
                <div className={`border-s-4 ${priorityClasses[ticket.priority]} ps-3`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-gray-800">{ticket.subject}</p>
                            <p className="text-sm text-gray-500">{`${ticket.employee.firstName} ${ticket.employee.lastName}`}</p>
                        </div>
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[ticket.status]}`}>{ticket.status}</span>
                    </div>
                    {ticket.department === TicketDepartment.GENERAL && ticket.aiSuggestion && (
                        <div className="bg-purple-50 border border-purple-200 p-2 rounded-lg text-sm mt-2">
                            <p className="text-purple-800"><i className="fas fa-brain me-2"></i>اقتراح: <strong>{ticket.aiSuggestion.department}</strong>, أولوية <strong>{ticket.aiSuggestion.priority}</strong></p>
                            <button onClick={() => onApplySuggestion(ticket.id)} className="mt-2 text-xs font-semibold text-white bg-purple-600 px-2 py-1 rounded hover:bg-purple-700">تطبيق الاقتراح</button>
                        </div>
                    )}
                    <div className="flex justify-between items-center text-sm border-t pt-2 mt-2">
                        <p className="text-gray-600">{ticket.department}</p>
                        <p className="font-medium text-gray-800">{timeSince(ticket.lastUpdated)}</p>
                    </div>
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex items-center w-full h-full px-6">
                <div className="w-1/4 flex items-center">
                    <div className={`w-8 h-8 ${ticket.employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                        <span className="text-white text-xs font-medium">{ticket.employee.avatarInitials}</span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">{`${ticket.employee.firstName} ${ticket.employee.lastName}`}</div>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                    <div className={`text-xs font-medium border-s-2 ps-1 ${priorityClasses[ticket.priority]}`}>أولوية {ticket.priority}</div>
                </div>
                <div className="w-1/6 text-sm text-gray-900">
                    {ticket.department}
                    {ticket.department === TicketDepartment.GENERAL && ticket.aiSuggestion && (
                        <div className="bg-purple-50 border border-purple-200 p-1.5 rounded-lg text-xs mt-1">
                            <p className="text-purple-800"><i className="fas fa-brain me-1"></i>اقتراح: <strong>{ticket.aiSuggestion.department}</strong></p>
                            <button onClick={() => onApplySuggestion(ticket.id)} className="text-purple-600 font-semibold hover:underline">تطبيق</button>
                        </div>
                    )}
                </div>
                <div className="w-1/12">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[ticket.status]}`}>{ticket.status}</span>
                </div>
                <div className="w-1/6 text-sm text-gray-900">
                    {timeSince(ticket.lastUpdated)}
                </div>
            </div>
        </div>
    );
};

export default TicketListItem;
