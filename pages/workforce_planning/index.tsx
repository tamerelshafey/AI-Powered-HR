import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PageHeader from '../../components/PageHeader';
import { DepartmentWorkforce } from '../../types';
import { getWorkforceData } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useI18n } from '../../context/I18nContext';
import WorkforceStats from './components/WorkforceStats';
import HeadcountTable from './components/HeadcountTable';
import BudgetSimulator from './components/BudgetSimulator';
import HeadcountChart from './components/HeadcountChart';
import CostBreakdownChart from './components/CostBreakdownChart';

const WorkforcePlanningPage: React.FC = () => {
    const [data, setData] = useState<DepartmentWorkforce[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [plannedHires, setPlannedHires] = useState<Record<string, number>>({});
    const [meritIncrease, setMeritIncrease] = useState<number>(3);
    const [promotionsBudget, setPromotionsBudget] = useState<number>(500000);
    const { t } = useI18n();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const workforceData = await getWorkforceData();
            setData(workforceData);
            // Initialize plannedHires state
            const initialHires: Record<string, number> = {};
            workforceData.forEach(d => {
                initialHires[d.department] = 0;
            });
            setPlannedHires(initialHires);
        } catch (err) {
            console.error("Failed to fetch workforce data", err);
            setError("Failed to load workforce data.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleHiresChange = (department: string, value: number) => {
        setPlannedHires(prev => ({ ...prev, [department]: value }));
    };

    const calculations = useMemo(() => {
        const currentHeadcount = data.reduce((sum, d) => sum + d.headcount, 0);
        const projectedHeadcount = data.reduce((sum, d) => sum + d.headcount + (plannedHires[d.department] || 0), 0);
        
        const currentAnnualCost = data.reduce((sum, d) => sum + d.headcount * d.averageSalary * 12, 0);
        
        const newHiresCost = data.reduce((sum, d) => {
            // Assume new hires cost is the average salary for the department for half a year
            const numHires = plannedHires[d.department] || 0;
            return sum + (numHires * d.averageSalary * 6);
        }, 0);

        const meritIncreaseCost = currentAnnualCost * (meritIncrease / 100);

        const projectedAnnualCost = currentAnnualCost + newHiresCost + meritIncreaseCost + promotionsBudget;

        return {
            currentHeadcount,
            projectedHeadcount,
            currentAnnualCost,
            projectedAnnualCost,
            costBreakdown: {
                currentSalaries: currentAnnualCost,
                newHiresCost,
                meritIncreaseCost,
                promotionsCost: promotionsBudget
            }
        };
    }, [data, plannedHires, meritIncrease, promotionsBudget]);

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchData} />;
    }

    return (
        <div>
            <PageHeader
                title={t('page.workforce_planning.header.title')}
                subtitle={t('page.workforce_planning.header.subtitle')}
            />

            <WorkforceStats
                currentHeadcount={calculations.currentHeadcount}
                projectedHeadcount={calculations.projectedHeadcount}
                currentAnnualCost={calculations.currentAnnualCost}
                projectedAnnualCost={calculations.projectedAnnualCost}
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                    <HeadcountTable
                        data={data}
                        plannedHires={plannedHires}
                        onHiresChange={handleHiresChange}
                    />
                </div>
                <div className="lg:col-span-2">
                    <BudgetSimulator
                        meritIncrease={meritIncrease}
                        onMeritIncreaseChange={setMeritIncrease}
                        promotionsBudget={promotionsBudget}
                        onPromotionsBudgetChange={setPromotionsBudget}
                        costBreakdown={calculations.costBreakdown}
                    />
                </div>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <HeadcountChart data={data} plannedHires={plannedHires} />
                <CostBreakdownChart costBreakdown={calculations.costBreakdown} />
            </div>
        </div>
    );
};

export default WorkforcePlanningPage;
