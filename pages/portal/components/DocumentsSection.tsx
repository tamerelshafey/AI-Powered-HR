import React, { useState, useEffect } from 'react';
import { EmployeeDocument, DocumentStatus } from '../../../types';
import { useUser } from '../../../context/UserContext';
import { getEmployeeDocuments, getEmployeeIdForUser } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const statusClasses: Record<DocumentStatus, string> = {
    [DocumentStatus.VALID]: 'bg-green-100 text-green-800',
    [DocumentStatus.EXPIRING_SOON]: 'bg-yellow-100 text-yellow-800',
    [DocumentStatus.EXPIRED]: 'bg-red-100 text-red-800',
    [DocumentStatus.MISSING]: 'bg-orange-100 text-orange-800',
};

const DocumentsSection: React.FC = () => {
    const { currentUser } = useUser();
    const [documents, setDocuments] = useState<EmployeeDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const employeeId = getEmployeeIdForUser(currentUser);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getEmployeeDocuments(employeeId);
                setDocuments(data);
            } catch (error) {
                console.error("Failed to fetch documents for employee", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [employeeId]);

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner /></div>
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">المستندات</h2>
                <p className="text-gray-600">مستنداتك الرسمية وتواريخ صلاحيتها.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border">
                 <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900">قائمة المستندات</h3></div>
                {documents.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <i className="fas fa-file-excel text-4xl mb-3"></i>
                        <p>لا توجد مستندات مسجلة لك.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
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
                                            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 me-3">عرض</a>
                                            <a href={doc.fileUrl} download className="text-gray-500 hover:text-gray-700">تحميل</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentsSection;