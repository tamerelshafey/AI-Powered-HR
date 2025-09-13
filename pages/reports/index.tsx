
import React, { useState, Suspense, lazy, useEffect, useCallback } from 'react';
import PageHeader from '../../components/PageHeader';
import KpiCards from './components/KpiCards';
import AiAnalyst from './components/AiAnalyst';
import { Kpi, Performer, Report, PredictiveInsight } from '../../types';
import { getKpis, getTopPerformers, getRecentReports, getPredictiveInsights } from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import { useI18n } from '../../context/I18nContext';

// Lazy load components that are not critical for the initial view
const AttendanceChart = lazy(() => import('./components/AttendanceChart'));
const DepartmentChart = lazy(() => import('./components/DepartmentChart'));
const ActivityHeatmap = lazy(() => import('./components/ActivityHeatmap'));
const TopPerformersTable = lazy(() => import('./components/TopPerformersTable'));
const RecentReports = lazy(() => import('./components/RecentReports'));
const ReportBuilderModal = lazy(() => import('./components/ReportBuilderModal'));
const PredictiveAnalytics = lazy(() => import('./components/PredictiveAnalytics'));

const ComponentLoader: React.FC<{className?: string}> = ({className = 'h-96'}) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center ${className}`}>
        <div className="flex flex-col items-center text-gray-400">
          <i className="fas fa-spinner fa-spin text-2xl"></i>
          <span className="mt-2 text-sm">جاري التحميل...</span>
        </div>
    </div>
);

const ReportsPage: React.FC = () => {
    const [isReportBuilderOpen, setReportBuilderOpen] = useState(false);
    const [kpis, setKpis] = useState<Kpi[]>([]);
    const [topPerformers, setTopPerformers] = useState<Performer[]>([]);
    const [recentReports, setRecentReports] = useState<Report[]>([]);
    const [predictiveInsights, setPredictiveInsights] = useState<PredictiveInsight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string|null>(null);
    const { t } = useI18n();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [kpisData, performersData, reportsData, insightsData] = await Promise.all([
                getKpis(),
                getTopPerformers(),
                getRecentReports(),
                getPredictiveInsights(),
            ]);
            setKpis(kpisData);
            setTopPerformers(performersData);
            setRecentReports(reportsData);
            setPredictiveInsights(insightsData);
        } catch (err) {
            console.error("Failed to fetch reports data", err);
            setError("Failed to load reports data. Please try again.");
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
                title={t('page.reports.header.title')}
                subtitle={t('page.reports.header.subtitle')}
                actions={<>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                        <option>{t('page.reports.header.timeRange.30d')}</option>
                        <option>{t('page.reports.header.timeRange.90d')}</option>
                        <option>{t('page.reports.header.timeRange.6m')}</option>
                        <option>{t('page.reports.header.timeRange.1y')}</option>
                    </select>
                    <button onClick={() => setReportBuilderOpen(true)} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <i className="fas fa-chart-bar"></i>
                        <span>{t('page.reports.header.reportBuilder')}</span>
                    </button>
                    <button onClick={() => alert('Exporting dashboard...')} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <i className="fas fa-download"></i>
                        <span>{t('page.reports.header.export')}</span>
                    </button>
                </>}
            />

            <div className="mb-8">
                <AiAnalyst />
            </div>
            
            <KpiCards kpis={kpis} />

            <div className="mb-8">
                <Suspense fallback={<ComponentLoader />}>
                    <PredictiveAnalytics insights={predictiveInsights} />
                </Suspense>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Suspense fallback={<ComponentLoader />}>
                    <AttendanceChart />
                </Suspense>
                <Suspense fallback={<ComponentLoader />}>
                    <DepartmentChart />
                </Suspense>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <Suspense fallback={<ComponentLoader />}>
                        <TopPerformersTable performers={topPerformers} />
                    </Suspense>
                </div>
                <Suspense fallback={<ComponentLoader className="h-full min-h-[24rem]" />}>
                    <ActivityHeatmap />
                </Suspense>
            </div>

            <div className="mb-8">
                <Suspense fallback={<ComponentLoader />}>
                    <RecentReports reports={recentReports} onOpenReportBuilder={() => setReportBuilderOpen(true)} />
                </Suspense>
            </div>

            {isReportBuilderOpen && (
                <Suspense fallback={<div />}>
                    <ReportBuilderModal
                        isOpen={isReportBuilderOpen}
                        onClose={() => setReportBuilderOpen(false)}
                    />
                </Suspense>
            )}
        </div>
    );
};

export default ReportsPage;
