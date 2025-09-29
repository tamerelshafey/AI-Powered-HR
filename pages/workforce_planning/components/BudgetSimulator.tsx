import React from 'react';
import { useI18n } from '../../../context/I18nContext';
import { formatCurrency } from '../../../utils/formatters';

interface BudgetSimulatorProps {
    meritIncrease: number;
    onMeritIncreaseChange: (value: number) => void;
    promotionsBudget: number;
    onPromotionsBudgetChange: (value: number) => void;
    costBreakdown: {
        currentSalaries: number;
        newHiresCost: number;
        meritIncreaseCost: number;
        promotionsCost: number;
    };
}

const BudgetSimulator: React.FC<BudgetSimulatorProps> = ({
    meritIncrease,
    onMeritIncreaseChange,
    promotionsBudget,
    onPromotionsBudgetChange,
    costBreakdown,
}) => {
    const { t, language } = useI18n();
    const currencyOptions = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
    // FIX: Explicitly cast value to number to resolve TypeScript error where `Object.values` may return `unknown[]`.
    const totalProjectedCost = Object.values(costBreakdown).reduce((sum, value) => sum + (value as number), 0);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{t('page.workforce_planning.simulator.title')}</h3>
            </div>
            <div className="p-6">
                <div className="space-y-4 mb-6 pb-4 border-b">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.workforce_planning.simulator.meritIncrease')}</label>
                        <input
                            type="number"
                            step="0.1"
                            value={meritIncrease}
                            onChange={(e) => onMeritIncreaseChange(parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('page.workforce_planning.simulator.promotionsBudget')}</label>
                        <input
                            type="number"
                            step="10000"
                            value={promotionsBudget}
                            onChange={(e) => onPromotionsBudgetChange(parseInt(e.target.value, 10) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-800 mb-2">{t('page.workforce_planning.simulator.breakdownTitle')}</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-600">{t('page.workforce_planning.simulator.currentSalaries')}</span><span>{formatCurrency(costBreakdown.currentSalaries, language, currencyOptions)}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">{t('page.workforce_planning.simulator.newHiresCost')}</span><span>{formatCurrency(costBreakdown.newHiresCost, language, currencyOptions)}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">{t('page.workforce_planning.simulator.meritIncreaseCost')}</span><span>{formatCurrency(costBreakdown.meritIncreaseCost, language, currencyOptions)}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">{t('page.workforce_planning.simulator.promotionsCost')}</span><span>{formatCurrency(costBreakdown.promotionsCost, language, currencyOptions)}</span></div>
                        <div className="flex justify-between font-bold border-t pt-2 mt-2"><span>{t('page.workforce_planning.simulator.totalProjectedCost')}</span><span>{formatCurrency(totalProjectedCost, language, currencyOptions)}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetSimulator;
