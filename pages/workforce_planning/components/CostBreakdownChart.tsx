import React, { useEffect, useRef } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { formatCurrency } from '../../../utils/formatters';

declare var Chart: any;

interface CostBreakdownChartProps {
    costBreakdown: {
        currentSalaries: number;
        newHiresCost: number;
        meritIncreaseCost: number;
        promotionsCost: number;
    };
}

const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({ costBreakdown }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<any>(null);
    const { t, language } = useI18n();

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const labels = [
                t('page.workforce_planning.simulator.currentSalaries'),
                t('page.workforce_planning.simulator.newHiresCost'),
                t('page.workforce_planning.simulator.meritIncreaseCost'),
                t('page.workforce_planning.simulator.promotionsCost')
            ];

            const data = [
                costBreakdown.currentSalaries,
                costBreakdown.newHiresCost,
                costBreakdown.meritIncreaseCost,
                costBreakdown.promotionsCost
            ];

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: [
                            '#3b82f6', // blue
                            '#10b981', // green
                            '#f59e0b', // amber
                            '#8b5cf6'  // violet
                        ],
                        hoverOffset: 4,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                        title: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context: any) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== null) {
                                        label += formatCurrency(context.parsed, language);
                                    }
                                    return label;
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
    }, [costBreakdown, t, language]);


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.workforce_planning.charts.cost.title')}</h3>
            </div>
            <div className="p-6">
                <div className="relative h-80">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default CostBreakdownChart;
