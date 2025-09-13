
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{subtitle}</p>
      </div>
      {actions && (
        <div className="flex items-center space-x-3 space-x-reverse mt-4 lg:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
