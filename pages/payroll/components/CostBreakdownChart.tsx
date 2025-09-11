import React, { useEffect, useRef } from 'react';

declare var Chart: any;

interface CostBreakdownChartProps {
    data: any;
}

const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({ data }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                usePointStyle: true,
                                padding: 20,
                                boxWidth: 10,
                                fontFamily: 'Tajawal'
                            }
                        },
                        tooltip: {
                             callbacks: {
                                label: function(context: any) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== null) {
                                        label += new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(context.parsed);
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    cutout: '60%'
                }
            });
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">تحليل تكاليف الرواتب</h3>
            </div>
            <div className="p-6">
                <div className="relative h-64">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default CostBreakdownChart;