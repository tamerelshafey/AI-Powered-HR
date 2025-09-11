import React, { useState, useEffect, useCallback } from 'react';
import PageHeader from './components/PageHeader';
import LearningStats from './components/LearningStats';
import CourseLibrary from './components/CourseLibrary';
import EnrollmentTable from './components/EnrollmentTable';
import AddCourseModal from './components/AddCourseModal';
import EnrollEmployeeModal from './components/EnrollEmployeeModal';
import { Course, EmployeeEnrollment, Employee } from '../../types';
import { getCourses, getEmployeeEnrollments, getAllEmployees } from '../../services/api';
import { ErrorDisplay } from '../../components/ModulePlaceholder';

const LearningPage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [enrollments, setEnrollments] = useState<EmployeeEnrollment[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAddCourseModalOpen, setAddCourseModalOpen] = useState(false);
    const [isEnrollModalOpen, setEnrollModalOpen] = useState(false);

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
                onAddCourse={() => setAddCourseModalOpen(true)}
                onEnrollEmployee={() => setEnrollModalOpen(true)}
            />
            <LearningStats courses={courses} enrollments={enrollments} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                    <EnrollmentTable enrollments={enrollments} />
                </div>
                <div>
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