import React from 'react';
import { Department, Employee } from '../../../types';

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  department: Department | null;
  allDepartments: Department[];
  allEmployees: Employee[];
}

const DepartmentModal: React.FC<DepartmentModalProps> = ({ isOpen, onClose, department, allDepartments, allEmployees }) => {
  if (!isOpen) return null;

  const isEditing = !!department;
  const title = isEditing ? 'تعديل القسم' : 'إضافة قسم جديد';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم حفظ القسم بنجاح!');
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اسم القسم</label>
            <input type="text" defaultValue={department?.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">مدير القسم</label>
                <select defaultValue={department?.manager.id} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                    <option value="">-- اختر مديرًا --</option>
                    {allEmployees.map(emp => (
                        <option key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">يتبع لقسم (اختياري)</label>
                <select defaultValue={department?.parentDepartmentId || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                    <option value="">-- لا يوجد (قسم رئيسي) --</option>
                     {allDepartments.filter(d => d.id !== department?.id).map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                </select>
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

export default DepartmentModal;
