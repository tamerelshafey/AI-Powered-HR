import React from 'react';

const GeneralSettings: React.FC = () => {
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('تم حفظ الإعدادات العامة!');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">الإعدادات العامة</h3>
                <p className="text-sm text-gray-600 mt-1">إدارة معلومات الشركة الأساسية والعلامة التجارية.</p>
            </div>
            
            <div className="p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">اسم الشركة</label>
                    <input type="text" defaultValue="Bokra HR" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">شعار الشركة</label>
                    <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                           <i className="fas fa-building text-3xl text-gray-400"></i>
                        </div>
                        <input type="file" id="logo-upload" className="hidden" />
                        <label htmlFor="logo-upload" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                            تغيير الشعار
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة الزمنية</label>
                        <select defaultValue="Cairo" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500">
                            <option value="Riyadh">(GMT+03:00) Riyadh</option>
                            <option value="Cairo">(GMT+02:00) Cairo</option>
                            <option value="Dubai">(GMT+04:00) Dubai</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">العملة</label>
                        <select defaultValue="EGP" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500">
                            <option value="SAR">الريال السعودي (SAR)</option>
                            <option value="EGP">الجنيه المصري (EGP)</option>
                            <option value="AED">الدرهم الإماراتي (AED)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-xl border-t border-gray-200">
                <div className="flex justify-end">
                    <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        حفظ التغييرات
                    </button>
                </div>
            </div>
        </form>
    );
};

export default GeneralSettings;