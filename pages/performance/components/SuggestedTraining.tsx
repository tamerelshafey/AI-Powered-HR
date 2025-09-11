import React, { useState, useEffect } from 'react';
import { Course } from '../../../types';
import { findCoursesBySkill } from '../../../services/api';

interface SuggestedTrainingProps {
  skill: string;
  onEnroll: (courseTitle: string) => void;
}

const SuggestedTraining: React.FC<SuggestedTrainingProps> = ({ skill, onEnroll }) => {
    const [suggestions, setSuggestions] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSuggestions = async () => {
            setLoading(true);
            try {
                const data = await findCoursesBySkill(skill);
                setSuggestions(data);
            } catch (error) {
                console.error("Failed to fetch course suggestions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSuggestions();
    }, [skill]);

    return (
        <div className="mt-4 p-4 bg-purple-50 border-s-4 border-purple-500 rounded-e-lg">
            <h5 className="font-semibold text-purple-800 mb-3 flex items-center">
                <i className="fas fa-brain text-purple-600 me-2"></i>
                اقتراح تطويري بالذكاء الاصطناعي
            </h5>
            {loading ? (
                 <div className="flex items-center text-sm text-purple-700">
                    <i className="fas fa-spinner fa-spin me-2"></i>
                    <span>جاري البحث عن دورات تدريبية مناسبة...</span>
                </div>
            ) : suggestions.length > 0 ? (
                <div className="space-y-2">
                    {suggestions.map(course => (
                        <div key={course.id} className="flex items-center justify-between bg-white p-3 rounded-md border">
                            <div>
                                <p className="font-medium text-sm text-gray-800">{course.title}</p>
                                <p className="text-xs text-gray-500">{course.category} - {course.durationHours} ساعات</p>
                            </div>
                            <button 
                                onClick={() => onEnroll(course.title)}
                                className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                تسجيل الموظف
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-purple-700">لم يتم العثور على دورات تدريبية مقترحة لهذه المهارة.</p>
            )}
        </div>
    );
};

export default SuggestedTraining;