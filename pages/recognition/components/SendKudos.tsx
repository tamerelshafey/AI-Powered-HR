import React, { useState } from 'react';
import { Employee, CompanyValue } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface SendKudosProps {
    employees: Employee[];
    onSendKudo: (receiverId: string, message: string, values: CompanyValue[]) => void;
}

const companyValuesConfig: { value: CompanyValue, icon: string, color: string }[] = [
    { value: CompanyValue.TEAMWORK, icon: 'fas fa-users', color: 'text-blue-500' },
    { value: CompanyValue.INNOVATION, icon: 'fas fa-lightbulb', color: 'text-purple-500' },
    { value: CompanyValue.CUSTOMER_FOCUS, icon: 'fas fa-heart', color: 'text-red-500' },
    { value: CompanyValue.INTEGRITY, icon: 'fas fa-shield-alt', color: 'text-gray-500' },
    { value: CompanyValue.EXCELLENCE, icon: 'fas fa-award', color: 'text-yellow-500' },
];

const SendKudos: React.FC<SendKudosProps> = ({ employees, onSendKudo }) => {
    const { t } = useI18n();
    const [receiverId, setReceiverId] = useState('');
    const [message, setMessage] = useState('');
    const [selectedValues, setSelectedValues] = useState<CompanyValue[]>([]);

    const handleValueClick = (value: CompanyValue) => {
        setSelectedValues(prev => 
            prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!receiverId || !message.trim()) {
            // Add user-friendly validation feedback
            return;
        }
        onSendKudo(receiverId, message, selectedValues);
        // Reset form
        setReceiverId('');
        setMessage('');
        setSelectedValues([]);
    };
    
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('page.recognition.sendKudos.title')}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.recognition.sendKudos.to')}</label>
                    <select 
                        value={receiverId}
                        onChange={e => setReceiverId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                        required
                    >
                        <option value="">{t('page.recognition.sendKudos.selectEmployee')}</option>
                        {employees.map(emp => (
                            <option key={emp.id} value={emp.id}>{`${emp.firstName} ${emp.lastName}`}</option>
                        ))}
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.recognition.sendKudos.addMessage')}</label>
                    <textarea 
                        rows={3} 
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('page.recognition.sendKudos.companyValues')}</label>
                    <div className="flex flex-wrap gap-2">
                        {companyValuesConfig.map(cv => (
                            <button
                                type="button"
                                key={cv.value}
                                onClick={() => handleValueClick(cv.value)}
                                className={`flex items-center space-x-2 space-x-reverse px-3 py-1.5 border rounded-full text-xs font-medium transition-colors ${selectedValues.includes(cv.value) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-100'}`}
                            >
                                <i className={`${cv.icon} ${selectedValues.includes(cv.value) ? '' : cv.color}`}></i>
                                <span>{t(`enum.companyValue.${cv.value}`)}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="text-end">
                    <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        {t('page.recognition.sendKudos.send')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendKudos;
