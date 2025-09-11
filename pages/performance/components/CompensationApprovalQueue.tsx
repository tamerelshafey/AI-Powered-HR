import React, { useState, useEffect } from 'react';
import { CompensationChangeRequest, CompRequestStatus } from '../../../types';
import { getCompensationRequestsByStatus } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ToastNotification from '../../../components/ToastNotification';

// Card for individual request
const RequestCard: React.FC<{ 
    request: CompensationChangeRequest; 
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
}> = ({ request, onApprove, onReject }) => {
    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start space-x-3 space-x-reverse">
                    <div className={`w-10 h-10 ${request.employee.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-sm font-medium">{request.employee.avatarInitials}</span>
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900">{request.employee.firstName} {request.employee.lastName}</h4>
                        <p className="text-sm text-gray-600">{request.employee.jobTitle}</p>
                        <p className="text-xs text-gray-500 mt-1">طلب بواسطة: {request.requestedBy} | <a href="#" className="text-blue-600 hover:underline">عرض المراجعة #{request.reviewId}</a></p>
                    </div>
                </div>
                <div className="mt-3 sm:mt-0 flex items-center space-x-4 space-x-reverse text-sm font-semibold">
                    {request.salaryIncreasePercentage && (
                        <div className="text-center">
                            <p className="text-green-600">+{request.salaryIncreasePercentage}%</p>
                            <p className="text-xs text-gray-500 font-normal">زيادة راتب</p>
                        </div>
                    )}
                    {request.oneTimeBonus ? (
                         <div className="text-center">
                            <p className="text-purple-600">{request.oneTimeBonus.toLocaleString('ar-EG')}</p>
                            <p className="text-xs text-gray-500 font-normal">مكافأة</p>
                        </div>
                    ) : null}
                </div>
            </div>
            <p className="text-sm text-gray-700 mt-3 bg-gray-100 p-2 rounded-md">{request.justification}</p>
            <div className="flex justify-end space-x-2 space-x-reverse mt-4">
                <button onClick={() => onReject(request.id)} className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors">رفض</button>
                <button onClick={() => onApprove(request.id)} className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">موافقة</button>
            </div>
        </div>
    );
};


const CompensationApprovalQueue: React.FC = () => {
    const [requests, setRequests] = useState<CompensationChangeRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const data = await getCompensationRequestsByStatus(CompRequestStatus.PENDING_APPROVAL);
                setRequests(data);
            } catch (error) {
                console.error("Failed to fetch pending requests", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const handleAction = (id: string, action: 'approved' | 'rejected') => {
        const employeeName = requests.find(r => r.id === id)?.employee.firstName;
        setRequests(prev => prev.filter(r => r.id !== id));
        setToast({ message: `تم ${action === 'approved' ? 'الموافقة على' : 'رفض'} طلب ${employeeName}`, type: 'success' });
        // In a real app, you would make an API call here to update the status.
    };

    if (loading) {
        return (
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[10rem] flex items-center justify-center mb-8">
                <LoadingSpinner/>
             </div>
        )
    }

    if (requests.length === 0) {
        return null; // Don't render the component if there are no pending requests
    }

    return (
        <>
        {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <i className="fas fa-vote-yea text-orange-500 me-3"></i>
                        طلبات تعويضات للموافقة
                    </h3>
                    <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">{requests.length} طلب</span>
                </div>
            </div>
            <div className="p-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {requests.map(request => (
                        <RequestCard 
                            key={request.id} 
                            request={request} 
                            onApprove={() => handleAction(request.id, 'approved')}
                            onReject={() => handleAction(request.id, 'rejected')}
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default CompensationApprovalQueue;