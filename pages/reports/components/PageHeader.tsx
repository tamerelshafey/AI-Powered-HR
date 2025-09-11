
import React from 'react';

interface PageHeaderProps {
    onOpenReportBuilder: () => void;
    onExport: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ onOpenReportBuilder, onExport }) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">التحليلات والتقارير</h2>
                <p className="text-gray-600">رؤى شاملة وتحليلات موارد بشرية مدفوعة بالبيانات</p>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse mt-4 lg:mt-0">
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                    <option>آخر 30 يومًا</option>
                    <option>آخر 90 يومًا</option>
                    <option>آخر 6 أشهر</option>
                    <option>آخر سنة</option>
                </select>
                <button onClick={onOpenReportBuilder} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <i className="fas fa-chart-bar"></i>
                    <span>منشئ التقارير</span>
                </button>
                <button onClick={onExport} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <i className="fas fa-download"></i>
                    <span>تصدير</span>
                </button>
            </div>
        </div>
    );
};

export default PageHeader;
