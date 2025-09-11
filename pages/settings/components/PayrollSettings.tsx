
import React, { useState } from 'react';
import { salaryComponentsData } from '../data';
import { SalaryComponent, SalaryComponentType } from '../../../types';
import SalaryComponentModal from './SalaryComponentModal';
import { useI18n } from '../../../context/I18nContext';

const typeClasses: Record<SalaryComponentType, string> = {
    [SalaryComponentType.EARNING]: 'bg-green-100 text-green-800',
    [SalaryComponentType.DEDUCTION]: 'bg-red-100 text-red-800',
};

const PayrollSettings: React.FC = () => {
    const [components, setComponents] = useState<SalaryComponent[]>(salaryComponentsData);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingComponent, setEditingComponent] = useState<SalaryComponent | null>(null);
    const { t } = useI18n();

    const handleOpenModal = (component: SalaryComponent | null = null) => {
        setEditingComponent(component);
        setModalOpen(true);
    };

    return (
        <div className="space-y-8">
            {/* Salary Components Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">مكونات الراتب</h3>
                        <p className="text-sm text-gray-600 mt-1">تعريف بنود الإيرادات والخصومات المستخدمة في حساب الرواتب.</p>
                    </div>
                    <button onClick={() => handleOpenModal()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                        <i className="fas fa-plus me-2"></i>إضافة مكون
                    </button>
                </div>

                 {/* Mobile View */}
                <div className="md:hidden">
                    <div className="p-4 space-y-4">
                        {components.map(comp => (
                             <div key={comp.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <p className="font-semibold text-gray-800">{comp.name}</p>
                                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeClasses[comp.type]}`}>
                                        {t(`enum.salaryComponentType.${comp.type}`)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-t pt-2">
                                     <p className="text-gray-600">خاضع للضريبة: <span className="font-medium text-gray-800">{comp.isTaxable ? t('common.yes') : t('common.no')}</span></p>
                                     <button onClick={() => handleOpenModal(comp)} className="text-sm font-medium text-blue-600 hover:text-blue-900">{t('common.edit')}</button>
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
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الاسم</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">النوع</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">خاضع للضريبة</th>
                                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {components.map(comp => (
                                <tr key={comp.id}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{comp.name}</td>
                                    <td className="px-6 py-4">
                                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeClasses[comp.type]}`}>
                                            {t(`enum.salaryComponentType.${comp.type}`)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{comp.isTaxable ? t('common.yes') : t('common.no')}</td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        <button onClick={() => handleOpenModal(comp)} className="text-blue-600 hover:text-blue-800">{t('common.edit')}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Social Insurance Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">إعدادات التأمينات الاجتماعية</h3>
                    <p className="text-sm text-gray-600 mt-1">تحديد نسب مساهمة الموظف والشركة وفقًا للقانون المصري.</p>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">نسبة مساهمة الموظف (%)</label>
                        <input type="number" step="0.01" defaultValue="11" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">نسبة مساهمة الشركة (%)</label>
                        <input type="number" step="0.01" defaultValue="18.75" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                    </div>
                </div>
            </div>

            {/* Income Tax Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">إعدادات ضريبة الدخل</h3>
                    <p className="text-sm text-gray-600 mt-1">تكوين إعدادات ضريبة كسب العمل.</p>
                </div>
                <div className="p-6">
                    <div className="py-4 flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-800">تفعيل الحساب التلقائي للضريبة</p>
                            <p className="text-sm text-gray-500">حساب ضريبة الدخل تلقائيًا عند تشغيل مسير الرواتب.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
            </div>
            
            {isModalOpen && (
                <SalaryComponentModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    component={editingComponent}
                />
            )}
        </div>
    );
};
export default PayrollSettings;
