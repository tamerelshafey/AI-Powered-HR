
import React from 'react';
import { useUser } from '../../../context/UserContext';

const ProfileSection: React.FC = () => {
    const { currentUser } = useUser();
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">ملفي الشخصي</h2>
                <p className="text-gray-600">إدارة معلوماتك الشخصية وتفضيلاتك</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="text-center">
                        <div 
                            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 bg-cover bg-center"
                            style={{ backgroundImage: `url(${currentUser.avatar})` }}
                        >
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{currentUser.name}</h3>
                        <p className="text-gray-600">{currentUser.jobTitle}</p>
                        <p className="text-sm text-gray-500 mt-1">{currentUser.department}</p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <i className="fas fa-camera me-2"></i>تغيير الصورة
                        </button>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="space-y-3">
                            <div className="flex justify-between"><span className="text-sm text-gray-600">رقم الموظف</span><span className="text-sm font-medium text-gray-900">{currentUser.id.replace('usr_', 'EMP-').toUpperCase()}</span></div>
                            <div className="flex justify-between"><span className="text-sm text-gray-600">تاريخ البدء</span><span className="text-sm font-medium text-gray-900">15 يناير، 2022</span></div>
                            <div className="flex justify-between"><span className="text-sm text-gray-600">المدير</span><span className="text-sm font-medium text-gray-900">سارة جونسون</span></div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">المعلومات الشخصية</h3>
                    <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأول</label>
                                <input type="text" defaultValue={currentUser.name.split(' ')[0]} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الأخير</label>
                                <input type="text" defaultValue={currentUser.name.split(' ').slice(1).join(' ')} className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
                            <button type="button" className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">إلغاء</button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">حفظ التغييرات</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
