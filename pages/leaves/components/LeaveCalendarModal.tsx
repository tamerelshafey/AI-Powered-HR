
import React from 'react';
import { useI18n } from '../../../context/I18nContext';
import Modal from '../../../components/Modal';

interface LeaveCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CalendarDay: React.FC<{ day: number; status?: 'approved' | 'pending' | 'holiday'; text?: string; isPast?: boolean }> = ({ day, status, text, isPast = false }) => {
    let classes = "calendar-day p-2 text-center text-sm rounded transition-colors duration-200 hover:bg-indigo-100";
    if (status === 'approved') classes += ' leave-approved';
    if (status === 'pending') classes += ' leave-pending';
    if (status === 'holiday') classes += ' leave-holiday';
    if (isPast) classes += ' text-gray-400';
    
    return (
        <div className={classes}>
            {day}
            {text && <br />}
            {text && <span className="text-xs">{text}</span>}
        </div>
    );
};


const LeaveCalendarModal: React.FC<LeaveCalendarModalProps> = ({ isOpen, onClose }) => {
  const { t } = useI18n();
  
  if (!isOpen) return null;

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={t('page.leaves.calendarModal.title')}
        size="4xl"
    >
        <>
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                    <button className="p-2 text-gray-600 hover:text-gray-900" aria-label={t('page.leaves.calendarModal.previousMonth')}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                    <h4 className="text-lg font-medium text-gray-900">{t('page.leaves.calendarModal.month.december', { year: 2024 })}</h4>
                    <button className="p-2 text-gray-600 hover:text-gray-900" aria-label={t('page.leaves.calendarModal.nextMonth')}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                </div>
                
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekdays.map(day => (
                        <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">{t(`weekdays.${day}`)}</div>
                    ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                    {[...Array(31).keys()].map(i => {
                        const day = i + 1;
                        if (day === 20 || day === 21 || day === 22) return <CalendarDay key={day} day={day} status="approved" text="ج.د" />;
                        if (day === 23 || day === 24 || day === 27) return <CalendarDay key={day} day={day} status="pending" text="أ.ش" />;
                        if (day === 25 || day === 26) return <CalendarDay key={day} day={day} status="holiday" text={t('page.leaves.calendarModal.holidayText')} />;
                        return <CalendarDay key={day} day={day} isPast={day < 18} />;
                    })}
                </div>
            </div>
            
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                <div className="flex items-center space-x-2 space-x-reverse"><div className="w-4 h-4 leave-approved rounded"></div><span className="text-sm text-gray-600">{t('page.leaves.calendarModal.legend.approved')}</span></div>
                <div className="flex items-center space-x-2 space-x-reverse"><div className="w-4 h-4 leave-pending rounded"></div><span className="text-sm text-gray-600">{t('page.leaves.calendarModal.legend.pending')}</span></div>
                <div className="flex items-center space-x-2 space-x-reverse"><div className="w-4 h-4 leave-rejected rounded"></div><span className="text-sm text-gray-600">{t('page.leaves.calendarModal.legend.rejected')}</span></div>
                <div className="flex items-center space-x-2 space-x-reverse"><div className="w-4 h-4 leave-holiday rounded"></div><span className="text-sm text-gray-600">{t('page.leaves.calendarModal.legend.holiday')}</span></div>
            </div>
        </>
    </Modal>
  );
};

export default LeaveCalendarModal;