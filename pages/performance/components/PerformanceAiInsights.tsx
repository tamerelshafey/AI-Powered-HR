
import React from 'react';
import AiInsightCard from '../../../components/dashboard/AiInsightCard';

const PerformanceAiInsights: React.FC = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <i className="fas fa-brain text-purple-600 me-2"></i>
                رؤى الأداء بالذكاء الاصطناعي
            </h3>
        </div>
        <div className="p-6 space-y-4">
            <AiInsightCard icon="fas fa-user-graduate" color="blue" title="تحديد القادة" description="يُظهر جون دو باستمرار مهارات قيادية. ضع في اعتبارك ترشيحه لبرنامج تدريب المديرين." />
            <AiInsightCard icon="fas fa-arrow-trend-up" color="green" title="تحسن ملحوظ" description="زاد أداء فريق التسويق بنسبة 18% هذا الربع. قم بتحليل العوامل المساهمة." />
            <AiInsightCard icon="fas fa-flag" color="orange" title="تنبيه الأداء" description="انخفض أداء أليكس تشين في الأسابيع الأربعة الماضية. قد يكون بحاجة إلى دعم أو تدريب." />
        </div>
    </div>
);

export default PerformanceAiInsights;
