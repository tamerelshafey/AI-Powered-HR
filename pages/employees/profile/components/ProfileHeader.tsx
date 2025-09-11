
import React from 'react';
import { Employee, OnlineStatus, EmployeeStatus } from '../../../../types';
import { useI18n } from '../../../../context/I18nContext';

interface ProfileHeaderProps {
  employee: Employee;
}

const onlineStatusClasses: Record<OnlineStatus, { text: string; bg: string; dot: string }> = {
    [OnlineStatus.ONLINE]: { text: 'text-green-700', bg: 'bg-green-100', dot: 'bg-green-500' },
    [OnlineStatus.OFFLINE]: { text: 'text-gray-700', bg: 'bg-gray-100', dot: 'bg-gray-500' },
    [OnlineStatus.AWAY]: { text: 'text-yellow-700', bg: 'bg-yellow-100', dot: 'bg-yellow-500' },
};

const statusClasses: Record<EmployeeStatus, { text: string; bg: string }> = {
    [EmployeeStatus.ACTIVE]: { text: 'text-green-800', bg: 'bg-green-100' },
    [EmployeeStatus.ON_LEAVE]: { text: 'text-yellow-800', bg: 'bg-yellow-100' },
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ employee }) => {
    const { t } = useI18n();
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between">
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-start">
                    <div className="relative flex-shrink-0 mb-4 sm:mb-0">
                        <div className={`w-24 h-24 ${employee.avatarColor} rounded-full flex items-center justify-center`}>
                            <span className="text-white font-bold text-4xl">{employee.avatarInitials}</span>
                        </div>
                        <div className={`absolute bottom-1 right-1 w-6 h-6 ${onlineStatusClasses[employee.onlineStatus].dot} rounded-full border-4 border-white`}></div>
                    </div>
                    <div className="sm:ms-6">
                        <h2 className="text-2xl font-bold text-gray-900">{`${employee.firstName} ${employee.lastName}`}</h2>
                        <p className="text-gray-600 mt-1">{employee.jobTitle}</p>
                        <p className="text-sm text-blue-600 font-medium mt-1">{employee.department}</p>
                        <div className="flex items-center justify-center sm:justify-start space-x-4 space-x-reverse mt-3">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusClasses[employee.status].bg} ${statusClasses[employee.status].text}`}>{t(`enum.employeeStatus.${employee.status}`)}</span>
                            <span className={`flex items-center px-3 py-1 text-xs font-medium rounded-full ${onlineStatusClasses[employee.onlineStatus].bg} ${onlineStatusClasses[employee.onlineStatus].text}`}>
                                <div className={`w-2 h-2 me-1.5 rounded-full ${onlineStatusClasses[employee.onlineStatus].dot}`}></div>
                                {t(`enum.onlineStatus.${employee.onlineStatus}`)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse mt-4 sm:mt-0">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-pencil-alt me-2"></i>{t('common.edit')}
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
