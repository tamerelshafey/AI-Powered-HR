
import React, { useState, useEffect } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { ExpenseClaim, Employee, Mission, ExpenseCategory } from '../../../types';
import { useUser } from '../../../context/UserContext';
import { useI18n } from '../../../context/I18nContext';

interface ExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    claim?: ExpenseClaim | null;
    employees?: Employee[];
    missions?: Mission[];
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose, claim, employees, missions }) => {
    const { currentUser } = useUser();
    const { t } = useI18n();
    const isEditing = !!claim;
    const canSelectEmployee = !!employees; // Admins get the employee list passed in

    const [formData, setFormData] = useState({
        employeeId: claim?.employee.id || (canSelectEmployee ? '' : currentUser.id),
        category: claim?.category || ExpenseCategory.TRAVEL,
        amount: claim?.amount || '',
        date: claim?.date || new Date().toISOString().split('T')[0],
        description: claim?.description || '',
        missionId: claim?.missionId || '',
    });

    useEffect(() => {
        if (claim) {
            setFormData({
                employeeId: claim.employee.id,
                category: claim.category,
                amount: claim.amount,
                date: claim.date,
                description: claim.description,
                missionId: claim.missionId || '',
            });
        }
    }, [claim]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Claim submitted!');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalHeader title={isEditing ? t('page.expenses.modal.editTitle') : t('page.expenses.modal.title')} onClose={onClose} />
            <ModalBody>
                <form id="expense-form" onSubmit={handleSubmit} className="space-y-4">
                    {canSelectEmployee && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.expenses.modal.employee')}</label>
                            <select value={formData.employeeId} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" required>
                                <option value="">اختر موظفًا</option>
                                {employees?.map(emp => (
                                    <option key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.expenses.modal.category')}</label>
                            <select value={formData.category} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white" required>
                                {Object.values(ExpenseCategory).map(cat => (
                                    <option key={cat} value={cat}>{t(`enum.expenseCategory.${cat}`)}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.expenses.modal.amount')}</label>
                            <input type="number" value={formData.amount} placeholder="0.00" className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.expenses.modal.date')}</label>
                        <input type="date" value={formData.date} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.expenses.modal.description')}</label>
                        <textarea rows={2} value={formData.description} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.expenses.modal.missionLink')}</label>
                        <select value={formData.missionId} className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white">
                            <option value="">{t('page.expenses.modal.noMission')}</option>
                            {missions?.map(m => (
                                <option key={m.id} value={m.id}>{m.title}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.expenses.modal.receipt')}</label>
                         <input type="file" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                 <div className="flex justify-end space-x-3 space-x-reverse">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">{t('common.cancel')}</button>
                    <button type="submit" form="expense-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('page.expenses.modal.submit')}</button>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default ExpenseModal;
