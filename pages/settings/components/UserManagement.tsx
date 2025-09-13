

import React from 'react';
import { useUser } from '../../../context/UserContext';
import { User, UserStatus } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import { USER_STATUS_CLASSES } from '../../../utils/styleUtils';

const UserManagement: React.FC = () => {
    const { availableUsers } = useUser();
    const { t } = useI18n();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">إدارة المستخدمين</h3>
                        <p className="text-sm text-gray-600 mt-1">إدارة وصول المستخدمين وأدوارهم وصلاحياتهم.</p>
                    </div>
                    <button className="mt-4 sm:mt-0 flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        <i className="fas fa-user-plus"></i>
                        <span>دعوة مستخدم</span>
                    </button>
                </div>
            </div>

            <div className="p-4 border-b border-gray-100">
                <div className="flex space-x-4 space-x-reverse">
                    <input type="text" placeholder="بحث بالاسم أو البريد الإلكتروني..." className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
            </div>
            
            {/* Mobile View */}
            <div className="md:hidden">
                <div className="p-4 space-y-4">
                    {availableUsers.map(user => (
                        <div key={user.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                            <div className="flex items-center">
                                <img className="h-10 w-10 rounded-full me-4" src={user.avatar} alt={user.name} loading="lazy" />
                                <div>
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.jobTitle}</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm border-t pt-2">
                                <div><p className="text-xs text-gray-500">الدور</p><p className="font-medium text-gray-800">{t(`enum.userRole.${user.role}`)}</p></div>
                                <div>
                                    <p className="text-xs text-gray-500">الحالة</p>
                                    <p className="font-medium">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${USER_STATUS_CLASSES[user.status]}`}>
                                            {t(`enum.userStatus.${user.status}`)}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end pt-2 text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900">تعديل</button>
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
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">المستخدم</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الدور</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الحالة</th>
                            <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {availableUsers.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full me-4" src={user.avatar} alt={user.name} loading="lazy" />
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.jobTitle}</div>
                                            <div className="text-xs text-gray-400">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t(`enum.userRole.${user.role}`)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${USER_STATUS_CLASSES[user.status]}`}>
                                        {t(`enum.userStatus.${user.status}`)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900">تعديل</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
