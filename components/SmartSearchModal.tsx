
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { employees } from '../pages/employees/data';
import { candidates } from '../pages/recruitment/data';
import { HiringStage } from '../types';
import { useModalAccessibility } from '../hooks/useModalAccessibility';

// Simplified types for results
interface EmployeeResult {
  name: string;
  jobTitle: string;
  department: string;
}

interface CandidateResult {
  name:string;
  positionApplied: string;
  stage: HiringStage;
}

type SearchResult = EmployeeResult | CandidateResult;

// Type guard to check if a result is an EmployeeResult
function isEmployeeResult(result: SearchResult): result is EmployeeResult {
    return (result as EmployeeResult).department !== undefined;
}

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// AI Client Initialization
let ai: GoogleGenAI | null = null;
const getAiClient = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }
  return ai;
};


const EmployeeResultCard: React.FC<{ employee: EmployeeResult }> = ({ employee }) => (
    <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center space-x-3 space-x-reverse">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {employee.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
            <p className="font-semibold text-gray-800">{employee.name}</p>
            <p className="text-sm text-gray-600">{employee.jobTitle} - {employee.department}</p>
        </div>
    </div>
);

const CandidateResultCard: React.FC<{ candidate: CandidateResult }> = ({ candidate }) => (
    <div className="p-3 bg-white rounded-lg border border-gray-200 flex items-center space-x-3 space-x-reverse">
        <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
            {candidate.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
            <p className="font-semibold text-gray-800">{candidate.name}</p>
            <p className="text-sm text-gray-600">{candidate.positionApplied} - {candidate.stage}</p>
        </div>
    </div>
);


const SmartSearchModal: React.FC<SmartSearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<{ summary: string; results: SearchResult[] } | null>(null);

    const modalRef = useRef<HTMLDivElement>(null);
    useFocusTrap(modalRef, isOpen);
    useModalAccessibility(isOpen, onClose);

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            // Delay reset to allow animation to finish
            setTimeout(() => {
                setQuery('');
                setIsLoading(false);
                setError(null);
                setResults(null);
            }, 300);
        }
    }, [isOpen]);
    
    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError(null);
        setResults(null);

        const ai = getAiClient();
        const simplifiedEmployees = employees.slice(0, 10).map(e => ({ name: `${e.firstName} ${e.lastName}`, jobTitle: e.jobTitle, department: e.department }));
        const simplifiedCandidates = candidates.slice(0, 10).map(c => ({ name: c.name, positionApplied: c.positionApplied, stage: c.stage }));
        
        const prompt = `
            System Instruction: You are an intelligent HR assistant for the "Bokra HRMS" system. Your task is to understand user queries in Arabic and provide answers in a structured JSON format. You have access to the following data:
            - Employee list: ${JSON.stringify(simplifiedEmployees)}
            - Candidate list for positions like 'Senior Frontend Engineer' and 'Marketing Manager': ${JSON.stringify(simplifiedCandidates)}
            - Attendance data shows 'Mike Wilson' and 'Karen Young' were frequently absent last month.
            - Job postings are available for 'Senior Frontend Engineer' and 'Marketing Manager'.
            
            Based on the user's query, you MUST respond with a JSON object with two keys: "summary" (a one-sentence Arabic summary of the findings) and "results" (an array of objects).
            - If the query is about employees, each object in "results" must have keys: "name", "jobTitle", "department".
            - If the query is about candidates, each object in "results" must have keys: "name", "positionApplied", "stage".
            - If you cannot find specific data or the query is too general, return an empty "results" array and explain in the "summary".
            - ONLY return the JSON object. Do not add any text, comments, or markdown formatting like \`\`\`json before or after the JSON object.

            User Query: "${query}"
        `;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                }
            });

            // FIX: Access the generated text directly from the `text` property of the response object.
            const jsonText = response.text;
            const parsedResult = JSON.parse(jsonText);
            setResults(parsedResult);
        } catch (err) {
            console.error("AI Search Error:", err);
            setError("عفواً، حدث خطأ أثناء معالجة طلبك. قد يكون بسبب سياسات السلامة. يرجى المحاولة مرة أخرى بعبارة مختلفة.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const examplePrompts = [
        "من هم المرشحون لوظيفة مهندس واجهات أمامية؟",
        "اعرض لي الموظفين في قسم الهندسة",
        "من هم الموظفون الأكثر غياباً الشهر الماضي؟"
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 modal-backdrop z-50 flex items-start justify-center p-4 pt-[15vh]" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="smart-search-title">
            <div 
                ref={modalRef} 
                className="bg-gray-50 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all animate-search-modal-fade-in" 
                onClick={e => e.stopPropagation()}
            >
                <form onSubmit={handleSearch} className="p-4 border-b border-gray-200">
                    <h2 id="smart-search-title" className="sr-only">Smart Search</h2>
                    <div className="relative">
                        <i className="fas fa-search absolute start-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        <input 
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="اسأل عن الموظفين، المرشحين، الحضور..."
                            className="w-full ps-12 pe-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-base"
                            aria-label="Smart search query input"
                        />
                    </div>
                </form>

                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {!results && !isLoading && !error && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">جرب أن تسأل:</h3>
                            <div className="space-y-2">
                                {examplePrompts.map((prompt, i) => (
                                    <button key={i} onClick={() => setQuery(prompt)} className="w-full text-start p-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {isLoading && (
                         <div className="text-center py-10">
                            <i className="fas fa-spinner fa-spin text-3xl text-blue-600"></i>
                            <p className="mt-3 text-gray-600">الذكاء الاصطناعي يفكر...</p>
                        </div>
                    )}

                    {error && (
                        <div role="alert" className="text-center py-10 text-red-700 bg-red-50 p-4 rounded-lg">
                            <i className="fas fa-exclamation-triangle text-3xl mb-3"></i>
                            <p>{error}</p>
                        </div>
                    )}
                    
                    {results && (
                        <div>
                            <p className="text-base font-semibold text-gray-800 mb-4 bg-white p-3 rounded-md border">{results.summary}</p>
                            {results.results.length > 0 ? (
                                <div className="space-y-3">
                                    {results.results.map((item, index) => (
                                       isEmployeeResult(item) ?
                                         <EmployeeResultCard key={index} employee={item} /> :
                                         <CandidateResultCard key={index} candidate={item as CandidateResult} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 text-gray-500">
                                    <i className="fas fa-search-minus text-3xl mb-3"></i>
                                    <p>لا توجد نتائج مطابقة لبحثك.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SmartSearchModal;