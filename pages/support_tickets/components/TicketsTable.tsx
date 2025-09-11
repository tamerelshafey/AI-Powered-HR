import React, { useRef } from 'react';
// FIX: The namespace import for react-window was causing errors. Switched to named imports.
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { SupportTicket, TicketStatus, TicketPriority, TicketDepartment } from '../../../types';
import TicketListItem from './TicketListItem';
import { ErrorDisplay } from '../../../components/ModulePlaceholder';

interface TicketsTableProps {
    tickets: SupportTicket[];
    onApplySuggestion: (ticketId: string) => void;
    filters: { searchTerm: string, filterStatus: string, filterDepartment: string };
    onFilterChange: (filters: { searchTerm: string, filterStatus: string, filterDepartment: string }) => void;
    hasMore: boolean;
    loadMoreItems: () => void;
    loading: boolean;
    error: string | null;
}

const TicketsTable: React.FC<TicketsTableProps> = ({ 
    tickets, onApplySuggestion, filters, onFilterChange, hasMore, loadMoreItems, loading, error 
}) => {
    // FIX: Use named import for the ref type annotation.
    const listRef = useRef<FixedSizeList>(null);

    const itemCount = hasMore ? tickets.length + 1 : tickets.length;
    const isItemLoaded = (index: number) => !hasMore || index < tickets.length;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="بحث بالموظف أو الموضوع..." className="w-full px-4 py-2 border border-gray-300 rounded-lg" value={filters.searchTerm} onChange={e => onFilterChange({ ...filters, searchTerm: e.target.value })} />
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white" value={filters.filterStatus} onChange={e => onFilterChange({ ...filters, filterStatus: e.target.value })}>
                        <option value="All">كل الحالات</option>
                        {Object.values(TicketStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white" value={filters.filterDepartment} onChange={e => onFilterChange({ ...filters, filterDepartment: e.target.value })}>
                        <option value="All">كل الأقسام</option>
                        {Object.values(TicketDepartment).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </div>
            </div>

            {error ? (
                <div className="p-6"><ErrorDisplay message={error} /></div>
            ) : (
                <div className="h-[70vh]">
                     {/* Desktop Header */}
                     <div className="hidden md:flex bg-gray-50 border-b">
                         <div className="px-6 py-3 w-1/4 text-start text-xs font-medium text-gray-500 uppercase">الموظف</div>
                         <div className="px-6 py-3 w-1/3 text-start text-xs font-medium text-gray-500 uppercase">الموضوع</div>
                         <div className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">القسم</div>
                         <div className="px-6 py-3 w-1/12 text-start text-xs font-medium text-gray-500 uppercase">الحالة</div>
                         <div className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">آخر تحديث</div>
                    </div>
                    <InfiniteLoader
                        isItemLoaded={isItemLoaded}
                        itemCount={itemCount}
                        loadMoreItems={loadMoreItems}
                    >
                        {({ onItemsRendered, ref }) => (
                            // FIX: Use named import for FixedSizeList.
                            <FixedSizeList
                                ref={(el) => {
                                    ref(el);
                                    // @ts-ignore
                                    listRef.current = el;
                                }}
                                onItemsRendered={onItemsRendered}
                                height={650}
                                width="100%"
                                itemCount={itemCount}
                                itemSize={95} // Approximate height for each item (including mobile and desktop)
                            >
                                {/* FIX: Use named import for ListChildComponentProps. */}
                                {({ index, style }: ListChildComponentProps) => {
                                    if (!isItemLoaded(index)) {
                                        return (
                                            <div style={style} className="flex items-center justify-center text-gray-500">
                                                <i className="fas fa-spinner fa-spin me-2"></i> جاري التحميل...
                                            </div>
                                        );
                                    }
                                    const ticket = tickets[index];
                                    if (!ticket) return null;
                                    
                                    return (
                                        <div style={style}>
                                            <div style={{ padding: '8px' }}>
                                                <TicketListItem 
                                                    ticket={ticket} 
                                                    onApplySuggestion={onApplySuggestion} 
                                                />
                                            </div>
                                        </div>
                                    );
                                }}
                            </FixedSizeList>
                        )}
                    </InfiniteLoader>
                </div>
            )}

            {!loading && tickets.length === 0 && !error && (
                <div className="text-center py-12 text-gray-500">
                    <i className="fas fa-folder-open text-4xl mb-3"></i>
                    <p>لا توجد تذاكر تطابق معايير البحث.</p>
                </div>
            )}
        </div>
    );
};

export default TicketsTable;