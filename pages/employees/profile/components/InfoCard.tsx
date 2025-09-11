import React from 'react';

interface InfoItem {
  label: string;
  value: React.ReactNode;
}

interface InfoCardProps {
  title: string;
  icon: string;
  items: InfoItem[];
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, items }) => {
  return (
    <div className="bg-white rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <i className={`${icon} text-gray-500 me-2`}></i>
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        {items.map((item, index) => (
          <div key={index}>
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="font-medium text-gray-800">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;