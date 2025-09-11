
import React from 'react';

const HeatmapRow: React.FC<{ hour: string; cells: string[] }> = ({ hour, cells }) => (
    <div className="flex items-center space-x-1 space-x-reverse">
        <span className="text-xs text-gray-500 w-12 text-start">{hour}</span>
        <div className="flex space-x-1 space-x-reverse">
            {cells.map((cell, index) => (
                <div key={index} className={`heatmap-cell w-4 h-4 ${cell} rounded-sm`}></div>
            ))}
        </div>
    </div>
);

const ActivityHeatmap: React.FC = () => {
    const heatmapData = [
        { hour: '9 صباحًا', cells: ['bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-400'] },
        { hour: '11 صباحًا', cells: ['bg-green-500', 'bg-green-600', 'bg-green-600', 'bg-green-500', 'bg-green-400'] },
        { hour: '1 مساءً', cells: ['bg-yellow-200', 'bg-yellow-300', 'bg-yellow-200', 'bg-yellow-200', 'bg-yellow-100'] },
        { hour: '3 مساءً', cells: ['bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-500', 'bg-green-400'] },
        { hour: '5 مساءً', cells: ['bg-yellow-200', 'bg-yellow-100', 'bg-gray-200', 'bg-gray-200', 'bg-gray-100'] },
    ];
    
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">خريطة النشاط الحرارية</h3>
                <p className="text-sm text-gray-600">نشاط الموظفين حسب الساعة</p>
            </div>
            <div className="p-6">
                <div className="overflow-x-auto pb-2">
                    <div className="inline-block min-w-full">
                        <div className="space-y-2">
                            {heatmapData.map(row => <HeatmapRow key={row.hour} {...row} />)}
                        </div>
                        <div className="mt-4 flex items-center justify-around text-xs text-gray-500 pe-10">
                            <span>الإثنين</span>
                            <span>الثلاثاء</span>
                            <span>الأربعاء</span>
                            <span>الخميس</span>
                            <span>الجمعة</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityHeatmap;