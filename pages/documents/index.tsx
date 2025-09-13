
import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../../components/PageHeader';
import DocumentStats from './components/DocumentStats';
import DocumentsTable from './components/DocumentsTable';
import UploadDocumentModal from './components/UploadDocumentModal';
import { EmployeeDocument, Employee } from '../../types';
import { getEmployeeDocumentsPaginated, getDocumentsStats, getAllEmployees } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import Pagination from '../../components/Pagination';
import { useI18n } from '../../context/I18nContext';

const DocumentsPage: React.FC = () => {
    const [documents, setDocuments] = useState<EmployeeDocument[]>([]);
    const [stats, setStats] = useState<{ total: number; expiringSoon: number; expired: number; missing: number; } | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUploadModalOpen, setUploadModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({ searchTerm: '', filterType: 'All', filterStatus: 'All' });
    const { t } = useI18n();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [statsData, employeesData] = await Promise.all([
                    getDocumentsStats(),
                    getAllEmployees()
                ]);
                setStats(statsData);
                setEmployees(employeesData);
            } catch (error) {
                console.error("Failed to fetch initial documents data", error);
                setError("فشل في تحميل إحصائيات وبيانات المستندات.");
            }
        };
        fetchInitialData();
    }, []);

    const fetchPaginatedDocuments = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const paginatedDocsData = await getEmployeeDocumentsPaginated(currentPage, 10, filters);
            setDocuments(paginatedDocsData.data);
            setTotalPages(paginatedDocsData.totalPages);
        } catch (error) {
            console.error("Failed to fetch documents data", error);
            setError("فشل في تحميل بيانات المستندات.");
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters]);

    useEffect(() => {
        fetchPaginatedDocuments();
    }, [fetchPaginatedDocuments]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (newFilters: { searchTerm: string; filterType: string; filterStatus: string; }) => {
        setCurrentPage(1);
        setFilters(newFilters);
    };
    
    const handleRetry = () => {
       if (!stats) {
           // Retry initial fetch if it failed
           const fetchInitialData = async () => {
                setError(null);
                try {
                    const [statsData, employeesData] = await Promise.all([ getDocumentsStats(), getAllEmployees() ]);
                    setStats(statsData);
                    setEmployees(employeesData);
                } catch (error) {
                    setError("فشل في تحميل إحصائيات وبيانات المستندات.");
                }
            };
            fetchInitialData();
       }
       fetchPaginatedDocuments();
    }

    return (
        <div>
            <PageHeader
                title={t('page.documents.header.title')}
                subtitle={t('page.documents.header.subtitle')}
                actions={
                    <button onClick={() => setUploadModalOpen(true)} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-upload"></i>
                        <span>{t('page.documents.header.upload')}</span>
                    </button>
                }
            />
            <DocumentStats stats={stats} />
            <DocumentsTable documents={documents} filters={filters} onFilterChange={handleFilterChange} />
            
            {loading ? (
                 <div className="flex justify-center items-center h-48">
                    <i className="fas fa-spinner fa-spin text-3xl text-blue-600"></i>
                </div>
            ) : error ? (
                <div className="mt-6"><ErrorDisplay message={error} onRetry={handleRetry} /></div>
            ) : (
                 <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
            
            {isUploadModalOpen && (
                <UploadDocumentModal
                    isOpen={isUploadModalOpen}
                    onClose={() => setUploadModalOpen(false)}
                    employees={employees}
                />
            )}
        </div>
    );
};

export default DocumentsPage;
