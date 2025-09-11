
import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from './components/PageHeader';
import AttendanceStats from './components/AttendanceStats';
import LiveFeed from './components/LiveFeed';
import QuickActions from './components/QuickActions';
import WeeklyOverview from './components/WeeklyOverview';
import AttendanceAiInsights from './components/AttendanceAiInsights';
import AttendanceTable from './components/AttendanceTable';
import BiometricModal from './components/BiometricModal';
import { weeklyStats } from './data';
import { AttendanceRecord, FeedItem } from '../../types';
import { getAttendanceRecords, getAttendanceStats, getInitialFeedItems, AttendanceStatsData } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useI18n } from '../../context/I18nContext';

const AttendancePage: React.FC = () => {
    const [isBiometricModalOpen, setBiometricModalOpen] = useState(false);
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [stats, setStats] = useState<AttendanceStatsData | null>(null);
    const [initialFeed, setInitialFeed] = useState<FeedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useI18n();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [recordsData, statsData, feedData] = await Promise.all([
                getAttendanceRecords(),
                getAttendanceStats(),
                getInitialFeedItems()
            ]);
            setRecords(recordsData);
            setStats(statsData);
            setInitialFeed(feedData);
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
                onBiometricClick={() => setBiometricModalOpen(true)}
                onExportClick={() => alert('Exporting report...')}
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
