import React, { useState, useEffect } from 'react';
import { CompensationChangeRequest, CompRequestStatus } from '../../../types';
import { getCompensationRequestsByStatus } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const PendingChanges: React.FC = () => {
    const [requests, setRequests] = useState<CompensationChangeRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getCompensationRequestsByStatus(CompRequestStatus.APPROVED);
                setRequests(data);
            } catch (error) {
                console.error("Failed to fetch pending compensation changes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleApplyChange = (requestId: string) => {
        alert(`Applying change ${requestId} to next payroll run.`);
        setRequests(prev => prev.filter(r => r.id !== requestId));
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <i className="fas fa-edit text-blue-600 me-2"></i>
                    تغييرات التعويضات المعلقة
                </h3>
            </div>
            {loading ? (
                <div className="h-48 flex items-center justify-center"><LoadingSpinner /></div>
            ) : requests.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                    <p>لا توجد تغييرات معتمدة وجاهزة للتطبيق.</p>
                </div>
            ) : (
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                    {requests.map(req => (
                        <div key={req.id} className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-800">{`${req.employee.firstName} ${req.employee.lastName}`}</p>
                                    <div className="text-sm text-gray-600 space-x-2 space-x-reverse">
                                        {req.salaryIncreasePercentage && <span>زيادة راتب: <span className="font-semibold text-green-600">{req.salaryIncreasePercentage}%</span></span>}
                                        {req.oneTimeBonus && <span>مكافأة: <span className="font-semibold text-green-600">{req.oneTimeBonus.toLocaleString('ar-EG')}</span></span>}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">تاريخ السريان: {req.effectiveDate}</p>
                                </div>
                                <button
                                    onClick={() => handleApplyChange(req.id)}
                                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    تطبيق
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PendingChanges;
