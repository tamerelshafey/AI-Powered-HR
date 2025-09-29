
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PageHeader from '../../components/PageHeader';
import ExpenseStats from './components/ExpenseStats';
import ExpensesTable from './components/ExpensesTable';
import ExpenseModal from './components/ExpenseModal';
import { ExpenseClaim, Employee, Mission } from '../../types';
import { getExpenseClaims, getAllEmployees, getMissions } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useI18n } from '../../context/I18nContext';

const ExpensesPage: React.FC = () => {
    const [claims, setClaims] = useState<ExpenseClaim[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [missions, setMissions] = useState<Mission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingClaim, setEditingClaim] = useState<ExpenseClaim | null>(null);
    const { t } = useI18n();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [claimsData, employeesData, missionsData] = await Promise.all([
                getExpenseClaims(),
                getAllEmployees(),
                getMissions()
            ]);
            setClaims(claimsData);
            setEmployees(employeesData);
            setMissions(missionsData);
        } catch (err) {
            console.error("Failed to fetch expense data", err);
            setError("فشل في تحميل بيانات المصروفات.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleOpenModal = (claim: ExpenseClaim | null = null) => {
        setEditingClaim(claim);
        setModalOpen(true);
    };

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchData} />;
    }

    return (
        <div>
            <PageHeader
                title={t('page.expenses.header.title')}
                subtitle={t('page.expenses.header.subtitle')}
                actions={
                    <button onClick={() => handleOpenModal()} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-plus"></i>
                        <span>{t('page.expenses.header.add')}</span>
                    </button>
                }
            />
            <ExpenseStats claims={claims} />
            <ExpensesTable
                claims={claims}
                onEdit={handleOpenModal}
                onUpdateStatus={() => { /* Implement status update logic */ }}
            />
            
            <ExpenseModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                claim={editingClaim}
                employees={employees}
                missions={missions}
            />
        </div>
    );
};

export default ExpensesPage;
