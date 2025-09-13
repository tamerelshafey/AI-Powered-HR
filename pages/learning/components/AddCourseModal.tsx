
import React from 'react';
import { CourseCategory } from '../../../types';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose }) => {

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('تمت إضافة الدورة بنجاح!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalHeader title="إضافة دورة جديدة" onClose={onClose} />
        <ModalBody>
            <form id="add-course-form" className="space-y-6" onSubmit={handleSubmit}>
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
            </form>
        </ModalBody>
        <ModalFooter>
            <div className="flex justify-end space-x-3 space-x-reverse">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                إلغاء
                </button>
                <button type="submit" form="add-course-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                إضافة الدورة
                </button>
            </div>
        </ModalFooter>
    </Modal>
  );
};

export default AddCourseModal;
