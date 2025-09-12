

import React from 'react';
import { SupportTicket, TicketStatus, TicketPriority, TicketDepartment } from '../../../types';
import { TICKET_STATUS_CLASSES, TICKET_PRIORITY_CLASSES } from '../../../utils/styleUtils';
import { formatTimeSince } from '../../../utils/formatters';

interface TicketListItemProps {
    ticket: SupportTicket;
    onApplySuggestion: (ticketId: string) => void;
}

const TicketListItem: React.FC<TicketListItemProps> = ({ ticket, onApplySuggestion }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 hover:bg-gray-50 w-full h-full">
            {/* Mobile View */}
            <div className="md:hidden p-4 space-y-3">
                <div className={`border-s-4 ${TICKET_PRIORITY_CLASSES[ticket.priority]} ps-3`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-gray-800">{ticket.subject}</p>
                            <p className="text-sm text-gray-500">{`${ticket.employee.firstName} ${ticket.employee.lastName}`}</p>
                        </div>
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${TICKET_STATUS_CLASSES[ticket.status]}`}>{ticket.status}</span>
                    </div>
                    {ticket.department === TicketDepartment.GENERAL && ticket.aiSuggestion && (
                        <div className="bg-purple-50 border border-purple-200 p-2 rounded-lg text-sm mt-2">
                            <p className="text-purple-800"><i className="fas fa-brain me-2"></i>اقتراح: <strong>{ticket.aiSuggestion.department}</strong>, أولوية <strong>{ticket.aiSuggestion.priority}</strong></p>
                            <button onClick={() => onApplySuggestion(ticket.id)} className="mt-2 text-xs font-semibold text-white bg-purple-600 px-2 py-1 rounded hover:bg-purple-700">تطبيق الاقتراح</button>
                        </div>
                    )}
                    <div className="flex justify-between items-center text-sm border-t pt-2 mt-2">
                        <p className="text-gray-600">{ticket.department}</p>
                        <p className="font-medium text-gray-800">{formatTimeSince(ticket.lastUpdated)}</p>
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
                    <div className={`text-xs font-medium border-s-2 ps-1 ${TICKET_PRIORITY_CLASSES[ticket.priority]}`}>أولوية {ticket.priority}</div>
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
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${TICKET_STATUS_CLASSES[ticket.status]}`}>{ticket.status}</span>
                </div>
                <div className="w-1/6 text-sm text-gray-900">
                    {formatTimeSince(ticket.lastUpdated)}
                </div>
            </div>
        </div>
    );
};

export default TicketListItem;