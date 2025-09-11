
import React from 'react';
import { PredictiveInsight } from '../../../types';

const badgeColorClasses = {
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
};

const valueColorClasses = {
    red: 'text-red-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
};

const PredictiveCard: React.FC<{ insight: PredictiveInsight }> = ({ insight }) => (
    <div className={`p-4 bg-gradient-to-br ${insight.gradient} rounded-lg border border-gray-100`}>
        <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">{insight.title}</h4>
            <span className={`text-xs ${badgeColorClasses[insight.badgeColor]} px-2 py-1 rounded-full`}>{insight.badge}</span>
        </div>
        <p className={`text-2xl font-bold ${valueColorClasses[insight.badgeColor]} mb-2`}>{insight.value}</p>
        <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
        <div className="flex items-center text-xs text-gray-500">
            <i className={`${insight.icon} me-1`}></i>
            <span>{insight.details}</span>
        </div>
    </div>
);


const PredictiveAnalytics: React.FC<{ insights: PredictiveInsight[] }> = ({ insights }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <i className="fas fa-wand-magic-sparkles text-indigo-600 me-2"></i>
                    التحليلات التنبؤية
                </h3>
                <p className="text-sm text-gray-600 mt-1">توقعات وتنبؤات مدعومة بالذكاء الاصطناعي</p>
            </div>
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {insights.map(insight => <PredictiveCard key={insight.title} insight={insight} />)}
                </div>
            </div>
        </div>
    );
};

export default PredictiveAnalytics;
