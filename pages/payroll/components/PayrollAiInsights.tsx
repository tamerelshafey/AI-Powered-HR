import React from 'react';
import AiInsightCard from '../../../components/dashboard/AiInsightCard';

const PayrollAiInsights: React.FC = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <i className="fas fa-brain text-purple-600 me-2"></i>
                رؤى الرواتب بالذكاء الاصطناعي
            </h3>
        </div>
        <div className="p-6 space-y-4">
            <AiInsightCard icon="fas fa-chart-line" color="orange" title="اتجاه التكلفة" description="زادت تكلفة الرواتب الإجمالية بنسبة 4.5% هذا الربع، بشكل أساسي بسبب العمل الإضافي في قسم الهندسة." />
            <AiInsightCard icon="fas fa-percent" color="blue" title="تحليل البدلات" description="تشكل البدلات 18% من إجمالي التكاليف. نوصي بمراجعة سياسة البدلات لضمان التنافسية." />
        </div>
    </div>
);

export default PayrollAiInsights;
