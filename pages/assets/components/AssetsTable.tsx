import React from 'react';
import { CompanyAsset, AssetStatus, AssetCategory } from '../../../types';

interface AssetsTableProps {
    assets: CompanyAsset[];
    filters: { searchTerm: string; filterCategory: string; filterStatus: string };
    onFilterChange: (filters: { searchTerm: string; filterCategory: string; filterStatus: string }) => void;
    onAssign: (asset: CompanyAsset) => void;
}

const statusClasses: Record<AssetStatus, string> = {
    [AssetStatus.IN_USE]: 'bg-green-100 text-green-800',
    [AssetStatus.AVAILABLE]: 'bg-blue-100 text-blue-800',
    [AssetStatus.IN_REPAIR]: 'bg-orange-100 text-orange-800',
    [AssetStatus.RETIRED]: 'bg-gray-100 text-gray-800',
};

const AssetsTable: React.FC<AssetsTableProps> = ({ assets, filters, onFilterChange, onAssign }) => {

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="بحث بالأصل أو الموظف..."
                        value={filters.searchTerm}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        onChange={e => onFilterChange({ ...filters, searchTerm: e.target.value })}
                    />
                    <select
                        value={filters.filterCategory}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                        onChange={e => onFilterChange({ ...filters, filterCategory: e.target.value })}
                    >
                        <option value="All">كل الفئات</option>
                        {Object.values(AssetCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select
                        value={filters.filterStatus}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                        onChange={e => onFilterChange({ ...filters, filterStatus: e.target.value })}
                    >
                        <option value="All">كل الحالات</option>
                        {Object.values(AssetStatus).map(stat => <option key={stat} value={stat}>{stat}</option>)}
                    </select>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                <div className="p-4 space-y-4">
                    {assets.map(asset => (
                        <div key={asset.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                            <div>
                                <p className="font-semibold text-gray-800">{asset.name}</p>
                                <p className="text-sm text-gray-500">{asset.serialNumber}</p>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <p className="text-gray-600">
                                    مُسند إلى: <span className="font-medium text-gray-800">{asset.assignedTo ? `${asset.assignedTo.firstName} ${asset.assignedTo.lastName}` : 'غير مُسند'}</span>
                                </p>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[asset.status]}`}>
                                    {asset.status}
                                </span>
                            </div>
                             <div className="flex justify-end pt-2 text-sm font-medium">
                                {asset.status === AssetStatus.AVAILABLE && (
                                    <button onClick={() => onAssign(asset)} className="text-blue-600 hover:text-blue-900">تسليم</button>
                                )}
                                {asset.status === AssetStatus.IN_USE && (
                                    <button className="text-orange-600 hover:text-orange-900">استلام</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Desktop View */}
            <div className="overflow-x-auto hidden md:block">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الأصل</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الفئة</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">مُسند إلى</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الحالة</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {assets.map(asset => (
                            <tr key={asset.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                                    <div className="text-sm text-gray-500">{asset.serialNumber}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {asset.assignedTo ? `${asset.assignedTo.firstName} ${asset.assignedTo.lastName}` : 'غير مُسند'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[asset.status]}`}>
                                        {asset.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {asset.status === AssetStatus.AVAILABLE && (
                                        <button onClick={() => onAssign(asset)} className="text-blue-600 hover:text-blue-900">تسليم</button>
                                    )}
                                    {asset.status === AssetStatus.IN_USE && (
                                        <button className="text-orange-600 hover:text-orange-900">استلام</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {assets.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <i className="fas fa-folder-open text-4xl mb-3"></i>
                    <p>لا توجد أصول تطابق معايير البحث.</p>
                </div>
            )}
        </div>
    );
};

export default AssetsTable;
