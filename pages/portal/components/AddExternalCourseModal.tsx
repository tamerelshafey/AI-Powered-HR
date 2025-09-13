
import React from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface AddExternalCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddExternalCourseModal: React.FC<AddExternalCourseModalProps> = ({ isOpen, onClose }) => {

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('تمت إضافة الدورة الخارجية بنجاح!');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalHeader title="إضافة دورة خارجية مكتملة" onClose={onClose} />
        <ModalBody>
            <form id="add-course-form" className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم الدورة</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">مركز التدريب</label>
                <input type="text" placeholder="مثال: Coursera, Udemy" className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانتهاء</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">النتيجة/التقدير (اختياري)</label>
                <input type="text" placeholder="مثال: 95% أو 'ناجح'" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">إرفاق الشهادة</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <i className="fas fa-file-certificate mx-auto h-12 w-12 text-gray-400"></i>
                    <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>اختر ملف</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="ps-1">أو اسحبه وأفلته هنا</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, PNG, JPG حتى 5MB</p>
                </div>
                </div>
            </div>
            </form>
        </ModalBody>
        <ModalFooter>
             <div className="flex justify-end space-x-3 space-x-reverse">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                إلغاء
                </button>
                <button type="submit" form="add-course-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                حفظ الدورة
                </button>
            </div>
        </ModalFooter>
      </Modal>
  );
};

export default AddExternalCourseModal;
