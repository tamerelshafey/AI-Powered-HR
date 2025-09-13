import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { useI18n } from '../../../context/I18nContext';
import { AiAnalysisResult, AiKpiData, AiTableData } from '../../../types';
import KpiResultCard from './KpiResultCard';
import TableResult from './TableResult';
import { employees } from '../../employees/data';
import { allReviews } from '../../performance/data';
import { allLeaveRequests } from '../../leaves/data';

// AI Client Initialization
let ai: GoogleGenAI | null = null;
const getAiClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }
  return ai;
};

const AiAnalyst: React.FC = () => {
    const { t } = useI18n();
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AiAnalysisResult | null>(null);

    const handleAnalyze = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        const ai = getAiClient();
        
        // Provide a small, relevant subset of data as context for the model.
        const employeeContext = employees.slice(0, 5).map(e => ({ name: `${e.firstName} ${e.lastName}`, jobTitle: e.jobTitle, department: e.department }));
        const reviewContext = allReviews.slice(0, 5).map(r => ({ employeeName: `${r.employee.firstName} ${r.employee.lastName}`, overallScore: r.overallScore, status: r.status }));
        const leaveContext = allLeaveRequests.slice(0, 5).map(l => ({ employeeName: `${l.employee.firstName} ${l.employee.lastName}`, leaveType: l.leaveType, status: l.status, days: l.days }));

        const prompt = `
            أنت محلل بيانات خبير في الموارد البشرية لنظام "Bokra HRMS". مهمتك هي تحليل استفسارات المستخدم باللغة العربية بناءً على البيانات الوصفية المتاحة وتقديم إجابة منظمة بصيغة JSON.
            البيانات المتاحة لك (أمثلة):
            1. الموظفون (employees): [{name, jobTitle, department}] -> ${JSON.stringify(employeeContext)}
            2. تقييمات الأداء (performanceReviews): [{employeeName, overallScore, status}] -> ${JSON.stringify(reviewContext)}
            3. طلبات الإجازات (leaveRequests): [{employeeName, leaveType, status, days}] -> ${JSON.stringify(leaveContext)}

            استعلام المستخدم هو: "${query}"

            بناءً على الاستعلام، يجب عليك الرد **حصريًا** بكائن JSON يطابق المخطط التالي. لا تضف أي نصوص أو تعليقات قبل أو بعد كائن JSON.
        `;

        const responseSchema = {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "ملخص تحليلي من جملة واحدة باللغة العربية للنتائج." },
                resultType: { type: Type.STRING, enum: ['kpi', 'table', 'text'], description: "نوع النتيجة." },
                data: { type: Type.STRING, description: "البيانات الفعلية كسلسلة نصية بتنسيق JSON. لـ 'kpi'، يجب أن يكون '{ \"title\": \"...\", \"value\": \"...\" }'. لـ 'table'، يجب أن يكون '[{ \"column1\": \"...\" }]'." }
            }
        };

        try {
            // FIX: Updated deprecated model 'gemini-1.5-pro' to 'gemini-2.5-flash'.
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: responseSchema
                }
            });

            // FIX: Access the generated text directly from the `text` property of the response object.
            const jsonText = response.text;
            const parsedResult = JSON.parse(jsonText);
            const data = JSON.parse(parsedResult.data);
            setResult({ ...parsedResult, data });

        } catch (err) {
            console.error("AI Analyst Error:", err);
            setError(t('aiAnalyst.error'));
        } finally {
            setIsLoading(false);
        }
    };
    
    const examplePrompts = [
        t('aiAnalyst.prompt1'),
        t('aiAnalyst.prompt2'),
        t('aiAnalyst.prompt3')
    ];

    const renderResult = () => {
        if (!result) return null;
        
        switch(result.resultType) {
            case 'kpi':
                return <KpiResultCard data={result.data as AiKpiData} />;
            case 'table':
                return <TableResult data={result.data as AiTableData} />;
            case 'text':
                return <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{result.data as string}</p>;
            default:
                return <p className="text-red-600">{t('aiAnalyst.unknownResultType')}</p>;
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-brain text-white text-2xl"></i>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{t('aiAnalyst.title')}</h3>
                        <p className="text-sm text-gray-600">{t('aiAnalyst.subtitle')}</p>
                    </div>
                </div>

                <form onSubmit={handleAnalyze} className="mt-4">
                    <div className="relative">
                        <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t('aiAnalyst.placeholder')}
                            className="w-full ps-4 pe-24 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={2}
                            disabled={isLoading}
                        />
                        <button 
                            type="submit"
                            disabled={isLoading || !query.trim()}
                            className="absolute top-1/2 -translate-y-1/2 end-3 flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                        >
                            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-search"></i>}
                            <span>{t('aiAnalyst.analyze')}</span>
                        </button>
                    </div>
                </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 min-h-[15rem] flex items-center justify-center">
                {isLoading ? (
                    <div className="text-center text-gray-600">
                        <i className="fas fa-spinner fa-spin text-3xl text-blue-500"></i>
                        <p className="mt-3">{t('aiAnalyst.loading')}</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-600">
                        <i className="fas fa-exclamation-triangle text-3xl"></i>
                        <p className="mt-3">{error}</p>
                    </div>
                ) : result ? (
                    <div className="w-full space-y-4 animate-content-fade-in">
                        <div className="p-3 bg-indigo-50 border-s-4 border-indigo-500 rounded-e-lg">
                            <h4 className="text-sm font-semibold text-indigo-800">{t('aiAnalyst.summary')}</h4>
                            <p className="text-sm text-indigo-700">{result.summary}</p>
                        </div>
                        {renderResult()}
                    </div>
                ) : (
                    <div className="text-center">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">{t('aiAnalyst.tryAsking')}</h4>
                        <div className="flex flex-wrap justify-center gap-2">
                            {examplePrompts.map((prompt, i) => (
                                <button key={i} onClick={() => setQuery(prompt)} className="px-3 py-1.5 text-sm text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors">
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AiAnalyst;