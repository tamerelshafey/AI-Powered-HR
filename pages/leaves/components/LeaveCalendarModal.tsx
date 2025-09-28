import React, { useState, useEffect, useMemo, useRef, CSSProperties } from 'react';
import { useI18n } from '../../../context/I18nContext';
import Modal, { ModalHeader, ModalBody } from '../../../components/Modal';
import { LeaveRequest, PublicHoliday, LeaveStatus } from '../../../types';
import { getAllLeaveRequests, getPublicHolidays } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

interface LeaveCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CalendarEvent = 
    | { type: 'leave'; data: LeaveRequest }
    | { type: 'holiday'; data: PublicHoliday };

const eventColors: Record<string, string> = {
    [LeaveStatus.APPROVED]: 'bg-green-100 text-green-800 border-green-200',
    [LeaveStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    holiday: 'bg-indigo-100 text-indigo-800 border-indigo-200',
};

const Popover: React.FC<{
    target: HTMLElement | null;
    date: Date | null;
    events: CalendarEvent[];
    onClose: () => void;
}> = ({ target, date, events, onClose }) => {
    const popoverRef = useRef<HTMLDivElement>(null);
    const { t } = useI18n();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    if (!target || !date) return null;

    const { top, left, width } = target.getBoundingClientRect();
    // FIX: Explicitly type the style object as CSSProperties to resolve the type error for the 'position' property.
    const style: CSSProperties = {
        position: 'absolute',
        top: `${top + window.scrollY + target.offsetHeight + 10}px`,
        left: `${left + window.scrollX + width / 2}px`,
        transform: 'translateX(-50%)',
    };

    return (
        <div ref={popoverRef} style={style} className="calendar-popover animate-fade-in-down">
            <div className="calendar-popover-arrow"></div>
            <div className="p-3 border-b">
                <h4 className="font-semibold text-sm">{t('page.leaves.calendarModal.popover.title', { day: date.getDate() })}</h4>
            </div>
            <div className="p-3 max-h-48 overflow-y-auto">
                {events.length > 0 ? (
                    <div className="space-y-2">
                        {events.map((event, index) => (
                             <div key={index} className="flex items-center space-x-2 space-x-reverse text-xs">
                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${event.type === 'holiday' ? 'bg-indigo-500' : event.data.status === LeaveStatus.APPROVED ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                <span className="text-gray-700">
                                    {event.type === 'holiday' ? event.data.name : `${t('page.leaves.calendarModal.popover.leaveFor', { name: `${event.data.employee.firstName} ${event.data.employee.lastName}` })} (${t(`enum.leaveType.${event.data.leaveType}`)})`}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500 text-center">{t('page.leaves.calendarModal.popover.noEvents')}</p>
                )}
            </div>
        </div>
    );
};


const LeaveCalendarModal: React.FC<LeaveCalendarModalProps> = ({ isOpen, onClose }) => {
    const { t } = useI18n();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [popover, setPopover] = useState<{ target: HTMLElement | null; date: Date | null; events: CalendarEvent[] }>({ target: null, date: null, events: [] });

    useEffect(() => {
        if (isOpen) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const [leaveData, holidayData] = await Promise.all([getAllLeaveRequests(), getPublicHolidays()]);
                    const mappedLeaves: CalendarEvent[] = leaveData.map(l => ({ type: 'leave', data: l }));
                    const mappedHolidays: CalendarEvent[] = holidayData.map(h => ({ type: 'holiday', data: h }));
                    setEvents([...mappedLeaves, ...mappedHolidays]);
                } catch (error) {
                    console.error("Failed to fetch calendar data", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [isOpen]);
    
    const changeMonth = (amount: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + amount);
            return newDate;
        });
        setPopover({ target: null, date: null, events: [] });
    };

    const calendarGrid = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    }, [currentDate]);
    
    const getEventsForDay = (day: Date | null): CalendarEvent[] => {
        if (!day) return [];
        return events.filter(event => {
            const eventDateStr = event.type === 'leave' ? event.data.startDate : event.data.date;
            const eventDate = new Date(eventDateStr);
            return eventDate.getFullYear() === day.getFullYear() &&
                   eventDate.getMonth() === day.getMonth() &&
                   eventDate.getDate() === day.getDate();
        });
    };
    
    const handleDayClick = (e: React.MouseEvent<HTMLButtonElement>, day: Date | null) => {
        if (!day) return;
        const dayEvents = getEventsForDay(day);
        setPopover({ target: e.currentTarget, date: day, events: dayEvents });
    };

    const monthName = t(`months.${currentDate.toLocaleString('en-US', { month: 'long' }).toLowerCase()}`);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="4xl">
            <ModalHeader title={t('page.leaves.calendarModal.title')} onClose={onClose} />
            <ModalBody>
                 {loading ? (
                    <div className="h-96 flex items-center justify-center"><LoadingSpinner/></div>
                 ) : (
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={() => changeMonth(-1)} className="p-2 text-gray-600 hover:text-gray-900" aria-label={t('page.leaves.calendarModal.previousMonth')}>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <h4 className="text-lg font-medium text-gray-900">{monthName} {currentDate.getFullYear()}</h4>
                            <button onClick={() => changeMonth(1)} className="p-2 text-gray-600 hover:text-gray-900" aria-label={t('page.leaves.calendarModal.nextMonth')}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {weekdays.map(day => (
                                <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">{t(`weekdays.${day}`)}</div>
                            ))}
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1">
                            {calendarGrid.map((day, index) => {
                                const dayEvents = getEventsForDay(day);
                                return (
                                    <div key={index} className={`h-28 border rounded-md ${day ? 'bg-white' : 'bg-gray-100'}`}>
                                        {day && (
                                            <button onClick={(e) => handleDayClick(e, day)} className="w-full h-full p-2 text-start flex flex-col">
                                                <span className={`font-medium ${new Date().toDateString() === day.toDateString() ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : 'text-gray-800'}`}>{day.getDate()}</span>
                                                <div className="mt-1 overflow-hidden">
                                                    {dayEvents.slice(0, 2).map((event, i) => (
                                                        <span key={i} className={`event-pill border ${event.type === 'holiday' ? eventColors.holiday : eventColors[event.data.status]}`}>
                                                            {event.type === 'holiday' ? event.data.name : event.data.employee.firstName}
                                                        </span>
                                                    ))}
                                                    {dayEvents.length > 2 && <span className="text-xs text-gray-500 mt-1">+{dayEvents.length - 2} more</span>}
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                 )}
            </ModalBody>
            {popover.target && (
                 <Popover 
                    target={popover.target} 
                    date={popover.date} 
                    events={popover.events} 
                    onClose={() => setPopover({ target: null, date: null, events: [] })} 
                />
            )}
        </Modal>
    );
};

export default LeaveCalendarModal;
