import React, { useState, useEffect } from 'react';
import { Employee, CompanyAsset, AssetStatus } from '../../../../types';
import { getCompanyAssets } from '../../../../services/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import AssignAssetToEmployeeModal from './AssignAssetToEmployeeModal';

interface AssetsTabProps {
    employee: Employee;
}

const statusClasses: Record<AssetStatus, string> = {
    [AssetStatus.IN_USE]: 'bg-green-100 text-green-800',
    [AssetStatus.AVAILABLE]: 'bg-blue-100 text-blue-800',
    [AssetStatus.IN_REPAIR]: 'bg-orange-100 text-orange-800',
    [AssetStatus.RETIRED]: 'bg-gray-100 text-gray-800',
};

const AssetsTab: React.FC<AssetsTabProps> = ({ employee }) => {
    const [assets, setAssets] = useState<CompanyAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAssignModalOpen, setAssignModalOpen] = useState(false);

    useEffect(() => {
        const fetchAssets = async () => {
            setLoading(true);
            try {
                const data = await getCompanyAssets(employee.id);
                setAssets(data);
            } catch (error) {
                console.error("Failed to fetch assets for employee", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAssets();
    }, [employee.id]);

    if (loading) {
        return <div className="h-64"><LoadingSpinner /></div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    الأصول المسلمة للموظف
                </h3>
                <button
                    onClick={() => setAssignModalOpen(true)}
                    className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                    <i className="fas fa-plus"></i>
                    <span>تسليم أصل جديد</span>
                </button>
            </div>

            {assets.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                    <i className="fas fa-box-open text-4xl mb-3"></i>
                    <p>لا توجد أصول مسلمة لهذا الموظف.</p>
                </div>
            ) : (
                 <div>
                    {/* Mobile View */}
                    <div className="md:hidden space-y-3">
                        {assets.map(asset => (
                             <div key={asset.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                                <p className="font-semibold text-gray-800">{asset.name}</p>
                                <p className="text-sm text-gray-500">الرقم التسلسلي: {asset.serialNumber}</p>
                                <div className="flex justify-between items-center text-sm border-t pt-2">
                                     <p className="text-gray-600">تاريخ التسليم: <span className="font-medium text-gray-800">{asset.assignmentDate ?? 'N/A'}</span></p>
                                     <button className="text-sm font-medium text-orange-600 hover:text-orange-900">استلام</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Desktop View */}
                    <div className="overflow-x-auto hidden md:block border rounded-lg">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الأصل</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الرقم التسلسلي</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">تاريخ التسليم</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {assets.map(asset => (
                                    <tr key={asset.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.serialNumber}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.assignmentDate ?? 'N/A'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button className="text-orange-600 hover:text-orange-900">استلام</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {isAssignModalOpen && (
                <AssignAssetToEmployeeModal
                    isOpen={isAssignModalOpen}
                    onClose={() => setAssignModalOpen(false)}
                    employee={employee}
                />
            )}
        </div>
    );
};

export default AssetsTab;