

import React from 'react';
import { Mission, MissionStatus, User } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import { formatDate, formatTimeFromString } from '../../../utils/formatters';

interface MissionsTableProps {
    missions: Mission[];
    onUpdateStatus: (missionId: string, status: MissionStatus) => void;
    currentUser: User;
}

const statusClasses: Record<MissionStatus, string> = {
    [MissionStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
    [MissionStatus.APPROVED]: 'bg-green-100 text-green-800',
    [MissionStatus.REJECTED]: 'bg-red-100 text-red-800',
    // FIX: Corrected object key to use enum member.
    [MissionStatus.COMPLETED]: 'bg-blue-100 text-blue-800',
};

const MissionsTable: React.FC<MissionsTableProps> = ({ missions, onUpdateStatus, currentUser }) => {
    const { t, language } = useI18n();
    const isManager = currentUser.role.includes('MANAGER');

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


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.missions.table.employee')}</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.missions.table.mission')}</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.missions.table.dates')}</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.missions.table.status')}</th>
                            {isManager && <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('common.actions')}</th>}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {missions.map(mission => (
                            <tr key={mission.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className={`w-8 h-8 ${mission.employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                                            <span className="text-white text-xs font-medium">{mission.employee.avatarInitials}</span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{`${mission.employee.firstName} ${mission.employee.lastName}`}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{mission.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {renderMissionTime(mission)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[mission.status]}`}>
                                        {t(`enum.missionStatus.${mission.status}`)}
                                    </span>
                                </td>
                                {isManager && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {mission.status === MissionStatus.PENDING && (
                                            <div className="flex items-center space-x-2 space-x-reverse">
                                                <button onClick={() => onUpdateStatus(mission.id, MissionStatus.APPROVED)} className="text-green-600 hover:text-green-800">{t('common.approve')}</button>
                                                <button onClick={() => onUpdateStatus(mission.id, MissionStatus.REJECTED)} className="text-red-600 hover:text-red-800">{t('common.reject')}</button>
                                            </div>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {missions.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <i className="fas fa-folder-open text-4xl mb-3"></i>
                        <p>{t('page.missions.noMissions')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MissionsTable;
