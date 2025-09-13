
import React from 'react';
import { JobTitle } from '../../../types';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface JobTitleModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: JobTitle | null; // For editing
  parentId?: string | null; // For adding a sub-level
  allJobTitles: JobTitle[];
}

const JobTitleModal: React.FC<JobTitleModalProps> = ({ isOpen, onClose, jobTitle, parentId, allJobTitles }) => {
  const isEditing = !!jobTitle;
  const title = isEditing ? 'تعديل المسمى الوظيفي' : 'إضافة مسمى وظيفي جديد';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('تم حفظ المسمى الوظيفي بنجاح!');
    onClose();
  };
  
  const modalFooter = (
    <div className="flex justify-end space-x-3 space-x-reverse">
        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">إلغاء</button>
        <button type="submit" form="job-title-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">حفظ</button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalHeader title={title} onClose={onClose} />
        <ModalBody>
            <form id="job-title-form" className="space-y-6" onSubmit={handleSubmit}>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم المسمى الوظيفي</label>
                <input type="text" defaultValue={jobTitle?.name} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">يتبع لـ (المدير المباشر)</label>
                <select defaultValue={jobTitle?.parentJobTitleId ?? parentId ?? ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                    <option value="">-- لا يوجد (مستوى أعلى) --</option>
                    {allJobTitles.filter(jt => jt.id !== jobTitle?.id).map(jt => (
                    <option key={jt.id} value={jt.id}>{jt.name}</option>
                    ))}
                </select>
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">القسم</label>
                <input type="text" defaultValue={jobTitle?.department} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف (اختياري)</label>
                <textarea rows={4} defaultValue={jobTitle?.description} className="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
                </div>
            </form>
        </ModalBody>
        <ModalFooter>
            {modalFooter}
        </ModalFooter>
    </Modal>
  );
};

export default JobTitleModal;
