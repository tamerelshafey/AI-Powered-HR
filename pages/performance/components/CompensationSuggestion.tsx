import React, { useState, useEffect } from 'react';
import { getCompensationSuggestion } from '../../../services/api';
import { PerformanceReview } from '../../../types';

interface CompensationSuggestionProps {
  review: PerformanceReview;
  onSubmit: (details: { increase: number, bonus: number, justification: string }) => void;
}

const CompensationSuggestion: React.FC<CompensationSuggestionProps> = ({ review, onSubmit }) => {
    const [loading, setLoading] = useState(true);
    const [suggestion, setSuggestion] = useState<{ salaryIncrease: number; bonus: number } | null>(null);
    const [increase, setIncrease] = useState(0);
    const [bonus, setBonus] = useState(0);
    const [justification, setJustification] = useState('');

    useEffect(() => {
        if (review.overallScore > 0) {
            const fetchSuggestion = async () => {
                setLoading(true);
                const data = await getCompensationSuggestion(review.employee.id, review.overallScore);
                setSuggestion(data);
                setIncrease(data.salaryIncrease);
                setBonus(data.bonus);
                setLoading(false);
            };
            fetchSuggestion();
        } else {
            setLoading(false);
        }
    }, [review.employee.id, review.overallScore]);
    
    const handleSubmit = () => {
        onSubmit({ increase, bonus, justification });
    };

    if (loading) {
        return (
            <div className="flex items-center text-sm text-purple-700">
                <i className="fas fa-spinner fa-spin me-2"></i>
                <span>جاري تحليل الأداء وإنشاء توصيات التعويض...</span>
            </div>
        );
    }
    
    if (!suggestion) return null;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                    <label className="block text-sm font-medium text-gray-700 mb-2">مقترح زيادة الراتب (%)</label>
                    <div className="flex items-center">
                        <input 
                            type="number" 
                            value={increase}
                            onChange={(e) => setIncrease(parseFloat(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">مقترح الذكاء الاصطناعي: {suggestion.salaryIncrease}%</p>
                </div>
                 <div className="bg-white p-4 rounded-lg border">
                    <label className="block text-sm font-medium text-gray-700 mb-2">مقترح مكافأة الأداء (مرة واحدة)</label>
                    <div className="flex items-center">
                        <input 
                            type="number" 
                            step="1000"
                            value={bonus}
                            onChange={(e) => setBonus(parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">مقترح الذكاء الاصطناعي: {suggestion.bonus.toLocaleString('ar-EG')} جنيه</p>
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المبررات</label>
                <textarea 
                    rows={3} 
                    value={justification}
                    onChange={(e) => setJustification(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                    placeholder="أضف مبرراتك لقرار التعويض..."
                    required
                ></textarea>
            </div>
            <button onClick={handleSubmit} className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                إرسال طلب التعويض للموافقة
            </button>
        </div>
    );
};

export default CompensationSuggestion;
