
import React, { useRef, useCallback } from 'react';
import { Employee, OnlineStatus, EmployeeStatus } from '../../../types';
import useOnScreen from '../../../hooks/useOnScreen';
import { useI18n } from '../../../context/I18nContext';
import { ONLINE_STATUS_CLASSES, EMPLOYEE_STATUS_CLASSES } from '../../../utils/styleUtils';

interface EmployeeCardProps {
  employee: Employee;
  onClick: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = React.memo(({ employee, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(cardRef, '100px');
    const { t } = useI18n();

    const handleClick = useCallback(() => {
        onClick(employee.id);
    }, [employee.id, onClick]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            onClick(employee.id);
        }
    }, [employee.id, onClick]);
    
    return (
        <div 
            ref={cardRef} 
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500" 
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View profile for ${employee.firstName} ${employee.lastName}`}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="relative">
                    <div 
                        className={`w-12 h-12 ${employee.avatarColor} rounded-full flex items-center justify-center bg-cover bg-center`}
                        style={{ backgroundImage: isVisible && employee.avatar ? `url(${employee.avatar})` : 'none' }}
                    >
                       {(!isVisible || !employee.avatar) && (
                            <span className="text-white font-medium">{employee.avatarInitials}</span>
                        )}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${ONLINE_STATUS_CLASSES[employee.onlineStatus]} rounded-full border-2 border-white`}></div>
                </div>
                <div className="flex items-center space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600" aria-label={`More options for ${employee.firstName} ${employee.lastName}`}>
                        <i className="fas fa-ellipsis-v"></i>
                    </button>
                </div>
            </div>
            <div>
                <h3 className="font-semibold text-gray-900 mb-1">{`${employee.firstName} ${employee.lastName}`}</h3>
                <p className="text-sm text-gray-600 mb-1">{employee.jobTitle}</p>
                <p className="text-xs font-medium text-blue-600 mb-2">{t(`enum.userRole.${employee.role}`)}</p>
                <p className="text-xs text-gray-500 mb-3">{employee.department}</p>
                <div className="flex items-center justify-between text-xs">
                    <span className={`${EMPLOYEE_STATUS_CLASSES[employee.status].bg} ${EMPLOYEE_STATUS_CLASSES[employee.status].text} px-2 py-1 rounded-full`}>
                        {t(`enum.employeeStatus.${employee.status}`)}
                    </span>
                    <span className="text-gray-500">{t('common.id')}: {employee.id}</span>
                </div>
            </div>
        </div>
    );
});

export default EmployeeCard;
