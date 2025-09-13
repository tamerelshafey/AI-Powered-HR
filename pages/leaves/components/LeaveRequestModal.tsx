
import React, { useState, useMemo } from 'react';
import { leaveTypeSettingsData } from '../../settings/data';
import { LeaveTypeSetting } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({ isOpen, onClose }) => {
  const [selectedLeaveType, setSelectedLeaveType] = useState<LeaveTypeSetting | null>(null);
  const { t } = useI18n();

  const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      alert('تم تقديم طلب الإجازة بنجاح!');
      onClose();
  }

  const handleLeaveTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = leaveTypeSettingsData.find(lt => lt.name === event.target.value) || null;
    setSelectedLeaveType(selectedType);
  };

  const infoMessage = useMemo(() => {
    if (!selectedLeaveType) return null;
    let messages = [];
    if (selectedLeaveType.isDeductedFromAnnual) {
      messages.push(t('page.leaves.requestModal.info.deducted'));
    }
    if (selectedLeaveType.eligibilityYears) {
      messages.push(t('page.leaves.requestModal.info.eligibility', { years: selectedLeaveType.eligibilityYears }));
    }
    if (selectedLeaveType.maxTimesInService === 1) {
      messages.push(t('page.leaves.requestModal.info.once'));
    }
    return messages.join(' ');
  }, [selectedLeaveType, t]);

  const modalFooter = (
    <div className="flex justify-end space-x-3 space-x-reverse">
      <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
        {t('common.cancel')}
      </button>
      <button type="submit" form="leave-request-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        {t('page.leaves.requestModal.submit')}
      </button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalHeader title={t('page.leaves.requestModal.title')} onClose={onClose} />
        <ModalBody>
            <form id="leave-request-form" className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.leaves.requestModal.leaveType')}</label>
                    <select 
                    onChange={handleLeaveTypeChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                    <option value="">{t('page.leaves.requestModal.selectLeaveType')}</option>
                    {leaveTypeSettingsData.map(lt => (
                        <option key={lt.id} value={lt.name}>{t(`enum.leaveType.${lt.name}`)}</option>
                    ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.leaves.requestModal.duration')}</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>{t('page.leaves.requestModal.duration.full')}</option>
                    <option>{t('page.leaves.requestModal.duration.halfAm')}</option>
                    <option>{t('page.leaves.requestModal.duration.halfPm')}</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.leaves.requestModal.startDate')}</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.leaves.requestModal.endDate')}</label>
                    <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                </div>
                </div>

                {infoMessage && (
                <div className="p-3 bg-blue-50 border-s-4 border-blue-500 text-blue-800 text-sm rounded-e-lg">
                    <i className="fas fa-info-circle me-2"></i>
                    {infoMessage}
                </div>
                )}
                
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.leaves.requestModal.reason')}</label>
                <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={t('page.leaves.requestModal.reasonPlaceholder')}></textarea>
                </div>
            </form>
        </ModalBody>
        <ModalFooter>
            {modalFooter}
        </ModalFooter>
    </Modal>
  );
};

export default LeaveRequestModal;
