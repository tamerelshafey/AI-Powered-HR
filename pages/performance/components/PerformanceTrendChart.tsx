
import React, { useEffect, useRef } from 'react';

declare var Chart: any;

const PerformanceTrendChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['الربع الأول 23', 'الربع الثاني 23', 'الربع الثالث 23', 'الربع الرابع 23', 'الربع الأول 24'],
                    datasets: [{
                        label: 'متوسط الأداء',
                        data: [3.8, 4.0, 4.1, 4.3, 4.5],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: false, min: 3.5, max: 5.0 } }
                }
            });
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">اتجاهات الأداء</h3>
            </div>
            <div className="p-6">
                <div className="relative h-72">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default PerformanceTrendChart;
