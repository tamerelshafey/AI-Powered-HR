
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PageHeader from '../../components/PageHeader';
import { Mission, MissionStatus, Employee } from '../../types';
import { getMissions, getAllEmployees, addMission, updateMissionStatus } from '../../services/api';
import { useUser } from '../../context/UserContext';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useI18n } from '../../context/I18nContext';
import ToastNotification from '../../components/ToastNotification';
import MissionsTable from './components/MissionsTable';
import MissionModal from './components/MissionModal';

const MissionsPage: React.FC = () => {
    const [missions, setMissions] = useState<Mission[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
    
    const { currentUser } = useUser();
    const { t } = useI18n();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [missionsData, employeesData] = await Promise.all([
                getMissions(),
                getAllEmployees()
            ]);
            setMissions(missionsData);
            setEmployees(employeesData);
        } catch (err) {
            console.error("Failed to fetch missions data", err);
            setError("فشل في تحميل بيانات المهام.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAddMission = async (missionData: Omit<Mission, 'id' | 'status'>) => {
        try {
            const newMissionData: Omit<Mission, 'id'> = {
                ...missionData,
                status: MissionStatus.PENDING,
            };
            const newMission = await addMission(newMissionData);
            setMissions(prev => [newMission, ...prev]);
            setToast({ message: t('page.missions.toast.created'), type: 'success' });
            setModalOpen(false);
        } catch (error) {
            console.error("Failed to add mission:", error);
            setToast({ message: t('page.missions.toast.createFailed'), type: 'error' });
        }
    };

    const handleUpdateStatus = async (missionId: string, status: MissionStatus) => {
        try {
            const updatedMission = await updateMissionStatus(missionId, status);
            setMissions(prev => prev.map(m => m.id === missionId ? updatedMission : m));
            const message = status === MissionStatus.APPROVED ? t('page.missions.toast.approved') : t('page.missions.toast.rejected');
            setToast({ message, type: 'success' });
        } catch (error) {
            console.error("Failed to update mission status:", error);
            setToast({ message: t('page.missions.toast.updateFailed'), type: 'error' });
        }
    };

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchData} />;
    }

    return (
        <div>
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <PageHeader
                title={t('page.missions.header.title')}
                subtitle={t('page.missions.header.subtitle')}
                actions={
                    <button onClick={() => setModalOpen(true)} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-plus"></i>
                        <span>{t('page.missions.header.add')}</span>
                    </button>
                }
            />
            <MissionsTable 
                missions={missions}
                onUpdateStatus={handleUpdateStatus}
                currentUser={currentUser}
            />
            <MissionModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleAddMission}
                employees={employees}
            />
        </div>
    );
};

export default MissionsPage;
