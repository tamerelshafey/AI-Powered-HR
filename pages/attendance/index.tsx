

import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../../components/PageHeader';
import AttendanceStats from './components/AttendanceStats';
import LiveFeed from './components/LiveFeed';
import QuickActions from './components/QuickActions';
import WeeklyOverview from './components/WeeklyOverview';
import AttendanceAiInsights from './components/AttendanceAiInsights';
import AttendanceTable from './components/AttendanceTable';
import BiometricModal from './components/BiometricModal';
// FIX: Moved AttendanceStatsData import to types.ts to resolve import error.
import { AttendanceRecord, FeedItem, WeeklyStat, AttendanceStatsData } from '../../types';
import { getAttendanceRecords, getAttendanceStats, getInitialFeedItems, getWeeklyStats } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useI18n } from '../../context/I18nContext';

const AttendancePage: React.FC = () => {
    const [isBiometricModalOpen, setBiometricModalOpen] = useState(false);
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [stats, setStats] = useState<AttendanceStatsData | null>(null);
    const [initialFeed, setInitialFeed] = useState<FeedItem[]>([]);
    const [weeklyStats, setWeeklyStats] = useState<WeeklyStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useI18n();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [recordsData, statsData, feedData, weeklyData] = await Promise.all([
                getAttendanceRecords(),
                getAttendanceStats(),
                getInitialFeedItems(),
                getWeeklyStats()
            ]);
            setRecords(recordsData);
            setStats(statsData);
            setInitialFeed(feedData);
            setWeeklyStats(weeklyData);
        } catch (err) {
            console.error("Failed to fetch attendance data", err);
            setError("فشل في تحميل بيانات الحضور. يرجى المحاولة مرة أخرى.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchData} />;
    }

    return (
        <div>
            <PageHeader
                title={t('page.attendance.header.title')}
                subtitle={t('page.attendance.header.subtitle')}
                actions={<>
                    <button onClick={() => setBiometricModalOpen(true)} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <i className="fas fa-fingerprint"></i>
                        <span>{t('page.attendance.header.biometricCheck')}</span>
                    </button>
                    <button onClick={() => alert('Exporting report...')} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <i className="fas fa-download"></i>
                        <span>{t('page.attendance.header.exportReport')}</span>
                    </button>
                </>}
            />
            <AttendanceStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <LiveFeed initialItems={initialFeed} />
                </div>
                <QuickActions />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <WeeklyOverview stats={weeklyStats} />
                <AttendanceAiInsights />
            </div>

            <AttendanceTable records={records} />

            <BiometricModal
                isOpen={isBiometricModalOpen}
                onClose={() => setBiometricModalOpen(false)}
            />
        </div>
    );
};

export default AttendancePage;
