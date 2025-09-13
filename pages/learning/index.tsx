
import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from '../../components/PageHeader';
import LearningStats from './components/LearningStats';
import CourseLibrary from './components/CourseLibrary';
import EnrollmentTable from './components/EnrollmentTable';
import AddCourseModal from './components/AddCourseModal';
import EnrollEmployeeModal from './components/EnrollEmployeeModal';
import { Course, EmployeeEnrollment, Employee } from '../../types';
import { getCourses, getEmployeeEnrollments, getAllEmployees } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';
import { useI18n } from '../../context/I18nContext';

const LearningPage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [enrollments, setEnrollments] = useState<EmployeeEnrollment[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAddCourseModalOpen, setAddCourseModalOpen] = useState(false);
    const [isEnrollModalOpen, setEnrollModalOpen] = useState(false);
    const { t } = useI18n();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [coursesData, enrollmentsData, employeesData] = await Promise.all([
                getCourses(),
                getEmployeeEnrollments(),
                getAllEmployees()
            ]);
            setCourses(coursesData);
            setEnrollments(enrollmentsData);
            setEmployees(employeesData);
        } catch (error) {
            console.error("Failed to fetch learning data", error);
            setError("فشل في تحميل بيانات التعلم والتطوير.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
            <PageHeader 
                title={t('page.learning.header.title')}
                subtitle={t('page.learning.header.subtitle')}
                actions={<>
                    <button onClick={() => setEnrollModalOpen(true)} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        <i className="fas fa-user-plus"></i>
                        <span>{t('page.learning.header.enrollEmployee')}</span>
                    </button>
                    <button onClick={() => setAddCourseModalOpen(true)} className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i className="fas fa-plus"></i>
                        <span>{t('page.learning.header.addCourse')}</span>
                    </button>
                </>}
            />
            <LearningStats courses={courses} enrollments={enrollments} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 h-[75vh]">
                <div className="lg:col-span-2 h-full">
                    <EnrollmentTable enrollments={enrollments} />
                </div>
                <div className="h-full">
                     <CourseLibrary courses={courses} />
                </div>
            </div>
            

            <AddCourseModal 
                isOpen={isAddCourseModalOpen}
                onClose={() => setAddCourseModalOpen(false)}
            />
            
            <EnrollEmployeeModal 
                isOpen={isEnrollModalOpen}
                onClose={() => setEnrollModalOpen(false)}
                courses={courses}
                employees={employees}
            />
        </div>
    );
};

export default LearningPage;
