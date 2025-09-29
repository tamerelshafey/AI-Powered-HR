import React, { useEffect, useRef } from 'react';
import { DepartmentWorkforce } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

declare var Chart: any;

interface HeadcountChartProps {
    data: DepartmentWorkforce[];
    plannedHires: Record<string, number>;
}

const HeadcountChart: React.FC<HeadcountChartProps> = ({ data, plannedHires }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);
    const { t } = useI18n();

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const labels = data.map(d => d.department);
            const currentData = data.map(d => d.headcount);
            const projectedData = data.map(d => d.headcount + (plannedHires[d.department] || 0));

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: t('page.workforce_planning.charts.headcount.current'),
                            data: currentData,
                            backgroundColor: 'rgba(59, 130, 246, 0.5)',
                            borderColor: 'rgba(59, 130, 246, 1)',
                            borderWidth: 1
                        },
                        {
                            label: t('page.workforce_planning.charts.headcount.projected'),
                            data: projectedData,
                            backgroundColor: 'rgba(22, 163, 74, 0.5)',
                            borderColor: 'rgba(22, 163, 74, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                precision: 0
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: false,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, plannedHires, t]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.workforce_planning.charts.headcount.title')}</h3>
            </div>
            <div className="p-6">
                <div className="relative h-80">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default HeadcountChart;
