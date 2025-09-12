
import React from 'react';

interface AiInsightCardProps {
    icon: string;
    title: string;
    description: string;
    color: 'blue' | 'green' | 'orange';
}

const colorClasses = {
    blue: { bg: 'bg-blue-50', iconBg: 'bg-blue-100', iconText: 'text-blue-600' },
    green: { bg: 'bg-green-50', iconBg: 'bg-green-100', iconText: 'text-green-600' },
    orange: { bg: 'bg-orange-50', iconBg: 'bg-orange-100', iconText: 'text-orange-600' },
};

const AiInsightCard: React.FC<AiInsightCardProps> = React.memo(({ icon, title, description, color }) => {
    const classes = colorClasses[color];

    return (
        <div className={`flex items-start space-x-3 space-x-reverse p-3 ${classes.bg} rounded-lg`}>
            <div className={`w-8 h-8 ${classes.iconBg} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                <i className={`${icon} ${classes.iconText} text-sm`}></i>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="text-xs text-gray-600 mt-1">{description}</p>
            </div>
        </div>
    );
});

export default AiInsightCard;
