
import React from 'react';
import { AttendanceRecord, AttendanceStatus } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface AttendanceTableProps {
  records: AttendanceRecord[];
}

const statusClasses: Record<AttendanceStatus, string> = {
    [AttendanceStatus.PRESENT]: 'bg-green-100 text-green-800',
    [AttendanceStatus.ABSENT]: 'bg-red-100 text-red-800',
    [AttendanceStatus.LATE]: 'bg-orange-100 text-orange-800',
    [AttendanceStatus.EARLY_DEPARTURE]: 'bg-purple-100 text-purple-800',
    [AttendanceStatus.ON_LEAVE]: 'bg-yellow-100 text-yellow-800',
};

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records }) => {
    const { t, language } = useI18n();
    const timeFormatter = new Intl.DateTimeFormat(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    const formatTime = (timeString: string | null) => {
        if (!timeString) return '--:--';
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        return timeFormatter.format(date);
    };

    const formatHours = (hoursString: string) => {
        const [hours, minutes] = hoursString.split(':');
        return t('page.attendance.table.hoursUnit', { hours, minutes });
    };

    return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.attendance.table.title')}</h3>
                <div className="flex items-center space-x-2 space-x-reverse">
                    <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                        <option>{t('page.attendance.table.allDepartments')}</option>
                        <option>{t('nav.departments')}</option>
                    </select>
                    <button className="text-sm text-blue-600 hover:text-blue-700">{t('page.attendance.table.viewAll')}</button>
                </div>
            </div>
        </div>
        
        {/* Mobile View */}
        <div className="md:hidden">
            <div className="p-4 space-y-4">
                {records.map(({ employee, checkIn, checkOut, status, hours, shift }) => (
                    <div key={employee.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                             <div className="flex items-center">
                                <div className={`w-8 h-8 ${employee.avatarColor} rounded-full flex items-center justify-center me-3 flex-shrink-0`}>
                                    <span className="text-white text-xs font-medium">{employee.avatarInitials}</span>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{`${employee.firstName} ${employee.lastName}`}</div>
                                    <div className="text-sm text-gray-500">{employee.department}</div>
                                </div>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
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
                            <div><p className="text-xs text-gray-500">{t('page.attendance.table.header.checkIn')}</p><p className="font-medium text-gray-800">{formatTime(checkIn)}</p></div>
                            <div><p className="text-xs text-gray-500">{t('page.attendance.table.header.checkOut')}</p><p className="font-medium text-gray-800">{formatTime(checkOut)}</p></div>
                            <div><p className="text-xs text-gray-500">{t('page.attendance.table.header.hours')}</p><p className="font-medium text-gray-800">{formatHours(hours)}</p></div>
                        </div>
                         <div className="flex justify-end space-x-3 space-x-reverse text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900">{t('common.edit')}</button>
                            <button className="text-red-600 hover:text-red-900">{t('page.attendance.table.report')}</button>
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
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.department')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.shift')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.checkIn')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.checkOut')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.status')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.hours')}</th>
                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('page.attendance.table.header.actions')}</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {records.map(({ employee, checkIn, checkOut, status, hours, shift }) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{shift ? t(`enum.shift.${shift.name}`) : '--'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatTime(checkIn)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatTime(checkOut)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses[status]}`}>
                                    {t(`enum.attendanceStatus.${status}`)}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatHours(hours)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 me-3">{t('common.edit')}</button>
                                <button className="text-red-600 hover:text-red-900">{t('page.attendance.table.report')}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};
export default AttendanceTable;
