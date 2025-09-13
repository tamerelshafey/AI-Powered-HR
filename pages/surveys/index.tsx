
import React, { useState, useEffect, useCallback } from 'react';
import { Survey, SurveyAnalytics } from '../../types';
import { getSurveys, getSurveyAnalytics } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import LoadingSpinner from '../../components/LoadingSpinner';
import PageHeader from '../../components/PageHeader';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SurveyList from './components/SurveyList';
import { useI18n } from '../../context/I18nContext';

const SurveysPage: React.FC = () => {
    const [surveys, setSurveys] = useState<Survey[]>([]);
    const [analytics, setAnalytics] = useState<SurveyAnalytics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useI18n();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [surveysData, analyticsData] = await Promise.all([
                getSurveys(),
                getSurveyAnalytics('survey_annual_2024')
            ]);
            setSurveys(surveysData);
            setAnalytics(analyticsData);
        } catch (err) {
            console.error("Failed to fetch surveys data", err);
            setError("Failed to load survey data. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchData} />;
    }

    return (
        <div>
            <PageHeader
                title={t('page.surveys.header.title')}
                subtitle={t('page.surveys.header.subtitle')}
                actions={
                    <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-plus"></i>
                        <span>{t('page.surveys.header.create')}</span>
                    </button>
                }
            />
            {analytics && <AnalyticsDashboard analytics={analytics} />}
            <div className="mt-8">
                <SurveyList surveys={surveys} />
            </div>
        </div>
    );
};

export default SurveysPage;
