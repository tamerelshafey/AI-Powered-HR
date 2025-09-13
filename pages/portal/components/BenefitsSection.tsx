import React, { useState, useEffect } from 'react';
import { Benefit } from '../../../types';
import { getBenefits } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

const categoryStyles: Record<Benefit['category'], { iconBg: string, iconColor: string }> = {
    Health: { iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    Financial: { iconBg: 'bg-green-100', iconColor: 'text-green-600' },
    Wellness: { iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
};

const BenefitCard: React.FC<{ benefit: Benefit }> = ({ benefit }) => {
    const styles = categoryStyles[benefit.category];
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
            <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${styles.iconBg} rounded-lg flex items-center justify-center me-4`}>
                    <i className={`${benefit.icon} ${styles.iconColor} text-2xl`}></i>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                </div>
            </div>
            <div className="space-y-3 flex-grow">
                {benefit.details.map(detail => (
                    <div key={detail.label} className="flex justify-between text-sm">
                        <span className="text-gray-600">{detail.label}</span>
                        <span className="font-medium text-gray-900">{detail.value}</span>
                    </div>
                ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
                <a href={benefit.action.link} className="w-full text-center block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    {benefit.action.label}
                </a>
            </div>
        </div>
    );
};


const BenefitsSection: React.FC = () => {
    const [benefits, setBenefits] = useState<Benefit[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getBenefits();
                setBenefits(data);
            } catch (error) {
                console.error("Failed to fetch benefits data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center"><LoadingSpinner /></div>;
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">المنافع</h2>
                <p className="text-gray-600">نظرة عامة على حزمة المنافع الخاصة بك.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map(benefit => (
                    <BenefitCard key={benefit.id} benefit={benefit} />
                ))}
            </div>
        </div>
    );
};

export default BenefitsSection;