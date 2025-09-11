


import React, { useState, Suspense, lazy } from 'react';
import PageHeader from './components/PageHeader';
import KpiCards from './components/KpiCards';
import { kpis, topPerformers, recentReportsData, predictiveInsightsData } from './data';
import AiAnalyst from './components/AiAnalyst';

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
    
    return (
        <div>
            <PageHeader
                onOpenReportBuilder={() => setReportBuilderOpen(true)}
                onExport={() => alert('Exporting dashboard...')}
            />

            <div className="mb-8">
                <AiAnalyst />
            </div>
            
            <KpiCards kpis={kpis} />

            <div className="mb-8">
                <Suspense fallback={<ComponentLoader />}>
                    <PredictiveAnalytics insights={predictiveInsightsData} />
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
                    <RecentReports reports={recentReportsData} onOpenReportBuilder={() => setReportBuilderOpen(true)} />
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