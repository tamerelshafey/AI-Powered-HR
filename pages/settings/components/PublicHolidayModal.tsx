import React from 'react';
import { PublicHoliday } from '../../../types';

interface PublicHolidayModalProps {
  isOpen: boolean;
  onClose: () => void;
  holiday: PublicHoliday | null;
}

const PublicHolidayModal: React.FC<PublicHolidayModalProps> = ({ isOpen, onClose, holiday }) => {
  if (!isOpen) return null;

  const isEditing = !!holiday;
  const title = isEditing ? 'تعديل عطلة رسمية' : 'إضافة عطلة رسمية جديدة';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم حفظ العطلة الرسمية!');
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
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم العطلة</label>
            <input type="text" defaultValue={holiday?.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ</label>
            <input type="date" defaultValue={holiday?.date} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
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

export default PublicHolidayModal;
