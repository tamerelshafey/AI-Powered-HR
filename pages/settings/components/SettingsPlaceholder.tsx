import React from 'react';

interface SettingsPlaceholderProps {
  title: string;
  icon: string;
  description: string;
}

const SettingsPlaceholder: React.FC<SettingsPlaceholderProps> = ({ title, icon, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
         <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <div className="p-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 m-6 rounded-lg min-h-[40vh]">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i className={`${icon} text-3xl text-gray-400`}></i>
            </div>
            <h4 className="mt-4 text-xl font-semibold text-gray-600">هذه الوحدة قيد الإنشاء</h4>
            <p className="mt-2 text-gray-500 text-center">سيتم تفعيل هذا القسم من الإعدادات قريبًا لتوفير تحكم كامل.</p>
        </div>
    </div>
  );
};

export default SettingsPlaceholder;
