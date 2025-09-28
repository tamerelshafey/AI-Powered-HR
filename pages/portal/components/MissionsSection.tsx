

import React, { useState, useEffect, useCallback } from 'react';
import { Mission, MissionStatus, Employee } from '../../../types';
import { useUser } from '../../../context/UserContext';
import { getMissionsByEmployeeId, getEmployeeIdForUser, addMission, getAllEmployees } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useI18n } from '../../../context/I18nContext';
import { formatDate, formatTimeFromString } from '../../../utils/formatters';
import MissionModal from '../../missions/components/MissionModal';
import ToastNotification from '../../../components/ToastNotification';

const statusClasses: Record<MissionStatus, string> = {
    [MissionStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [MissionStatus.APPROVED]: 'bg-green-100 text-green-800',
    [MissionStatus.REJECTED]: 'bg-red-100 text-red-800',
    [MissionStatus.COMPLETED]: 'bg-blue-100 text-blue-800',
};

const MissionsSection: React.FC = () => {
    const { currentUser } = useUser();
    const [missions, setMissions] = useState<Mission[]>([]);
    const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

    const { t, language } = useI18n();
    const employeeId = getEmployeeIdForUser(currentUser);
    const currentUserEmployee = allEmployees.find(e => e.id === employeeId);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [data, employeesData] = await Promise.all([
                getMissionsByEmployeeId(employeeId),
                getAllEmployees()
            ]);
            setMissions(data);
            setAllEmployees(employeesData);
        } catch (error) {
            console.error("Failed to fetch missions", error);
        } finally {
            setLoading(false);
        }
    }, [employeeId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleRequestMission = async (missionData: Omit<Mission, 'id' | 'status'>) => {
        try {
            const newMissionData = { ...missionData, status: MissionStatus.PENDING };
            const newMission = await addMission(newMissionData);
            setMissions(prev => [newMission, ...prev]);
            setToast({ message: t('page.missions.toast.created'), type: 'success' });
        } catch (error) {
            console.error("Failed to request mission:", error);
            setToast({ message: t('page.missions.toast.createFailed'), type: 'error' });
        } finally {
            setModalOpen(false);
        }
    };

    const renderMissionTime = (mission: Mission) => {
        if (mission.isMultiDay) {
            return `${formatDate(mission.startDate, language)} - ${formatDate(mission.endDate, language)}`;
        }
        let timeString = formatDate(mission.startDate, language);
        if (mission.startTime && mission.endTime) {
            timeString += ` (${formatTimeFromString(mission.startTime, language)} - ${formatTimeFromString(mission.endTime, language)})`;
        }
        return timeString;
    };

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner /></div>;
    }

    return (
        <div>
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('portalNav.missions')}</h2>
                    <p className="text-gray-600">{t('page.portal.missions.subtitle')}</p>
                </div>
                <button onClick={() => setModalOpen(true)} className="mt-4 lg:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <i className="fas fa-plus me-2"></i>{t('page.portal.missions.newRequest')}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900">{t('page.portal.missions.history')}</h3></div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.missions.table.mission')}</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.missions.table.dates')}</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.missions.table.status')}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y">
                            {missions.length > 0 ? missions.map(mission => (
                                <tr key={mission.id}>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-800">{mission.title}</p>
                                        <p className="text-sm text-gray-600">{mission.description}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{renderMissionTime(mission)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[mission.status]}`}>{t(`enum.missionStatus.${mission.status}`)}</span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3} className="text-center py-12 text-gray-500">
                                        <i className="fas fa-folder-open text-3xl mb-2"></i>
                                        <p>{t('page.portal.missions.noMissions')}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <MissionModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleRequestMission}
                employees={allEmployees}
                mode="request"
                currentUserEmployee={currentUserEmployee}
            />
        </div>
    );
};

export default MissionsSection;
