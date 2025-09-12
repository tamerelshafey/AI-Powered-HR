import React, { useState, useEffect } from 'react';
import { learningCourses, skills, achievements } from '../data';
import { LearningCourse, Skill, Achievement, ExternalCourseRecord } from '../../../types';
import { useUser } from '../../../context/UserContext';
import { getExternalCoursesByEmployeeId, getEmployeeIdForUser } from '../../../services/api';
import LoadingSpinner from '../../../components/LoadingSpinner';

interface LearningSectionProps {
    onOpenExternalCourseModal: () => void;
}

const CourseCard: React.FC<{ course: LearningCourse }> = ({ course }) => {
    const categoryColorClass = {
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        purple: 'bg-purple-100 text-purple-800',
    };
    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2 py-1 rounded-full ${categoryColorClass[course.categoryColor]}`}>{course.category}</span>
                <span className="text-xs text-gray-500">{course.duration}</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">{course.title}</h4>
            <div className="flex items-center justify-between">
                <span className="text-xs text-yellow-500"><i className="fas fa-star"></i> {course.rating}</span>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">التسجيل</button>
            </div>
        </div>
    );
};

const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => (
    <div>
        <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{skill.name}</span>
            <span className="text-gray-900">{skill.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="skill-bar h-2 rounded-full" style={{ width: `${skill.progress}%` }}></div>
        </div>
    </div>
);

const AchievementBadge: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
     const colorClass = {
        yellow: 'bg-yellow-100 text-yellow-600',
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
    };
    return (
        <div className="flex items-center space-x-3 space-x-reverse">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass[achievement.color]}`}>
                <i className={`${achievement.icon}`}></i>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                <p className="text-xs text-gray-500">{achievement.description}</p>
            </div>
        </div>
    );
}

const LearningSection: React.FC<LearningSectionProps> = ({ onOpenExternalCourseModal }) => {
    const { currentUser } = useUser();
    const [externalCourses, setExternalCourses] = useState<ExternalCourseRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const employeeId = getEmployeeIdForUser(currentUser);

    useEffect(() => {
        const fetchExternalCourses = async () => {
            setLoading(true);
            try {
                const data = await getExternalCoursesByEmployeeId(employeeId);
                setExternalCourses(data);
            } catch (error) {
                console.error("Failed to fetch external courses", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExternalCourses();
    }, [employeeId]);

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">التعلم والتطوير</h2>
                <p className="text-gray-600">عزز مهاراتك من خلال برامجنا التدريبية</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                    <h3 className="font-semibold text-gray-900 mb-4">تقدم التعلم</h3>
                    <div className="relative w-20 h-20 mx-auto mb-4">
                        <svg className="w-20 h-20 transform -rotate-90"><circle cx="40" cy="40" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none"></circle><circle cx="40" cy="40" r="36" stroke="#3b82f6" strokeWidth="8" fill="none" strokeDasharray="226" strokeDashoffset="68" className="progress-ring"></circle></svg>
                        <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl font-bold text-gray-900">70%</span></div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-6"><h3 className="font-semibold text-gray-900 mb-4">تطوير المهارات</h3><div className="space-y-3">{skills.map(s => <SkillBar key={s.name} skill={s} />)}</div></div>
                <div className="bg-white rounded-xl shadow-sm border p-6"><h3 className="font-semibold text-gray-900 mb-4">الإنجازات</h3><div className="space-y-3">{achievements.map(a => <AchievementBadge key={a.title} achievement={a} />)}</div></div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border mb-8">
                <div className="p-6 border-b"><h3 className="text-lg font-semibold text-gray-900">الدورات الداخلية المتاحة</h3></div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {learningCourses.map(course => <CourseCard key={course.title} course={course} />)}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">سجل الدورات الخارجية</h3>
                    <button onClick={onOpenExternalCourseModal} className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                        <i className="fas fa-plus me-2"></i>إضافة دورة خارجية
                    </button>
                </div>
                {loading ? (
                    <div className="h-40 flex items-center justify-center"><LoadingSpinner/></div>
                ) : externalCourses.length === 0 ? (
                    <p className="text-center text-gray-500 py-6">لم تقم بإضافة أي دورات خارجية بعد.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">اسم الدورة</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">مركز التدريب</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">النتيجة</th>
                                    <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">الشهادة</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y">
                                {externalCourses.map(course => (
                                    <tr key={course.id}>
                                        <td className="px-6 py-4 font-medium">{course.courseName}</td>
                                        <td className="px-6 py-4 text-gray-600">{course.provider}</td>
                                        <td className="px-6 py-4">{course.score || '-'}</td>
                                        <td className="px-6 py-4">
                                            <a href={course.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                <i className="fas fa-file-certificate me-2"></i>عرض
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LearningSection;