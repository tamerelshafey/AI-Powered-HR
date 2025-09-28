

import React, { useState, useEffect } from 'react';
import Modal, { ModalHeader, ModalBody, ModalFooter } from '../../../components/Modal';
import { Mission, Employee, MissionSettings } from '../../../types';
import { useI18n } from '../../../context/I18nContext';
import { getMissionSettings } from '../../../services/api';
import ToastNotification from '../../../components/ToastNotification';

interface MissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (missionData: Omit<Mission, 'id' | 'status'>) => void;
    employees: Employee[];
    mode?: 'assign' | 'request';
    currentUserEmployee?: Employee;
}

const MissionModal: React.FC<MissionModalProps> = ({ isOpen, onClose, onSave, employees, mode = 'assign', currentUserEmployee }) => {
    const { t } = useI18n();
    const [employeeId, setEmployeeId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isMultiDay, setIsMultiDay] = useState(false);
    const [settings, setSettings] = useState<MissionSettings | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'error' } | null>(null);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (isOpen) {
            getMissionSettings().then(setSettings);
            if (mode === 'request' && currentUserEmployee) {
                setEmployeeId(currentUserEmployee.id);
            }
        } else {
            // Reset form on close
            setEmployeeId('');
            setTitle('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setStartTime('');
            setEndTime('');
            setIsMultiDay(false);
            setSettings(null);
            setToast(null);
        }
    }, [isOpen, mode, currentUserEmployee]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (mode === 'request' && new Date(startDate) < new Date(new Date().setHours(0, 0, 0, 0))) {
            setToast({ message: t('page.missions.toast.pastDateError'), type: 'error' });
            return;
        }

        const employee = employees.find(emp => emp.id === employeeId);
        if (!employee) return;

        onSave({
            employee,
            title,
            description,
            startDate,
            endDate: isMultiDay ? endDate : startDate,
            isMultiDay,
            startTime: !isMultiDay ? startTime : null,
            endTime: !isMultiDay ? endTime : null,
            requestedBy: mode === 'request' ? 'employee' : 'manager',
        });
    };

    const modalTitle = mode === 'assign' ? t('page.missions.modal.title') : t('page.missions.modal.requestTitle');

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <ModalHeader title={modalTitle} onClose={onClose} />
            <ModalBody>
                <form id="mission-form" onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.missions.modal.employee')}</label>
                        {mode === 'assign' ? (
                            <select
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                                required
                            >
                                <option value="">{t('page.missions.modal.selectEmployee')}</option>
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                value={`${currentUserEmployee?.firstName} ${currentUserEmployee?.lastName}`}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                disabled
                            />
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.missions.modal.missionTitle')}</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.missions.modal.description')}</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        ></textarea>
                    </div>
                    <div className="pt-2">
                        <label className="flex items-center space-x-3 space-x-reverse cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isMultiDay}
                                onChange={(e) => setIsMultiDay(e.target.checked)}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">{t('page.missions.modal.isMultiDay')}</span>
                        </label>
                    </div>
                    
                    {isMultiDay ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.missions.modal.startDate')}</label>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required min={mode === 'request' ? today : undefined} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.missions.modal.endDate')}</label>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required min={startDate} />
                            </div>
                        </div>
                    ) : (
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.missions.modal.missionDate')}</label>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required min={mode === 'request' ? today : undefined}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.missions.modal.startTime')} {settings?.isTimeMandatoryForSingleDay ? '' : '(اختياري)'}</label>
                                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required={!isMultiDay && !!settings?.isTimeMandatoryForSingleDay} />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.missions.modal.endTime')} {settings?.isTimeMandatoryForSingleDay ? '' : '(اختياري)'}</label>
                                <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required={!isMultiDay && !!settings?.isTimeMandatoryForSingleDay} />
                            </div>
                        </div>
                    )}
                </form>
            </ModalBody>
            <ModalFooter>
                <div className="flex justify-end space-x-3 space-x-reverse">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">{t('common.cancel')}</button>
                    <button type="submit" form="mission-form" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{t('common.save')}</button>
                </div>
            </ModalFooter>
        </Modal>
    );
};

export default MissionModal;
