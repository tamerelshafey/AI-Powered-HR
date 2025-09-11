
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { JobTitle } from '../../types';
import { getJobTitles } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useI18n } from '../../context/I18nContext';

interface TreeNode extends JobTitle {
    children: TreeNode[];
}

interface NodeProps {
    node: TreeNode;
}

const Node: React.FC<NodeProps> = ({ node }) => {
    return (
        <li>
            <div className="node-card transform hover:scale-105 hover:shadow-xl focus-within:scale-105 focus-within:shadow-xl">
                <p className="font-bold text-gray-800">{node.name}</p>
                <p className="text-sm text-gray-600">{node.department}</p>
                <p className="text-xs text-blue-600 font-semibold mt-2">{node.employeeCount} موظف</p>
            </div>
            {node.children && node.children.length > 0 && (
                <ul>
                    {node.children.map(child => (
                        <Node key={child.id} node={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};

const OrgChartPage: React.FC = () => {
    const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { t } = useI18n();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getJobTitles();
            setJobTitles(data);
        } catch (error) {
            console.error("Failed to fetch job titles for org chart", error);
            setError("فشل تحميل بيانات الهيكل التنظيمي.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const treeData = useMemo(() => {
        const tree: TreeNode[] = [];
        const map: Record<string, TreeNode> = {};

        jobTitles.forEach(jt => {
            map[jt.id] = { ...jt, children: [] };
        });

        jobTitles.forEach(jt => {
            if (jt.parentJobTitleId && map[jt.parentJobTitleId]) {
                map[jt.parentJobTitleId].children.push(map[jt.id]);
            } else {
                tree.push(map[jt.id]);
            }
        });

        return tree;
    }, [jobTitles]);
    
    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorDisplay message={error} onRetry={fetchData} />;
    }

    return (
        <div>
             <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('nav.org_chart')}</h2>
                <p className="text-gray-600">عرض تفاعلي للتسلسل الهرمي للشركة.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="org-chart overflow-x-auto pb-4">
                    <div className="tree inline-block">
                        <ul>
                            {treeData.map(node => (
                                <Node key={node.id} node={node} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgChartPage;