
import React from 'react';
import { Employee, PerformanceReview, PerformanceStatus } from '../../../types';

interface MonthlyCheckInStatusProps {
    employees: Employee[];
    reviews: PerformanceReview[];
    onStartReview: (employee: Employee) => void;
}

const MonthlyCheckInStatus: React.FC<MonthlyCheckInStatusProps> = ({ employees, reviews, onStartReview }) => {
    // Note: For demo purposes, we are matching against 'July 2024'. 
    // In a real app, this would dynamically use the current month.
    const currentMonthYear = new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit' });
    const currentMonthName = new Date().toLocaleDateString('ar-EG', { month: 'long', year: 'numeric' });

    const getEmployeeReviewStatus = (employee: Employee) => {
        const review = reviews.find(r => 
            r.employee.id === employee.id &&
            r.reviewType === 'تقييم شهري' &&
            new Date(r.reviewDate).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit' }) === currentMonthYear
        );

        if (review) {
            return {
                status: review.status === PerformanceStatus.COMPLETED ? 'مكتمل' : 'قيد الانتظار',
                reviewData: review,
            };
        }
        return { status: 'لم تبدأ', reviewData: null };
    };

    const statusClasses: Record<string, string> = {
        'مكتمل': 'bg-green-100 text-green-800',
        'قيد الانتظار': 'bg-orange-100 text-orange-800',
        'لم تبدأ': 'bg-gray-100 text-gray-800',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">متابعة التقييم الشهري ({currentMonthName})</h3>
            </div>
            <div className="p-6">
                <div className="space-y-4 max-h-72 overflow-y-auto">
                    {employees.map(employee => {
                        const { status, reviewData } = getEmployeeReviewStatus(employee);
                        return (
                            <div key={employee.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                    <div className={`w-10 h-10 ${employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                                        <span className="text-white text-sm font-medium">{employee.avatarInitials}</span>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{`${employee.firstName} ${employee.lastName}`}</p>
                                        <p className="text-sm text-gray-500">{employee.jobTitle}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 space-x-reverse">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}>
                                        {status}
                                    </span>
                                    {(status === 'قيد الانتظار' || status === 'لم تبدأ') && (
                                        <button onClick={() => onStartReview(employee)} className="text-sm text-blue-600 hover:text-blue-700 font-medium">بدء المراجعة</button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                     {employees.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            <i className="fas fa-users text-3xl mb-2"></i>
                            <p>لا يوجد موظفون في هذا الفريق.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MonthlyCheckInStatus;
