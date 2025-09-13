
import React, { useState, useEffect, useCallback } from 'react';
import { SupportTicket } from '../../types';
import { getSupportTicketsPaginated } from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TicketStats from './components/TicketStats';
import TicketsTable from './components/TicketsTable';
import NewTicketModal from './components/NewTicketModal';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import { useI18n } from '../../context/I18nContext';

const SupportTicketsPage: React.FC = () => {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({ searchTerm: '', filterStatus: 'All', filterDepartment: 'All' });
    const { t } = useI18n();
    
    const fetchTickets = useCallback(async (pageNum: number, currentFilters: typeof filters) => {
        setLoading(true);
        setError(null);
        try {
            const { data, hasMore: newHasMore } = await getSupportTicketsPaginated(pageNum, 20, currentFilters);
            setTickets(prev => pageNum === 1 ? data : [...prev, ...data]);
            setHasMore(newHasMore);
            setPage(pageNum + 1);
        } catch (error) {
            console.error("Failed to fetch support tickets", error);
            setError("فشل في تحميل بيانات طلبات الدعم.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setTickets([]);
        setPage(1);
        setHasMore(true);
        fetchTickets(1, filters);
    }, [filters, fetchTickets]);
    
    const loadMoreItems = useCallback(() => {
        if (!loading && hasMore) {
           return fetchTickets(page, filters);
        }
    }, [loading, hasMore, page, filters, fetchTickets]);

    const handleFilterChange = (newFilters: typeof filters) => {
        setFilters(newFilters);
    };

    const handleApplySuggestion = (ticketId: string) => {
        setTickets(prevTickets =>
            prevTickets.map(ticket => {
                if (ticket.id === ticketId && ticket.aiSuggestion) {
                    return {
                        ...ticket,
                        department: ticket.aiSuggestion.department,
                        priority: ticket.aiSuggestion.priority,
                        aiSuggestion: undefined, // Clear suggestion after applying
                    };
                }
                return ticket;
            })
        );
    };
    
    return (
        <div>
            <PageHeader
                title={t('page.support.header.title')}
                subtitle={t('page.support.header.subtitle')}
                actions={
                    <button onClick={() => setModalOpen(true)} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-plus"></i>
                        <span>{t('page.support.header.newTicket')}</span>
                    </button>
                }
            />
            <TicketStats tickets={tickets} />
            <TicketsTable 
                tickets={tickets} 
                onApplySuggestion={handleApplySuggestion}
                filters={filters}
                onFilterChange={handleFilterChange}
                hasMore={hasMore}
                loadMoreItems={loadMoreItems}
                loading={loading}
                error={error}
            />
            <NewTicketModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
};

export default SupportTicketsPage;
