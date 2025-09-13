
import React from 'react';
import { Course, Employee } from '../../../types';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface EnrollEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  employees: Employee[];
}

const EnrollEmployeeModal: React.FC<EnrollEmployeeModalProps> = ({ isOpen, onClose, courses, employees }) => {

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('تم تسجيل الموظف بنجاح!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalHeader title="تسجيل موظف في دورة" onClose={onClose} />
        <ModalBody>
            <form id="enroll-form" className="space-y-6" onSubmit={handleSubmit}>
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
            </form>
        </ModalBody>
        <ModalFooter>
            <div className="flex justify-end space-x-3 space-x-reverse">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                إلغاء
                </button>
                <button type="submit" form="enroll-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                تسجيل
                </button>
            </div>
        </ModalFooter>
      </Modal>
  );
};

export default EnrollEmployeeModal;
