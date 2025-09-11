import React, { useState, useEffect } from 'react';
import { Employee, EmployeeDocument, DocumentStatus } from '../../../../types';
import { getEmployeeDocuments, getAllEmployees } from '../../../../services/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import UploadDocumentModal from '../../../documents/components/UploadDocumentModal';

interface DocumentsTabProps {
    employee: Employee;
}

const statusClasses: Record<DocumentStatus, string> = {
    [DocumentStatus.VALID]: 'bg-green-100 text-green-800',
    [DocumentStatus.EXPIRING_SOON]: 'bg-yellow-100 text-yellow-800',
    [DocumentStatus.EXPIRED]: 'bg-red-100 text-red-800',
    [DocumentStatus.MISSING]: 'bg-orange-100 text-orange-800',
};

const DocumentsTab: React.FC<DocumentsTabProps> = ({ employee }) => {
    const [documents, setDocuments] = useState<EmployeeDocument[]>([]);
    const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [docsData, allEmployeesData] = await Promise.all([
                    getEmployeeDocuments(employee.id),
                    getAllEmployees() // Needed for the modal
                ]);
                setDocuments(docsData);
                setAllEmployees(allEmployeesData);
            } catch (error) {
                console.error("Failed to fetch documents for employee", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [employee.id]);

    if (loading) {
        return <div className="h-64"><LoadingSpinner /></div>;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    مستندات الموظف
                </h3>
                <button 
                    onClick={() => setUploadModalOpen(true)}
                    className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                    <i className="fas fa-plus"></i>
                    <span>إضافة مستند</span>
                </button>
            </div>

            {documents.length === 0 ? (
                <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                    <i className="fas fa-file-excel text-4xl mb-3"></i>
                    <p>لا توجد مستندات مسجلة لهذا الموظف.</p>
                </div>
            ) : (
                <div>
                     {/* Mobile View */}
                    <div className="md:hidden space-y-3">
                        {documents.map(doc => (
                            <div key={doc.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <p className="font-semibold text-gray-800">{doc.documentType}</p>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[doc.status]}`}>
                                        {doc.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">تاريخ الانتهاء: <span className="font-medium text-gray-800">{doc.expiryDate ?? 'لا يوجد'}</span></p>
                                <div className="flex justify-end space-x-3 space-x-reverse pt-2 border-t border-gray-200 text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900">عرض</button>
                                    <button className="text-gray-500 hover:text-gray-700">تحميل</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Desktop View */}
                    <div className="overflow-x-auto hidden md:block border rounded-lg">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">نوع المستند</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">تاريخ الانتهاء</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الحالة</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {documents.map(doc => (
                                    <tr key={doc.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.documentType}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.expiryDate ?? 'لا يوجد'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[doc.status]}`}>
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
                </div>
            )}
            
            {isUploadModalOpen && (
                <UploadDocumentModal
                    isOpen={isUploadModalOpen}
                    onClose={() => setUploadModalOpen(false)}
                    employees={allEmployees}
                    defaultEmployeeId={employee.id}
                />
            )}
        </div>
    );
};

export default DocumentsTab;