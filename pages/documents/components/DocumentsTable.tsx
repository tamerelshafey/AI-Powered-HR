
import React from 'react';
import { EmployeeDocument, DocumentStatus, DocumentType } from '../../../types';
import { DOCUMENT_STATUS_CLASSES } from '../../../utils/styleUtils';

interface DocumentsTableProps {
    documents: EmployeeDocument[];
    filters: { searchTerm: string; filterType: string; filterStatus: string };
    onFilterChange: (filters: { searchTerm: string; filterType: string; filterStatus: string }) => void;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({ documents, filters, onFilterChange }) => {
    
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                        <i className="fas fa-search absolute end-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        <input
                            type="text"
                            placeholder="بحث عن موظف..."
                            value={filters.searchTerm}
                            className="w-full pe-10 ps-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            onChange={(e) => onFilterChange({ ...filters, searchTerm: e.target.value })}
                        />
                    </div>
                    <select
                        value={filters.filterType}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => onFilterChange({ ...filters, filterType: e.target.value })}
                    >
                        <option value="All">كل أنواع المستندات</option>
                        {Object.values(DocumentType).map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <select
                        value={filters.filterStatus}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => onFilterChange({ ...filters, filterStatus: e.target.value })}
                    >
                        <option value="All">كل الحالات</option>
                        {Object.values(DocumentStatus).map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden">
                <div className="p-4 space-y-4">
                {documents.map(doc => (
                    <div key={doc.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                        <div>
                            <p className="font-semibold text-gray-800">{`${doc.employee.firstName} ${doc.employee.lastName}`}</p>
                            <p className="text-sm text-gray-500">{doc.documentType}</p>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <p className="text-gray-600">تاريخ الانتهاء: <span className="font-medium text-gray-800">{doc.expiryDate ?? 'لا يوجد'}</span></p>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${DOCUMENT_STATUS_CLASSES[doc.status]}`}>
                                {doc.status}
                            </span>
                        </div>
                        <div className="flex justify-end space-x-3 space-x-reverse pt-2 border-t border-gray-200 text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">عرض</button>
                            <button className="text-gray-500 hover:text-gray-700">تحميل</button>
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
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الموظف</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">نوع المستند</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">تاريخ الانتهاء</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الحالة</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {documents.map(doc => (
                            <tr key={doc.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{`${doc.employee.firstName} ${doc.employee.lastName}`}</div>
                                    <div className="text-sm text-gray-500">{doc.employee.id}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.documentType}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.expiryDate ?? 'لا يوجد'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${DOCUMENT_STATUS_CLASSES[doc.status]}`}>
                                        {doc.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900 me-3">عرض</button>
                                    <button className="text-gray-500 hover:text-gray-700">تحميل</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

             {documents.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <i className="fas fa-folder-open text-4xl mb-3"></i>
                    <p>لا توجد مستندات تطابق معايير البحث.</p>
                </div>
            )}
        </div>
    );
};

export default DocumentsTable;
