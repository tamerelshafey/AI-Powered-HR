import React, { useEffect, useRef } from 'react';
import { PerformanceReview, PerformanceStatus } from '../../../../types';

declare var Chart: any;

interface EmployeePerformanceTrendChartProps {
    reviews: PerformanceReview[];
}

const EmployeePerformanceTrendChart: React.FC<EmployeePerformanceTrendChartProps> = ({ reviews }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    const completedReviews = reviews
        .filter(r => r.status === PerformanceStatus.COMPLETED)
        .sort((a, b) => new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime());

    useEffect(() => {
        if (chartRef.current && completedReviews.length > 0) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: completedReviews.map(r => new Date(r.reviewDate).toLocaleDateString('ar-EG', { month: 'short', year: 'numeric' })),
                    datasets: [{
                        label: 'درجة الأداء',
                        data: completedReviews.map(r => r.overallScore),
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: false, min: 1, max: 5 } }
                }
            });
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [completedReviews]);

    if (completedReviews.length === 0) {
        return (
            <div className="bg-white rounded-lg border p-6 h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                    <i className="fas fa-chart-line text-3xl mb-2"></i>
                    <p>لا توجد بيانات أداء مكتملة لعرض الاتجاه.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">اتجاه الأداء</h3>
            <div className="relative h-72">
                <canvas ref={chartRef}></canvas>
            </div>
        </div>
    );
};

export default EmployeePerformanceTrendChart;