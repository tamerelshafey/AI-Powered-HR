
import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { useI18n } from '../../../context/I18nContext';
import { AttendanceStatsData } from '../../../services/api';

interface AttendanceStatsProps {
    stats: AttendanceStatsData | null;
}

const AttendanceStats: React.FC<AttendanceStatsProps> = ({ stats }) => {
    const { t } = useI18n();

    if (!stats) {
        // You can return a loading skeleton here
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }
    
    const presentCount = stats.present + stats.late;
    const latePercentage = presentCount > 0 ? ((stats.late / presentCount) * 100).toFixed(1) : '0.0';
    const totalEmployees = stats.present + stats.late + stats.absent + stats.onLeave;
    const absentPercentage = totalEmployees > 0 ? ((stats.absent / totalEmployees) * 100).toFixed(1) : '0.0';
    const earlyDeparturePercentage = presentCount > 0 ? ((stats.earlyDeparture / presentCount) * 100).toFixed(1) : '0.0';

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="fas fa-user-check" labelKey="attendanceStats.presentToday" value={String(presentCount)} change={t('attendanceStats.attendanceRate', { value: stats.attendanceRate })} changeColor="text-green-600" iconBgColor="bg-green-100" iconColor="text-green-600" />
            <StatsCard icon="fas fa-clock" labelKey="attendanceStats.lateArrival" value={String(stats.late)} change={t('attendanceStats.latePercentage', { value: latePercentage })} changeColor="text-orange-600" iconBgColor="bg-orange-100" iconColor="text-orange-600" />
            <StatsCard icon="fas fa-user-times" labelKey="attendanceStats.absent" value={String(stats.absent)} change={t('attendanceStats.absentPercentage', { value: absentPercentage })} changeColor="text-red-600" iconBgColor="bg-red-100" iconColor="text-red-600" />
            <StatsCard icon="fas fa-door-open" labelKey="attendanceStats.earlyDeparture" value={String(stats.earlyDeparture)} change={t('attendanceStats.earlyDeparturePercentage', { value: earlyDeparturePercentage })} changeColor="text-purple-600" iconBgColor="bg-purple-100" iconColor="text-purple-600" />
        </div>
    );
};

export default AttendanceStats;
