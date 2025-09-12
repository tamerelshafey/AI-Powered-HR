
import React, { useMemo, useRef } from 'react';
// FIX: Use named imports for react-window to resolve module resolution errors.
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { PerformanceReview, PerformanceStatus } from '../../../types';
import ReviewListItem from './ReviewListItem';

interface AllReviewsProps {
    reviews: PerformanceReview[];
    onViewReview: (review: PerformanceReview) => void;
    filters: { status: string; type: string };
    onFilterChange: (filters: { status: string; type: string }) => void;
    hasMore: boolean;
    loadMoreItems: () => void;
}

const AllReviews: React.FC<AllReviewsProps> = ({ reviews, onViewReview, filters, onFilterChange, hasMore, loadMoreItems }) => {
    // FIX: Updated ref type annotation to use named import.
    const listRef = useRef<FixedSizeList>(null);
    const reviewTypes = useMemo(() => Array.from(new Set(reviews.map(r => r.reviewType))), [reviews]);

    const itemCount = hasMore ? reviews.length + 1 : reviews.length;
    const isItemLoaded = (index: number) => !hasMore || index < reviews.length;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">سجل المراجعات</h3>
                <div className="flex flex-wrap gap-4 mt-4">
                    <select value={filters.status} onChange={e => onFilterChange({ ...filters, status: e.target.value })} className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-blue-500">
                        <option value="All">كل الحالات</option>
                        {Object.values(PerformanceStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                     <select value={filters.type} onChange={e => onFilterChange({ ...filters, type: e.target.value })} className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-blue-500">
                        <option value="All">كل الأنواع</option>
                        {reviewTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
            </div>
            
            <div className="h-[70vh]">
                {/* Desktop Header */}
                <div className="hidden md:flex bg-gray-50 border-b">
                    <div className="px-6 py-3 w-1/3 text-start text-xs font-medium text-gray-500 uppercase">الموظف</div>
                    <div className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">تاريخ المراجعة</div>
                    <div className="px-6 py-3 w-1/4 text-start text-xs font-medium text-gray-500 uppercase">النوع</div>
                    <div className="px-6 py-3 w-1/12 text-start text-xs font-medium text-gray-500 uppercase">الحالة</div>
                    <div className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">الإجراء</div>
                </div>
                <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={itemCount}
                    loadMoreItems={loadMoreItems}
                >
                    {({ onItemsRendered, ref }) => (
                        
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
                            itemSize={95}
                        >
                            
                            {({ index, style }: ListChildComponentProps) => {
                                if (!isItemLoaded(index)) {
                                    return (
                                        <div style={style} className="flex items-center justify-center text-gray-500">
                                            <i className="fas fa-spinner fa-spin me-2"></i> جاري التحميل...
                                        </div>
                                    );
                                }
                                const review = reviews[index];
                                if (!review) return null;

                                return (
                                     <div style={style}>
                                        <div style={{ padding: '8px' }}>
                                            <ReviewListItem review={review} onViewReview={onViewReview} />
                                        </div>
                                    </div>
                                );
                            }}
                        </FixedSizeList>
                    )}
                </InfiniteLoader>
            </div>
        </div>
    );
};

export default AllReviews;