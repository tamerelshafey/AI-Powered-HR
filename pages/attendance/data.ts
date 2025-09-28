
import { AttendanceRecord, AttendanceStatus, FeedItem, WeeklyStat } from '../../types';
import { employees } from '../employees/data';

export const attendanceRecords: AttendanceRecord[] = [
    { employee: employees[0], checkIn: '09:15', checkOut: null, status: AttendanceStatus.PRESENT, hours: '...', shift: {id: 'shift_morning', name: 'MORNING'} },
    { employee: employees[1], checkIn: '08:55', checkOut: null, status: AttendanceStatus.PRESENT, hours: '...', shift: {id: 'shift_morning', name: 'MORNING'} },
    { employee: employees[2], checkIn: '09:45', checkOut: null, status: AttendanceStatus.LATE, hours: '...', shift: {id: 'shift_morning', name: 'MORNING'} },
    { employee: employees[3], checkIn: '09:00', checkOut: '17:05', status: AttendanceStatus.PRESENT, hours: '8:05', shift: {id: 'shift_morning', name: 'MORNING'} },
    { employee: employees[4], checkIn: null, checkOut: null, status: AttendanceStatus.ABSENT, hours: '0:00', shift: {id: 'shift_evening', name: 'EVENING'} },
    { employee: employees[5], checkIn: '09:00', checkOut: '16:30', status: AttendanceStatus.EARLY_DEPARTURE, hours: '7:30', shift: {id: 'shift_morning', name: 'MORNING'} },
    { employee: employees[7], checkIn: '13:00', checkOut: null, status: AttendanceStatus.PRESENT, hours: '...', shift: {id: 'shift_evening', name: 'EVENING'} },
];

export const initialFeedItems: FeedItem[] = [
    { id: 1, icon: 'fas fa-sign-in-alt', iconColor: 'green', title: 'John Doe checked in', subtitle: 'Engineering • 09:15 AM • On time', time: 'now' },
    { id: 2, icon: 'fas fa-exclamation-triangle', iconColor: 'orange', title: 'Mike Wilson checked in late', subtitle: 'Sales • 09:45 AM • 45 min late', time: '2m ago' },
    { id: 3, icon: 'fas fa-sign-out-alt', iconColor: 'purple', title: 'Lisa Brown checked out early', subtitle: 'Finance • 04:30 PM • 30 min early', time: '5m ago' },
    { id: 4, icon: 'fas fa-fingerprint', iconColor: 'blue', title: 'Biometric verification successful', subtitle: 'Alex Chen • Design • Face ID', time: '8m ago' },
];

export const weeklyStats: WeeklyStat[] = [
    { day: 'weekdays.Sunday', percentage: 95 },
    { day: 'weekdays.Monday', percentage: 92 },
    { day: 'weekdays.Tuesday', percentage: 97 },
    { day: 'weekdays.Wednesday', percentage: 94 },
    { day: 'weekdays.Thursday', percentage: 89 },
];