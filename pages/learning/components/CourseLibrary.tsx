
import React, { useState, useMemo } from 'react';
import { Course, CourseCategory } from '../../../types';
import { useSearch } from '../../../hooks/useSearch';

interface CourseLibraryProps {
    courses: Course[];
}

const categoryColors: Record<CourseCategory, string> = {
    [CourseCategory.TECHNICAL]: 'bg-blue-100 text-blue-800',
    [CourseCategory.LEADERSHIP]: 'bg-green-100 text-green-800',
    [CourseCategory.SOFT_SKILLS]: 'bg-purple-100 text-purple-800',
    [CourseCategory.COMPLIANCE]: 'bg-red-100 text-red-800',
};

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">{course.title}</h4>
                 <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[course.category]}`}>{course.category}</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">{course.provider}</p>
            <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600"><i className="fas fa-clock me-1"></i> {course.durationHours} ساعات</span>
                 <span className="text-gray-600"><i className="fas fa-users me-1"></i> {course.enrollmentCount}</span>
            </div>
        </div>
    )
}

const CourseLibrary: React.FC<CourseLibraryProps> = ({ courses }) => {
    const [filterCategory, setFilterCategory] = useState('All');

    const { searchTerm, setSearchTerm, filteredItems: searchedCourses } = useSearch(
        courses,
        ['title']
    );

    const filteredCourses = useMemo(() => {
        if (filterCategory === 'All') {
            return searchedCourses;
        }
        return searchedCourses.filter(course => course.category === filterCategory);
    }, [searchedCourses, filterCategory]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">مكتبة الدورات</h3>
            </div>
            <div className="p-4 border-b border-gray-100 space-y-3">
                 <input
                    type="text"
                    placeholder="بحث عن دورة..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <select 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
                    value={filterCategory}
                    onChange={e => setFilterCategory(e.target.value)}
                >
                    <option value="All">كل الفئات</option>
                    {Object.values(CourseCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
             <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
                 {filteredCourses.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        <i className="fas fa-book-open text-3xl mb-2"></i>
                        <p>لا توجد دورات تطابق بحثك.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseLibrary;
