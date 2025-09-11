
import React from 'react';
import { SalaryComponent, SalaryComponentType } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface SalaryComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  component: SalaryComponent | null;
}

const SalaryComponentModal: React.FC<SalaryComponentModalProps> = ({ isOpen, onClose, component }) => {
  const { t } = useI18n();
  if (!isOpen) return null;

  const isEditing = !!component;
  const title = isEditing ? 'تعديل مكون راتب' : 'إضافة مكون راتب جديد';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم حفظ مكون الراتب!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم المكون</label>
            <input type="text" defaultValue={component?.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع المكون</label>
            <select defaultValue={component?.type || SalaryComponentType.EARNING} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                <option value={SalaryComponentType.EARNING}>{t(`enum.salaryComponentType.${SalaryComponentType.EARNING}`)}</option>
                <option value={SalaryComponentType.DEDUCTION}>{t(`enum.salaryComponentType.${SalaryComponentType.DEDUCTION}`)}</option>
            </select>
          </div>
          <div className="flex items-center">
            <input 
                id="isTaxable"
                type="checkbox" 
                defaultChecked={component?.isTaxable}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 me-2" 
            />
            <label htmlFor="isTaxable" className="text-sm font-medium text-gray-700">هذا المكون خاضع للضريبة</label>
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

export default SalaryComponentModal;
