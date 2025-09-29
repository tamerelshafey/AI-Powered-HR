

import React from 'react';
import { JobTitle, Employee, SuccessorReadiness } from '../../../types';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { useI18n } from '../../../context/I18nContext';

interface SuccessorModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: JobTitle;
    employees: Employee[];
}

const SuccessorModal: React.FC<SuccessorModalProps> = ({ isOpen, onClose, jobTitle, employees }) => {
    const { t } = useI18n();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Successor nominated!');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalHeader 
                title={t('page.succession.modal.title', { jobTitle: jobTitle.name })}
                onClose={onClose} 
            />
            <ModalBody>
                <form id="successor-form" className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.succession.modal.employee')}</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" required>
                            <option value="">{t('page.succession.modal.selectEmployee')}</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.succession.modal.readiness')}</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" required>
                            {Object.values(SuccessorReadiness).map(r => (
                                <option key={r} value={r}>{t(`enum.successorReadiness.${r}`)}</option>
                            ))}
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.succession.modal.performance')}</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.succession.modal.potential')}</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <div className="flex justify-end space-x-3 space-x-reverse">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">{t('common.cancel')}</button>
                    <button type="submit" form="successor-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('page.succession.modal.addSuccessor')}</button>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default SuccessorModal;