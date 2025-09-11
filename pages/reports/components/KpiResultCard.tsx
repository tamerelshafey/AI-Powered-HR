
import React from 'react';
import { AiKpiData } from '../../../types';

interface KpiResultCardProps {
    data: AiKpiData;
}

const KpiResultCard: React.FC<KpiResultCardProps> = ({ data }) => {
    return (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-center">
            <p className="text-lg text-blue-800">{data.title}</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{data.value}</p>
        </div>
    );
};

export default KpiResultCard;
