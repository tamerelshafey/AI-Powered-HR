import React from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface ReportBuilderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ReportBuilderModal: React.FC<ReportBuilderModalProps> = ({ isOpen, onClose }) => {

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        alert('جارٍ إنشاء التقرير المخصص...');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalHeader title="منشئ التقارير المخصصة" onClose={onClose} />
            <ModalBody>
                <form id="report-builder-form" onSubmit={handleGenerate}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Report Name */}
                            <div>
                                <label htmlFor="report-name" className="block text-sm font-medium text-gray-700 mb-2">اسم التقرير</label>
                                <input type="text" id="report-name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="أدخل اسم التقرير" />
                            </div>

                            {/* Report Type */}
                            <div>
                                <label htmlFor="report-type" className="block text-sm font-medium text-gray-700 mb-2">نوع التقرير</label>
                                <select id="report-type" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                                    <optgroup label="تقارير الحضور والإجازات">
                                        <option>ملخص الحضور</option>
                                        <option>تقرير التأخير</option>
                                        <option>تقرير العمل الإضافي</option>
                                        <option>تقرير سجل الإجازات</option>
                                        <option>تقرير أرصدة الإجازات</option>
                                    </optgroup>
                                    <optgroup label="تقارير الموظفين">
                                        <option>دليل الموظفين الكامل</option>
                                        <option>تقرير أعداد الموظفين</option>
                                        <option>تقرير معدل الدوران</option>
                                        <option>تقرير انتهاء صلاحية المستندات</option>
                                    </optgroup>
                                    <optgroup label="تقارير الرواتب">
                                        <option>ملخص مسير الرواتب</option>
                                        <option>تقرير كشوف الرواتب</option>
                                    </optgroup>
                                    <optgroup label="تقارير الأداء والتوظيف">
                                        <option>تقرير حالة مراجعات الأداء</option>
                                        <option>تقرير إنجاز الأهداف</option>
                                        <option>تقرير خط أنابيب التوظيف</option>
                                    </optgroup>
                                </select>
                            </div>
                            
                            {/* Time Period */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">الفترة الزمنية</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="start-date" className="block text-xs font-medium text-gray-500 mb-1">من تاريخ</label>
                                        <input type="date" id="start-date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div>
                                        <label htmlFor="end-date" className="block text-xs font-medium text-gray-500 mb-1">إلى تاريخ</label>
                                        <input type="date" id="end-date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                </div>
                            </div>

                            {/* Data Sources */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">مصادر البيانات (اختر الحقول لتضمينها في التقرير)</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    <label className="flex items-center space-x-2 space-x-reverse p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                        <span className="text-sm text-gray-700">بيانات الموظفين</span>
                                    </label>
                                    <label className="flex items-center space-x-2 space-x-reverse p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                                        <span className="text-sm text-gray-700">سجلات الحضور</span>
                                    </label>
                                    <label className="flex items-center space-x-2 space-x-reverse p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">بيانات الإجازات</span>
                                    </label>
                                    <label className="flex items-center space-x-2 space-x-reverse p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">بيانات الرواتب</span>
                                    </label>
                                     <label className="flex items-center space-x-2 space-x-reverse p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">بيانات الأداء</span>
                                    </label>
                                    <label className="flex items-center space-x-2 space-x-reverse p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        <span className="text-sm text-gray-700">بيانات التوظيف</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Preview and Format */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 mb-3">معاينة التقرير</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span className="text-gray-600">النوع:</span><span className="text-gray-900">ملخص الحضور</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">الفترة:</span><span className="text-gray-900">مخصصة</span></div>
                                <div className="flex justify-between"><span className="text-gray-600">الحجم المقدر:</span><span className="text-gray-900">~25 KB</span></div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <h5 className="font-medium text-gray-900 mb-2">تنسيق الإخراج</h5>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-2 space-x-reverse"><input type="radio" name="format" className="text-blue-600 focus:ring-blue-500" defaultChecked /><span className="text-sm text-gray-700">Excel (.xlsx)</span></label>
                                    <label className="flex items-center space-x-2 space-x-reverse"><input type="radio" name="format" className="text-blue-600 focus:ring-blue-500" /><span className="text-sm text-gray-700">PDF</span></label>
                                    <label className="flex items-center space-x-2 space-x-reverse"><input type="radio" name="format" className="text-blue-600 focus:ring-blue-500" /><span className="text-sm text-gray-700">CSV (.csv)</span></label>
                                    <label className="flex items-center space-x-2 space-x-reverse"><input type="radio" name="format" className="text-blue-600 focus:ring-blue-500" /><span className="text-sm text-gray-700">Word (.docx)</span></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <div className="flex justify-end space-x-3 space-x-reverse">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">إلغاء</button>
                    <button type="submit" form="report-builder-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">إنشاء التقرير</button>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default ReportBuilderModal;
