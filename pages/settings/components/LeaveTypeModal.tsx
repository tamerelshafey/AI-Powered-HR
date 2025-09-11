
import React from 'react';
import { LeaveTypeSetting, LeaveCategory, LeaveType } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface LeaveTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaveType: LeaveTypeSetting | null;
}

const LeaveTypeModal: React.FC<LeaveTypeModalProps> = ({ isOpen, onClose, leaveType }) => {
  const { t } = useI18n();
  if (!isOpen) return null;

  const isEditing = !!leaveType;
  const title = isEditing ? 'تعديل نوع الإجازة' : 'إضافة نوع إجازة جديد';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم حفظ نوع الإجازة!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم نوع الإجازة</label>
              <input type="text" defaultValue={leaveType ? t(`enum.leaveType.${leaveType.name}`) : ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
                <select defaultValue={leaveType?.category || LeaveCategory.STANDARD} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                    {Object.values(LeaveCategory).map(cat => (
                        <option key={cat} value={cat}>{t(`enum.leaveCategory.${cat}`)}</option>
                    ))}
                </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الرصيد السنوي (بالأيام)</label>
              <input type="number" defaultValue={leaveType?.balanceDays} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="اتركه فارغًا أو 0 لرصيد غير محدود" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اللون المميز</label>
              <select defaultValue={leaveType?.color || 'blue'} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                  <option value="blue">أزرق</option>
                  <option value="orange">برتقالي</option>
                  <option value="purple">بنفسجي</option>
                  <option value="pink">وردي</option>
                  <option value="green">أخضر</option>
                  <option value="red">أحمر</option>
                  <option value="yellow">أصفر</option>
                  <option value="teal">تركواز</option>
                  <option value="indigo">نيلي</option>
                  <option value="gray">رمادي</option>
              </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى لعدد الأيام لكل طلب</label>
                <input type="number" defaultValue={leaveType?.maxDaysPerRequest} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="اتركه فارغًا لعدم وجود حد" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأقصى لعدد المرات في الخدمة</label>
                <input type="number" defaultValue={leaveType?.maxTimesInService} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="اتركه فارغًا لعدم وجود حد" />
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked={leaveType?.isDeductedFromAnnual} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 me-2" />
                <span className="text-sm text-gray-700">تُخصم من رصيد الإجازة السنوية (للإجازات العارضة)</span>
              </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">سنوات الخدمة المطلوبة</label>
                <input type="number" defaultValue={leaveType?.eligibilityYears} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="مثال: 5" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">صالحة للاستخدام بعد (أشهر)</label>
                <input type="number" defaultValue={leaveType?.usableAfterMonths} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="مثال: 6" />
            </div>
          </div>

          <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">إلغاء</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">حفظ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveTypeModal;
