
import React, { useRef, useCallback } from 'react';
import { Employee, OnlineStatus, EmployeeStatus } from '../../../types';
import useOnScreen from '../../../hooks/useOnScreen';
import { useI18n } from '../../../context/I18nContext';
import { ONLINE_STATUS_CLASSES, EMPLOYEE_STATUS_CLASSES } from '../../../utils/styleUtils';

interface EmployeeListItemProps {
  employee: Employee;
  onClick: (id: string) => void;
}

const EmployeeListItem: React.FC<EmployeeListItemProps> = React.memo(({ employee, onClick }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(itemRef, '100px');
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
            ref={itemRef}
            className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 cursor-pointer flex items-center justify-between space-x-4 space-x-reverse focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View profile for ${employee.firstName} ${employee.lastName}`}
        >
            <div className="flex items-center flex-1 min-w-0">
                <div className="relative flex-shrink-0">
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
                <div className="ms-4 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{`${employee.firstName} ${employee.lastName}`}</p>
                    <p className="text-sm text-gray-600 truncate">{employee.jobTitle}</p>
                </div>
            </div>
            
            <div className="hidden md:block text-sm text-gray-700 w-40 text-center">{employee.department}</div>

            <div className="hidden lg:block text-sm text-gray-600 w-48 text-center">{t(`enum.userRole.${employee.role}`)}</div>
            
            <div className="flex items-center space-x-4 space-x-reverse flex-shrink-0">
                 <span className={`hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-medium ${EMPLOYEE_STATUS_CLASSES[employee.status].bg} ${EMPLOYEE_STATUS_CLASSES[employee.status].text}`}>
                    {t(`enum.employeeStatus.${employee.status}`)}
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100" aria-label="More options">
                    <i className="fas fa-ellipsis-v"></i>
                </button>
            </div>
        </div>
    );
});

export default EmployeeListItem;
