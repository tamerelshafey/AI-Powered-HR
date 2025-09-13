
import React, { useState, useEffect, useCallback } from 'react';
import { Department, Employee } from '../../types';
import { getDepartments, getAllEmployees } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import PageHeader from '../../components/PageHeader';
import DepartmentCard from './components/DepartmentCard';
import DepartmentModal from './components/DepartmentModal';
import { useI18n } from '../../context/I18nContext';

const DepartmentsPage: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
    const { t } = useI18n();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [deptsData, empsData] = await Promise.all([
                getDepartments(),
                getAllEmployees()
            ]);
            setDepartments(deptsData);
            setEmployees(empsData);
        } catch (err) {
            console.error("Failed to fetch departments data", err);
            setError("فشل في تحميل بيانات الأقسام.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleOpenModal = (department: Department | null = null) => {
        setEditingDepartment(department);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingDepartment(null);
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
            <PageHeader
                title={t('page.departments.header.title')}
                subtitle={t('page.departments.header.subtitle')}
                actions={
                    <button onClick={() => handleOpenModal()} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-plus"></i>
                        <span>{t('page.departments.header.add')}</span>
                    </button>
                }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map(dept => (
                    <DepartmentCard 
                        key={dept.id} 
                        department={dept} 
                        onEdit={() => handleOpenModal(dept)}
                    />
                ))}
            </div>

            {isModalOpen && (
                <DepartmentModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    department={editingDepartment}
                    allDepartments={departments}
                    allEmployees={employees}
                />
            )}
        </div>
    );
};

export default DepartmentsPage;
