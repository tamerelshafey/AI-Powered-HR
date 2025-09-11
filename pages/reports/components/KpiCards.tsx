
import React from 'react';
import { Kpi } from '../../../types';

const colorClasses = {
    green: { text: 'text-green-600', bg: 'bg-green-100', icon: 'text-green-600', progress: 'bg-green-500', arrow: 'text-green-500' },
    red: { text: 'text-red-600', bg: 'bg-red-100', icon: 'text-red-600', progress: 'bg-red-500', arrow: 'text-green-500' }, // Arrow is green because lower is better
    blue: { text: 'text-blue-600', bg: 'bg-blue-100', icon: 'text-blue-600', progress: 'bg-blue-500', arrow: 'text-green-500' },
    purple: { text: 'text-purple-600', bg: 'bg-purple-100', icon: 'text-purple-600', progress: 'bg-purple-500', arrow: 'text-green-500' },
};

const KpiCard: React.FC<{ kpi: Kpi }> = ({ kpi }) => {
    const classes = colorClasses[kpi.color];
    const isDecreaseGood = kpi.label === "معدل الدوران";
    const trendIcon = isDecreaseGood ? "fas fa-arrow-down" : "fas fa-arrow-up";

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 kpi-indicator">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
                    <p className={`text-2xl font-bold ${classes.text}`}>{kpi.value}</p>
                    <div className="flex items-center mt-1">
                        <i className={`${trendIcon} ${classes.arrow} text-xs me-1`}></i>
                        <span className={`text-xs font-medium ${classes.text}`}>{kpi.change}</span>
                    </div>
                </div>
                <div className={`w-12 h-12 ${classes.bg} rounded-lg flex items-center justify-center`}>
                    <i className={`${kpi.icon} ${classes.icon} text-xl`}></i>
                </div>
            </div>
            <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`${classes.progress} h-2 rounded-full transition-all duration-500`} style={{ width: `${kpi.progress}%` }}></div>
                </div>
            </div>
        </div>
    );
};


interface KpiCardsProps {
    kpis: Kpi[];
}

const KpiCards: React.FC<KpiCardsProps> = ({ kpis }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map(kpi => <KpiCard key={kpi.label} kpi={kpi} />)}
        </div>
    );
};

export default KpiCards;
