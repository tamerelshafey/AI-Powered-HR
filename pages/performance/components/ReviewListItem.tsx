import React from 'react';
import { PerformanceReview, PerformanceStatus } from '../../../types';

interface ReviewListItemProps {
    review: PerformanceReview;
    onViewReview: (review: PerformanceReview) => void;
}

const statusClasses = {
    [PerformanceStatus.PENDING]: 'bg-orange-100 text-orange-800',
    [PerformanceStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [PerformanceStatus.COMPLETED]: 'bg-green-100 text-green-800',
};

const ReviewListItem: React.FC<ReviewListItemProps> = ({ review, onViewReview }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 hover:bg-gray-50 w-full h-full">
            {/* Mobile View */}
            <div className="md:hidden p-4 space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <div className={`w-8 h-8 ${review.employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                            <span className="text-white text-xs font-medium">{review.employee.avatarInitials}</span>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">{review.employee.firstName} {review.employee.lastName}</div>
                            <div className="text-sm text-gray-500">{review.reviewType}</div>
                        </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[review.status]}`}>
                        {review.status}
                    </span>
                </div>
                <div className="flex justify-between items-center text-sm border-t pt-2">
                    <p className="text-gray-600">التاريخ: <span className="font-medium text-gray-800">{review.reviewDate}</span></p>
                    <button onClick={() => onViewReview(review)} className="text-sm font-medium text-blue-600 hover:text-blue-900">
                        {review.status === PerformanceStatus.COMPLETED ? 'عرض التفاصيل' : 'بدء المراجعة'}
                    </button>
                </div>
            </div>
            
            {/* Desktop View */}
            <div className="hidden md:flex items-center w-full h-full px-6">
                <div className="w-1/3 flex items-center">
                     <div className={`w-8 h-8 ${review.employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                        <span className="text-white text-xs font-medium">{review.employee.avatarInitials}</span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900">{review.employee.firstName} {review.employee.lastName}</div>
                        <div className="text-sm text-gray-500">{review.employee.jobTitle}</div>
                    </div>
                </div>
                <div className="w-1/6 text-sm text-gray-900">{review.reviewDate}</div>
                <div className="w-1/4 text-sm text-gray-700">{review.reviewType}</div>
                <div className="w-1/12">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusClasses[review.status]}`}>{review.status}</span>
                </div>
                <div className="w-1/6 text-sm">
                    <button onClick={() => onViewReview(review)} className="text-blue-600 hover:text-blue-700">
                        {review.status === PerformanceStatus.COMPLETED ? 'عرض التفاصيل' : 'بدء المراجعة'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewListItem;
