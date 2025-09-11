
import React, { useEffect, useRef } from 'react';

declare var Chart: any;

const AttendanceChart: React.FC = () => {
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
                    labels: ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
                    datasets: [{
                        label: 'معدل الحضور',
                        data: [95, 92, 97, 89, 85, 78, 82],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value: number) {
                                    return value + '%';
                                }
                            }
                        }
                    }
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
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">اتجاهات الحضور</h3>
                    <div className="flex items-center space-x-2 space-x-reverse">
                        <button className="text-sm text-blue-600 hover:text-blue-700">أسبوعي</button>
                        <button className="text-sm text-gray-500 hover:text-gray-700">شهري</button>
                    </div>
                </div>
            </div>
            <div className="p-6">
                <div className="relative h-64 sm:h-72">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default AttendanceChart;