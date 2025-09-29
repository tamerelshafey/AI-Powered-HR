

import React, { useState, useEffect } from 'react';
import { SalaryComponent, SalaryComponentType } from '../../../types';
import { getSalaryComponents } from '../../../services/api';
import SalaryComponentModal from './SalaryComponentModal';
import ApplyAnnualRaiseModal from './ApplyAnnualRaiseModal';
import { useI18n } from '../../../context/I18nContext';
import LoadingSpinner from '../../../components/LoadingSpinner';

const typeClasses: Record<SalaryComponentType, string> = {
    [SalaryComponentType.EARNING]: 'bg-green-100 text-green-800',
    [SalaryComponentType.DEDUCTION]: 'bg-red-100 text-red-800',
};

const PayrollSettings: React.FC = () => {
    const [components, setComponents] = useState<SalaryComponent[]>([]);
    const [loading, setLoading] = useState(true);
    const [isComponentModalOpen, setComponentModalOpen] = useState(false);
    const [isRaiseModalOpen, setRaiseModalOpen] = useState(false);
    const [editingComponent, setEditingComponent] = useState<SalaryComponent | null>(null);
    const { t } = useI18n();

    const taxBrackets = [
        { id: 1, incomeKey: 'payroll.incomeTax.bracket1.income', rateKey: 'payroll.incomeTax.bracket1.rate' },
        { id: 2, incomeKey: 'payroll.incomeTax.bracket2.income', rateKey: 'payroll.incomeTax.bracket2.rate' },
        { id: 3, incomeKey: 'payroll.incomeTax.bracket3.income', rateKey: 'payroll.incomeTax.bracket3.rate' },
        { id: 4, incomeKey: 'payroll.incomeTax.bracket4.income', rateKey: 'payroll.incomeTax.bracket4.rate' },
        { id: 5, incomeKey: 'payroll.incomeTax.bracket5.income', rateKey: 'payroll.incomeTax.bracket5.rate' },
        { id: 6, incomeKey: 'payroll.incomeTax.bracket6.income', rateKey: 'payroll.incomeTax.bracket6.rate' },
        { id: 7, incomeKey: 'payroll.incomeTax.bracket7.income', rateKey: 'payroll.incomeTax.bracket7.rate' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getSalaryComponents();
                setComponents(data);
            } catch (error) {
                console.error("Failed to fetch salary components", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleOpenComponentModal = (component: SalaryComponent | null = null) => {
        setEditingComponent(component);
        setComponentModalOpen(true);
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[60vh] flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Salary Components Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">مكونات الراتب</h3>
                        <p className="text-sm text-gray-600 mt-1">تعريف بنود الإيرادات والخصومات المستخدمة في حساب الرواتب.</p>
                    </div>
                    <button onClick={() => handleOpenComponentModal()} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
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
                                     <button onClick={() => handleOpenComponentModal(comp)} className="text-sm font-medium text-blue-600 hover:text-blue-900">{t('common.edit')}</button>
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
                                        <button onClick={() => handleOpenComponentModal(comp)} className="text-blue-600 hover:text-blue-800">{t('common.edit')}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Annual Raise Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">سياسة العلاوة السنوية</h3>
                    <p className="text-sm text-gray-600 mt-1">تكوين العلاوة الدورية الإلزامية وفقًا للقانون رقم 14 لسنة 2025.</p>
                </div>
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">نسبة العلاوة السنوية (%)</label>
                        <input type="number" step="0.1" min="3" defaultValue="3" className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg" />
                        <p className="text-xs text-gray-500 mt-1">{t('payroll.annualRaise.description')}</p>
                    </div>
                     <button onClick={() => setRaiseModalOpen(true)} className="mt-4 sm:mt-0 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                        <i className="fas fa-rocket me-2"></i>{t('annualRaise.run')}
                    </button>
                </div>
            </div>

            {/* Social Insurance Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">إعدادات التأمينات الاجتماعية</h3>
                    <p className="text-sm text-gray-600 mt-1">{t('payroll.socialInsurance.description')}</p>
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
                    <div className="pb-4 flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-800">تفعيل الحساب التلقائي للضريبة</p>
                            <p className="text-sm text-gray-500">حساب ضريبة الدخل تلقائيًا عند تشغيل مسير الرواتب.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div className="mt-6 border-t pt-6">
                        <h4 className="font-semibold text-gray-800 mb-3">{t('payroll.incomeTax.bracketsTitle')}</h4>
                        <div className="overflow-x-auto border rounded-lg">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-start font-medium text-gray-600">{t('payroll.incomeTax.table.bracket')}</th>
                                        <th className="px-4 py-3 text-start font-medium text-gray-600">{t('payroll.incomeTax.table.income')}</th>
                                        <th className="px-4 py-3 text-start font-medium text-gray-600">{t('payroll.incomeTax.table.rate')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {taxBrackets.map((bracket, index) => (
                                        <tr key={bracket.id}>
                                            <td className="px-4 py-3 font-medium text-gray-700">{t(`payroll.incomeTax.bracket${index + 1}`)}</td>
                                            <td className="px-4 py-3 text-gray-600">{t(bracket.incomeKey)}</td>
                                            <td className="px-4 py-3 font-semibold text-gray-800">{t(bracket.rateKey)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                         <p className="text-xs text-gray-500 mt-3">{t('payroll.incomeTax.personalExemptionNote')}</p>
                    </div>
                </div>
            </div>
            
            {isComponentModalOpen && (
                <SalaryComponentModal
                    isOpen={isComponentModalOpen}
                    onClose={() => setComponentModalOpen(false)}
                    component={editingComponent}
                />
            )}
             {isRaiseModalOpen && (
                <ApplyAnnualRaiseModal
                    isOpen={isRaiseModalOpen}
                    onClose={() => setRaiseModalOpen(false)}
                />
            )}
        </div>
    );
};
export default PayrollSettings;