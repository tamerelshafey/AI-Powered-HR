import React from 'react';
import { Course, Employee } from '../../../types';

interface EnrollEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  employees: Employee[];
}

const EnrollEmployeeModal: React.FC<EnrollEmployeeModalProps> = ({ isOpen, onClose, courses, employees }) => {
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('تم تسجيل الموظف بنجاح!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">تسجيل موظف في دورة</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
        
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اختر الدورة</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                <option>-- اختر دورة --</option>
                {courses.map(course => <option key={course.id} value={course.id}>{course.title}</option>)}
            </select>
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">اختر الموظف</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                <option>-- اختر موظفًا --</option>
                {employees.map(emp => <option key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</option>)}
            </select>
          </div>
          <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              إلغاء
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              تسجيل
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollEmployeeModal;
