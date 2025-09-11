
import React from 'react';
import { Report } from '../../../types';

const colorClasses: Record<string, { bg: string, text: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
};

const RecentReports: React.FC<{ reports: Report[], onOpenReportBuilder: () => void }> = ({ reports, onOpenReportBuilder }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">التقارير الأخيرة</h3>
                    <button onClick={onOpenReportBuilder} className="text-sm text-blue-600 hover:text-blue-700">إنشاء جديد</button>
                </div>
            </div>
            <div className="p-6 space-y-4">
                {reports.map(report => {
                    const colors = colorClasses[report.iconColor] || colorClasses.blue;
                    return (
                        <div key={report.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                <div className="flex items-center space-x-3 space-x-reverse mb-3 sm:mb-0">
                                    <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
                                        <i className={`${report.icon} ${colors.text}`}></i>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                                        <p className="text-xs text-gray-500">تم إنشاؤه {report.generated} • {report.size}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 space-x-reverse self-end sm:self-center">
                                    <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-200"><i className="fas fa-download"></i></button>
                                    <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-200"><i className="fas fa-share"></i></button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecentReports;