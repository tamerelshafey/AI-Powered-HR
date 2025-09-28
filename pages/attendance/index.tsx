

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from './components/PageHeader';
import AttendanceStats from './components/AttendanceStats';
import AttendanceTable from './components/AttendanceTable';
import AttendanceFilterBar from './components/AttendanceFilterBar';
import LiveFeed from './components/LiveFeed';
import QuickActions from './components/QuickActions';
import WeeklyOverview from './components/WeeklyOverview';
import AttendanceAiInsights from './components/AttendanceAiInsights';
import BiometricModal from './components/BiometricModal';
import { AttendanceRecord, AttendanceStatsData, Branch, Department, FeedItem, WeeklyStat } from '../../types';
import { getAttendanceRecords, getAttendanceStats, getBranches, getDepartments, getInitialFeedItems, getWeeklyStats } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import LoadingSpinner from '../../components/LoadingSpinner';

const AttendancePage: React.FC = () => {
    const [records, setRecords] = useState<AttendanceRecord[]>([]);
    const [stats, setStats] = useState<AttendanceStatsData | null>(null);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [initialFeed, setInitialFeed] = useState<FeedItem[]>([]);
    const [weeklyStats, setWeeklyStats] = useState<WeeklyStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isBiometricModalOpen, setBiometricModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        date: new Date().toISOString().split('T')[0],
        branch: 'All',
        department: 'All',
    });
    
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [recordsData, statsData, branchesData, departmentsData, feedData, weeklyData] = await Promise.all([
                getAttendanceRecords(),
                getAttendanceStats(),
                getBranches(),
                getDepartments(),
                getInitialFeedItems(),
                getWeeklyStats()
            ]);
            setRecords(recordsData);
            setStats(statsData);
            setBranches(branchesData);
            setDepartments(departmentsData);
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

    const filteredRecords = useMemo(() => {
        return records.filter(record => {
            const branchMatch = filters.branch === 'All' || record.employee.branch === filters.branch;
            const departmentMatch = filters.department === 'All' || record.employee.department === filters.department;
            return branchMatch && departmentMatch;
        });
    }, [records, filters]);

    const handleRowClick = (employeeId: string) => {
        navigate(`/employees/${employeeId}`);
    };

    if (loading) {
        return <LoadingSpinner fullScreen />;
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <AttendanceFilterBar 
                        filters={filters}
                        onFilterChange={setFilters}
                        branches={branches}
                        departments={departments}
                    />
                    <AttendanceTable records={filteredRecords} onRowClick={handleRowClick} />
                </div>
                <div className="space-y-6">
                    <LiveFeed initialItems={initialFeed} />
                    <QuickActions onBiometricClick={() => setBiometricModalOpen(true)} />
                    <WeeklyOverview stats={weeklyStats} />
                    <AttendanceAiInsights />
                </div>
            </div>
            <BiometricModal 
                isOpen={isBiometricModalOpen}
                onClose={() => setBiometricModalOpen(false)}
            />
        </div>
    );
};

export default AttendancePage;