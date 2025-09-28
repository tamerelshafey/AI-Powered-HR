


import React from 'react';
import { Link } from 'react-router-dom';
import { AttendanceRecord, AttendanceStatus } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import { ATTENDANCE_STATUS_CLASSES } from '../../../utils/styleUtils';
import { formatTimeFromString } from '../../../utils/formatters';

interface AttendanceTableProps {
  records: AttendanceRecord[];
  onRowClick: (employeeId: string) => void;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records, onRowClick }) => {
    const { t, language } = useI18n();

    const formatHours = (hoursString: string) => {
        if (hoursString === '...') return '...';
        const [hours, minutes] = hoursString.split(':');
        return t('page.attendance.table.hoursUnit', { hours, minutes });
    };

    return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.attendance.table.title')}</h3>
                 <span className="text-sm text-gray-500">{records.length} سجل</span>
            </div>
        </div>
        
        {/* Mobile View */}
        <div className="md:hidden">
            <div className="p-4 space-y-4">
                {records.map(({ employee, checkIn, checkOut, status, hours, shift }) => (
                    <div key={employee.id} onClick={() => onRowClick(employee.id)} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 cursor-pointer">
                        <div className="flex items-center justify-between">
                             <div className="flex items-center">
                                <div className={`w-10 h-10 ${employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                                    <span className="text-white text-sm font-medium">{employee.avatarInitials}</span>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{`${employee.firstName} ${employee.lastName}`}</div>
                                    <div className="text-xs text-gray-500">{employee.jobTitle}</div>
                                    <div className="text-sm text-gray-500 mt-1">{employee.branch} &bull; {employee.department}</div>
                                </div>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ATTENDANCE_STATUS_CLASSES[status]}`}>
                                {t(`enum.attendanceStatus.${status}`)}
                            </span>
                        </div>
                         {shift && (
                             <div className="text-xs text-center border-t pt-2 text-gray-600">
                                <i className="fas fa-sun me-1 text-yellow-500"></i>
                                {t('page.attendance.table.header.shift')}: <span className="font-medium">{t(`enum.shift.${shift.name}`)}</span>
                            </div>
                        )}
                        <div className="grid grid-cols-3 gap-2 text-center text-sm border-t border-b py-2">
                            <div><p className="text-xs text-gray-500">{t('page.attendance.table.header.checkIn')}</p><p className="font-medium text-gray-800">{formatTimeFromString(checkIn, language)}</p></div>
                            <div><p className="text-xs text-gray-500">{t('page.attendance.table.header.checkOut')}</p><p className="font-medium text-gray-800">{formatTimeFromString(checkOut, language)}</p></div>
                            <div><p className="text-xs text-gray-500">{t('page.attendance.table.header.hours')}</p><p className="font-medium text-gray-800">{formatHours(hours)}</p></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Desktop View */}
        <div className="overflow-x-auto hidden md:block">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.employee')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.branch')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.department')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.shift')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.checkIn')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.checkOut')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.status')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.hours')}</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {records.map(({ employee, checkIn, checkOut, status, hours, shift }) => (
                        <tr key={employee.id} onClick={() => onRowClick(employee.id)} className="hover:bg-gray-50 cursor-pointer">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className={`w-8 h-8 ${employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                                        <span className="text-white text-xs font-medium">{employee.avatarInitials}</span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{`${employee.firstName} ${employee.lastName}`}</div>
                                        <div className="text-sm text-gray-500">{employee.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.branch}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift ? t(`enum.shift.${shift.name}`) : '--'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatTimeFromString(checkIn, language)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTimeFromString(checkOut, language)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ATTENDANCE_STATUS_CLASSES[status]}`}>
                                    {t(`enum.attendanceStatus.${status}`)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatHours(hours)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};
export default AttendanceTable;