import React from 'react';
import { CourseCategory } from '../../../types';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('تمت إضافة الدورة بنجاح!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">إضافة دورة جديدة</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الدورة</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                {Object.values(CourseCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">مقدم الدورة</label>
              <input type="text" placeholder="مثال: Coursera, Internal" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
           <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">المدة (بالساعات)</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
            <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
          </div>
          <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              إضافة الدورة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
