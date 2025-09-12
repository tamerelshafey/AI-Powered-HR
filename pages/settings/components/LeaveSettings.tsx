

import React, { useState } from 'react';
import { leaveTypeSettingsData, publicHolidaysData } from '../data';
import { LeaveTypeSetting, PublicHoliday } from '../../../types';
import LeaveTypeModal from './LeaveTypeModal';
import PublicHolidayModal from './PublicHolidayModal';
import { useI18n } from '../../../context/I18nContext';
import { formatDate } from '../../../utils/formatters';

const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    gray: 'bg-gray-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    teal: 'bg-teal-500',
    indigo: 'bg-indigo-500',
};

const LeaveSettings: React.FC = () => {
    const { language } = useI18n();
    const [leaveTypes, setLeaveTypes] = useState<LeaveTypeSetting[]>(leaveTypeSettingsData);
    const [holidays, setHolidays] = useState<PublicHoliday[]>(publicHolidaysData);
    
    const [isLeaveTypeModalOpen, setLeaveTypeModalOpen] = useState(false);
    const [editingLeaveType, setEditingLeaveType] = useState<LeaveTypeSetting | null>(null);

    const [isHolidayModalOpen, setHolidayModalOpen] = useState(false);
    const [editingHoliday, setEditingHoliday] = useState<PublicHoliday | null>(null);

    const handleOpenLeaveTypeModal = (leaveType: LeaveTypeSetting | null = null) => {
        setEditingLeaveType(leaveType);
        setLeaveTypeModalOpen(true);
    };

    const handleOpenHolidayModal = (holiday: PublicHoliday | null = null) => {
        setEditingHoliday(holiday);
        setHolidayModalOpen(true);
    };
    
    return (
        <div className="space-y-8">
            {/* Leave Types Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">إدارة أنواع الإجازات</h3>
                        <p className="text-sm text-gray-600 mt-1">تحديد أنواع الإجازات المتاحة للموظفين وأرصدتها السنوية.</p>
                    </div>
                    <button onClick={() => handleOpenLeaveTypeModal()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        <i className="fas fa-plus me-2"></i>إضافة نوع
                    </button>
                </div>

                {/* Mobile View */}
                <div className="md:hidden">
                    <div className="p-4 space-y-4">
                        {leaveTypes.map(lt => (
                            <div key={lt.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center">
                                        <span className={`w-4 h-4 rounded-full me-3 ${colorMap[lt.color] || 'bg-gray-400'}`}></span>
                                        <span className="text-sm font-medium text-gray-900">{lt.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-800 font-medium">{lt.balanceDays > 0 ? `${lt.balanceDays} يوم` : 'غير محدود'}</span>
                                </div>
                                <div className="text-xs flex flex-wrap gap-1 border-t pt-2">
                                    {lt.isDeductedFromAnnual && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">تخصم من السنوي</span>}
                                    {lt.maxTimesInService === 1 && <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">مرة واحدة</span>}
                                    {lt.eligibilityYears && <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">تتطلب {lt.eligibilityYears} سنوات</span>}
                                </div>
                                <div className="flex justify-end pt-2 text-sm font-medium">
                                    <button onClick={() => handleOpenLeaveTypeModal(lt)} className="text-blue-600 hover:text-blue-900">تعديل</button>
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
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">النوع</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الرصيد (أيام)</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الخصائص</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {leaveTypes.map(lt => (
                                <tr key={lt.id}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <span className={`w-4 h-4 rounded-full me-3 ${colorMap[lt.color] || 'bg-gray-400'}`}></span>
                                            <span className="text-sm font-medium text-gray-900">{lt.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{lt.balanceDays > 0 ? lt.balanceDays : 'غير محدود'}</td>
                                    <td className="px-6 py-4 text-xs">
                                        <div className="flex flex-wrap gap-1">
                                            {lt.isDeductedFromAnnual && <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">تخصم من السنوي</span>}
                                            {lt.maxTimesInService === 1 && <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">مرة واحدة</span>}
                                            {lt.eligibilityYears && <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full">تتطلب {lt.eligibilityYears} سنوات خدمة</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        <button onClick={() => handleOpenLeaveTypeModal(lt)} className="text-blue-600 hover:text-blue-800">تعديل</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Advanced Leave Policies Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">سياسات الإجازات المتقدمة</h3>
                    <p className="text-sm text-gray-600 mt-1">تكوين قواعد إضافية تتوافق مع قانون العمل المصري رقم 14 لسنة 2025.</p>
                </div>
                 <div className="p-6 divide-y divide-gray-200">
                    <div className="py-4">
                        <p className="font-medium text-gray-800">سياسة الإجازات السنوية (وفقًا للقانون)</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                            <li><span className="font-semibold">السنة الأولى:</span> 15 يومًا (لا يمكن الاستفادة منها إلا بعد مرور 6 أشهر).</li>
                            <li><span className="font-semibold">من السنة الثانية:</span> 21 يومًا.</li>
                            <li><span className="font-semibold">بعد 10 سنوات خدمة أو تجاوز سن الـ 50:</span> 30 يومًا.</li>
                        </ul>
                    </div>
                    <div className="py-4 flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-800">الحد الأقصى للإجازة العارضة المتتالية</p>
                            <p className="text-sm text-gray-500">الحد الأقصى لعدد أيام الإجازة العارضة التي يمكن أخذها في مرة واحدة (وفقًا للقانون).</p>
                        </div>
                        <input type="number" value="2" disabled className="w-20 px-3 py-1 border border-gray-300 rounded-lg bg-gray-100" />
                    </div>
                </div>
            </div>

            {/* Public Holidays Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900">تقويم العطلات الرسمية</h3>
                        <p className="text-sm text-gray-600 mt-1">إدارة العطلات الرسمية للشركة. سيتم خصم هذه الأيام تلقائيًا من طلبات الإجازات.</p>
                    </div>
                    <button onClick={() => handleOpenHolidayModal()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        <i className="fas fa-plus me-2"></i>إضافة عطلة
                    </button>
                </div>
                 <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {holidays.map(holiday => (
                        <div key={holiday.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800 text-sm">{holiday.name}</p>
                                <p className="text-xs text-gray-500">{formatDate(holiday.date, language)}</p>
                            </div>
                            <button onClick={() => handleOpenHolidayModal(holiday)} className="text-gray-400 hover:text-blue-600"><i className="fas fa-pencil-alt"></i></button>
                        </div>
                    ))}
                </div>
            </div>

            {isLeaveTypeModalOpen && (
                <LeaveTypeModal 
                    isOpen={isLeaveTypeModalOpen} 
                    onClose={() => setLeaveTypeModalOpen(false)}
                    leaveType={editingLeaveType}
                />
            )}
            {isHolidayModalOpen && (
                <PublicHolidayModal
                    isOpen={isHolidayModalOpen}
                    onClose={() => setHolidayModalOpen(false)}
                    holiday={editingHoliday}
                />
            )}
        </div>
    );
};
export default LeaveSettings;