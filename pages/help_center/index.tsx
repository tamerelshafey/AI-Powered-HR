
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { HelpCenterCategory, HelpCenterArticle } from '../../types';
import { getHelpCenterCategories, getHelpCenterArticles } from '../../services/api';
import PageHeader from './components/PageHeader';
import CategoryGrid from './components/CategoryGrid';
import ArticleList from './components/ArticleList';
import ArticleModal from './components/ArticleModal';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import { useSearch } from '../../hooks/useSearch';

const HelpCenterPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<HelpCenterCategory[]>([]);
    const [articles, setArticles] = useState<HelpCenterArticle[]>([]);
    const [selectedArticle, setSelectedArticle] = useState<HelpCenterArticle | null>(null);

    const { searchTerm, setSearchTerm, filteredItems: searchResults } = useSearch(
        articles,
        ['title', 'content']
    );

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [cats, arts] = await Promise.all([
                getHelpCenterCategories(),
                getHelpCenterArticles()
            ]);
            setCategories(cats);
            setArticles(arts);
        } catch (error) {
            console.error("Failed to fetch help center data", error);
            setError("فشل في تحميل بيانات مركز المساعدة.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const popularArticles = useMemo(() => {
        return articles.filter(a => a.isPopular).sort((a, b) => b.views - a.views);
    }, [articles]);

    const recentArticles = useMemo(() => {
        return [...articles].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()).slice(0, 5);
    }, [articles]);

    const handleCategoryClick = (categoryId: string) => {
        const category = categories.find(c => c.id === categoryId);
        if (category) {
            setSearchTerm(category.name);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
            </div>
        );
    }
    
    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchData} />;
    }

    return (
        <div>
            <PageHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            {searchTerm ? (
                <ArticleList
                    title={`نتائج البحث عن "${searchTerm}"`}
                    icon="fas fa-search"
                    articles={searchResults}
                    onArticleClick={setSelectedArticle}
                />
            ) : (
                <div className="space-y-8">
                    <CategoryGrid categories={categories} onCategoryClick={handleCategoryClick} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <ArticleList
                            title="المقالات الأكثر شيوعًا"
                            icon="fas fa-fire"
                            articles={popularArticles}
                            onArticleClick={setSelectedArticle}
                        />
                        <ArticleList
                            title="أحدث المقالات"
                            icon="fas fa-clock"
                            articles={recentArticles}
                            onArticleClick={setSelectedArticle}
                        />
                    </div>
                </div>
            )}
            
            <ArticleModal 
                isOpen={!!selectedArticle}
                onClose={() => setSelectedArticle(null)}
                article={selectedArticle}
            />
        </div>
    );
};

export default HelpCenterPage;
