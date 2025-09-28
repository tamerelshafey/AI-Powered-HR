
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { JobTitle } from '../../types';
import { getJobTitles } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useI18n } from '../../context/I18nContext';

interface TreeNodeData extends JobTitle {
    children: TreeNodeData[];
}

interface TreeNodeProps {
    node: TreeNodeData;
    expandedNodes: Set<string>;
    onToggleNode: (nodeId: string) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, expandedNodes, onToggleNode }) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <li>
            <div className="node-card transform hover:scale-105 hover:shadow-xl focus-within:scale-105 focus-within:shadow-xl">
                 <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-sitemap text-2xl"></i>
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">{node.name}</p>
                        <p className="text-sm text-gray-600">{node.department}</p>
                        <p className="text-xs text-blue-600 font-semibold mt-2">{node.employeeCount} موظف</p>
                    </div>
                </div>
                 {hasChildren && (
                    <button 
                        onClick={() => onToggleNode(node.id)} 
                        className="node-toggle"
                        aria-expanded={isExpanded}
                        aria-controls={`subtree-${node.id}`}
                    >
                        <i className={`fas ${isExpanded ? 'fa-minus' : 'fa-plus'} text-xs`}></i>
                    </button>
                )}
            </div>
            {hasChildren && (
                <ul id={`subtree-${node.id}`} className={!isExpanded ? 'collapsed' : ''}>
                    {node.children.map(child => (
                        <TreeNode key={child.id} node={child} expandedNodes={expandedNodes} onToggleNode={onToggleNode} />
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
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
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
        const tree: TreeNodeData[] = [];
        const map: Record<string, TreeNodeData> = {};

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
    
    useEffect(() => {
        // Automatically expand the first level when data loads
        if (treeData.length > 0) {
            setExpandedNodes(new Set(treeData.map(node => node.id)));
        }
    }, [treeData]);

    const toggleNode = (nodeId: string) => {
        setExpandedNodes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(nodeId)) {
                newSet.delete(nodeId);
            } else {
                newSet.add(nodeId);
            }
            return newSet;
        });
    };
    
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
                    <div className="tree inline-block min-w-full">
                        <ul>
                            {treeData.map(node => (
                                <TreeNode key={node.id} node={node} expandedNodes={expandedNodes} onToggleNode={toggleNode} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrgChartPage;