
import React from 'react';

const AiPoweredInsights: React.FC = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <i className="fas fa-brain text-purple-600 me-2"></i>
                    رؤى مدعومة بالذكاء الاصطناعي
                </h3>
            </div>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-start space-x-4 space-x-reverse p-4 bg-blue-50 rounded-lg">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-lightbulb text-blue-600"></i>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">تحسين الإنتاجية</h4>
                            <p className="text-sm text-gray-600 mb-3">يظهر التحليل أن الفرق ذات ترتيبات العمل المرنة لديها درجات إنتاجية أعلى بنسبة 23%. ضع في اعتبارك توسيع سياسات العمل عن بعد.</p>
                            <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                                <span><i className="fas fa-chart-line me-1"></i>التأثير: مرتفع</span>
                                <span><i className="fas fa-clock me-1"></i>التنفيذ: 2-4 أسابيع</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4 space-x-reverse p-4 bg-orange-50 rounded-lg">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-exclamation-triangle text-orange-600"></i>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">تنبيه بمخاطر الاحتفاظ بالموظفين</h4>
                            <p className="text-sm text-gray-600 mb-3">يُظهر 12 موظفًا في قسم الهندسة أنماطًا مشابهة لأولئك الذين غادروا في الماضي. نوصي بمبادرات تفاعل فورية.</p>
                            <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                                <span><i className="fas fa-exclamation-circle me-1"></i>الأولوية: عالية</span>
                                <span><i className="fas fa-users me-1"></i>المتأثرون: 12 موظف</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiPoweredInsights;
