
import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { Course, EmployeeEnrollment, EnrollmentStatus } from '../../../types';
import { useI18n } from '../../../context/I18nContext';

interface LearningStatsProps {
    courses: Course[];
    enrollments: EmployeeEnrollment[];
}

const LearningStats: React.FC<LearningStatsProps> = ({ courses, enrollments }) => {
    const { t } = useI18n();
    const totalCourses = courses.length;
    const enrolledEmployees = new Set(enrollments.map(e => e.employee.id)).size;
    const totalProgress = enrollments.reduce((sum, e) => sum + e.progress, 0);
    const avgCompletion = enrollments.length > 0 ? (totalProgress / enrollments.length).toFixed(0) : '0';
    const totalTrainingHours = courses.reduce((sum, c) => sum + c.durationHours * c.enrollmentCount, 0);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="fas fa-book" labelKey="learningStats.totalCourses" value={String(totalCourses)} iconBgColor="bg-blue-100" iconColor="text-blue-600" />
            <StatsCard icon="fas fa-users" labelKey="learningStats.enrolledEmployees" value={String(enrolledEmployees)} iconBgColor="bg-green-100" iconColor="text-green-600" />
            <StatsCard icon="fas fa-check-double" labelKey="learningStats.avgCompletion" value={`${avgCompletion}%`} iconBgColor="bg-purple-100" iconColor="text-purple-600" />
            <StatsCard icon="fas fa-clock" labelKey="learningStats.totalHours" value={`${totalTrainingHours} ${t('learningStats.hoursUnit')}`} iconBgColor="bg-orange-100" iconColor="text-orange-600" />
        </div>
    );
};

export default LearningStats;
