
import React, { useRef, useEffect } from 'react';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { useI18n } from '../../../context/I18nContext';

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
  const modalRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();
  useFocusTrap(modalRef, isOpen);
  
  useEffect(() => {
    const appRoot = document.getElementById('root');
    if (isOpen) {
        appRoot?.setAttribute('aria-hidden', 'true');
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    } else {
        appRoot?.removeAttribute('aria-hidden');
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="calendar-modal-title">
        <div ref={modalRef} className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-modal-fade-in" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 id="calendar-modal-title" className="text-lg font-semibold text-gray-900">{t('page.leaves.calendarModal.title')}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label={t('common.close')}>
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>
            
            <div className="p-6">
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
            </div>
        </div>
    </div>
  );
};

export default LeaveCalendarModal;
