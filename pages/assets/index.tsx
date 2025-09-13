
import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../../components/PageHeader';
import AssetStats from './components/AssetStats';
import AssetsTable from './components/AssetsTable';
import AssignAssetModal from './components/AssignAssetModal';
import AddAssetModal from './components/AddAssetModal';
import { CompanyAsset, Employee } from '../../types';
import { getCompanyAssetsPaginated, getAssetsStats, getAllEmployees } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import Pagination from '../../components/Pagination';
import { useI18n } from '../../context/I18nContext';

const AssetsPage: React.FC = () => {
    const [assets, setAssets] = useState<CompanyAsset[]>([]);
    const [stats, setStats] = useState<{ total: number; assigned: number; available: number; inRepair: number; } | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAssignModalOpen, setAssignModalOpen] = useState(false);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState<CompanyAsset | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filters, setFilters] = useState({ searchTerm: '', filterCategory: 'All', filterStatus: 'All' });
    const { t } = useI18n();

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [statsData, employeesData] = await Promise.all([
                    getAssetsStats(),
                    getAllEmployees(),
                ]);
                setStats(statsData);
                setEmployees(employeesData);
            } catch (error) {
                console.error("Failed to fetch initial assets data", error);
                setError("فشل في تحميل إحصائيات وبيانات الأصول.");
            }
        };
        fetchInitialData();
    }, []);

    const fetchPaginatedAssets = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const paginatedData = await getCompanyAssetsPaginated(currentPage, 10, filters);
            setAssets(paginatedData.data);
            setTotalPages(paginatedData.totalPages);
        } catch (error) {
            console.error("Failed to fetch assets data", error);
            setError("فشل في تحميل بيانات الأصول.");
        } finally {
            setLoading(false);
        }
    }, [currentPage, filters]);

    useEffect(() => {
        fetchPaginatedAssets();
    }, [fetchPaginatedAssets]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleFilterChange = (newFilters: { searchTerm: string; filterCategory: string; filterStatus: string; }) => {
        setCurrentPage(1);
        setFilters(newFilters);
    };

    const handleOpenAssignModal = (asset: CompanyAsset) => {
        setSelectedAsset(asset);
        setAssignModalOpen(true);
    };

    const handleCloseAssignModal = () => {
        setSelectedAsset(null);
        setAssignModalOpen(false);
    };
    
    const handleRetry = () => {
        if (!stats) {
            const fetchInitialData = async () => {
                 setError(null);
                 try {
                    const [statsData, employeesData] = await Promise.all([ getAssetsStats(), getAllEmployees() ]);
                    setStats(statsData);
                    setEmployees(employeesData);
                 } catch (err) {
                     setError("فشل في تحميل إحصائيات وبيانات الأصول.");
                 }
             };
             fetchInitialData();
        }
        fetchPaginatedAssets();
    };


    return (
        <div>
            <PageHeader
                title={t('page.assets.header.title')}
                subtitle={t('page.assets.header.subtitle')}
                actions={
                    <button onClick={() => setAddModalOpen(true)} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-plus"></i>
                        <span>{t('page.assets.header.add')}</span>
                    </button>
                }
            />
            <AssetStats stats={stats} />
            <AssetsTable assets={assets} filters={filters} onFilterChange={handleFilterChange} onAssign={handleOpenAssignModal} />
            
             {loading ? (
                 <div className="flex justify-center items-center h-48">
                    <i className="fas fa-spinner fa-spin text-3xl text-blue-600"></i>
                </div>
            ) : error ? (
                <div className="mt-6"><ErrorDisplay message={error} onRetry={handleRetry} /></div>
            ) : (
                 <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}

            <AddAssetModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
            />

            {isAssignModalOpen && selectedAsset && (
                <AssignAssetModal
                    isOpen={isAssignModalOpen}
                    onClose={handleCloseAssignModal}
                    asset={selectedAsset}
                    employees={employees}
                />
            )}
        </div>
    );
};

export default AssetsPage;
