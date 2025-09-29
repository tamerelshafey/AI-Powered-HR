

import React, { useState, useEffect, useCallback } from 'react';
import { SuccessionPlan, JobTitle, Employee } from '../../types';
import { getSuccessionPlans, getAllEmployees } from '../../services/api';
import PageHeader from '../../components/PageHeader';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import { useI18n } from '../../context/I18nContext';
import PlanCard from './components/PlanCard';
import SuccessorModal from './components/SuccessorModal';

const SuccessionPage: React.FC = () => {
    const [plans, setPlans] = useState<SuccessionPlan[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJobTitle, setSelectedJobTitle] = useState<JobTitle | null>(null);
    const { t } = useI18n();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [plansData, employeesData] = await Promise.all([
                getSuccessionPlans(),
                getAllEmployees()
            ]);
            setPlans(plansData);
            setEmployees(employeesData);
        } catch (err) {
            console.error("Failed to fetch succession data", err);
            setError("Failed to load succession planning data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleOpenNominateModal = (jobTitle: JobTitle) => {
        setSelectedJobTitle(jobTitle);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJobTitle(null);
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
                title={t('page.succession.header.title')}
                subtitle={t('page.succession.header.subtitle')}
            />
            
            <div className="space-y-6">
                {plans.map(plan => (
                    <PlanCard 
                        key={plan.jobTitle.id} 
                        plan={plan} 
                        onNominateClick={handleOpenNominateModal} 
                    />
                ))}
            </div>

            {selectedJobTitle && (
                <SuccessorModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    jobTitle={selectedJobTitle}
                    employees={employees}
                />
            )}
        </div>
    );
};

export default SuccessionPage;