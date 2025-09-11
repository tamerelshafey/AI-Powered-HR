
import { AttendanceRecord, AttendanceStatus, FeedItem, WeeklyStat } from '../../types';
import { employees } from '../employees/data';

export const attendanceRecords: AttendanceRecord[] = [
    { employee: employees[0], checkIn: '09:15', checkOut: null, status: AttendanceStatus.PRESENT, hours: '2:45' },
    { employee: employees[1], checkIn: '08:55', checkOut: null, status: AttendanceStatus.PRESENT, hours: '3:05' },
    { employee: employees[2], checkIn: '09:45', checkOut: null, status: AttendanceStatus.LATE, hours: '2:15' },
    { employee: employees[3], checkIn: '09:00', checkOut: '17:05', status: AttendanceStatus.PRESENT, hours: '8:05' },
    { employee: employees[4], checkIn: null, checkOut: null, status: AttendanceStatus.ABSENT, hours: '0:00' },
    { employee: employees[5], checkIn: '09:00', checkOut: '16:30', status: AttendanceStatus.EARLY_DEPARTURE, hours: '7:30' },
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
