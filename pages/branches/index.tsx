import React, { useState, useEffect, useCallback } from 'react';
import { Branch, Employee } from '../../types';
import { getBranches, getAllEmployees } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import PageHeader from './components/PageHeader';
import BranchCard from './components/BranchCard';
import BranchModal from './components/BranchModal';

const BranchesPage: React.FC = () => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [branchesData, empsData] = await Promise.all([
                getBranches(),
                getAllEmployees()
            ]);
            setBranches(branchesData);
            setEmployees(empsData);
        } catch (err) {
            console.error("Failed to fetch branches data", err);
            setError("فشل في تحميل بيانات الفروع.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleOpenModal = (branch: Branch | null = null) => {
        setEditingBranch(branch);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingBranch(null);
        setModalOpen(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
            </div>
        );
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchData} />;
    }

    return (
        <div>
            <PageHeader onAddBranch={() => handleOpenModal()} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {branches.map(branch => (
                    <BranchCard 
                        key={branch.id} 
                        branch={branch} 
                        onEdit={() => handleOpenModal(branch)}
                    />
                ))}
            </div>

            {isModalOpen && (
                <BranchModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    branch={editingBranch}
                    allEmployees={employees}
                />
            )}
        </div>
    );
};

export default BranchesPage;
