import React, { useState, useEffect, useMemo } from 'react';
import { Employee, EmployeeEnrollment, EnrollmentStatus, ExternalCourseRecord } from '../../../../types';
import { getEmployeeEnrollmentsByEmployeeId, getExternalCoursesByEmployeeId } from '../../../../services/api';
import LoadingSpinner from '../../../../components/LoadingSpinner';

interface LearningTabProps {
    employee: Employee;
}

const StatCard: React.FC<{ label: string; value: string | number; icon: string }> = ({ label, value, icon }) => (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
        <i className={`${icon} text-2xl text-blue-600 mb-2`}></i>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
    </div>
);

const LearningTab: React.FC<LearningTabProps> = ({ employee }) => {
    const [enrollments, setEnrollments] = useState<EmployeeEnrollment[]>([]);
    const [externalCourses, setExternalCourses] = useState<ExternalCourseRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [enrollmentsData, externalCoursesData] = await Promise.all([
                    getEmployeeEnrollmentsByEmployeeId(employee.id),
                    getExternalCoursesByEmployeeId(employee.id)
                ]);
                setEnrollments(enrollmentsData);
                setExternalCourses(externalCoursesData);
            } catch (error) {
                console.error("Failed to fetch learning data for employee", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [employee.id]);

    const { current, completed } = useMemo(() => ({
        current: enrollments.filter(e => e.status !== EnrollmentStatus.COMPLETED),
        completed: enrollments.filter(e => e.status === EnrollmentStatus.COMPLETED),
    }), [enrollments]);
    
    const totalLearningHours = useMemo(() => {
        return enrollments.reduce((total, enr) => total + enr.course.durationHours, 0);
    }, [enrollments]);

    if (loading) {
        return <div className="h-64"><LoadingSpinner /></div>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <StatCard label="الدورات المكتملة" value={completed.length} icon="fas fa-check-circle" />
                <StatCard label="قيد التنفيذ" value={current.length} icon="fas fa-spinner" />
                <StatCard label="إجمالي ساعات التعلم" value={`${totalLearningHours} ساعة`} icon="fas fa-clock" />
            </div>

            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">التسجيلات الحالية (داخلية)</h3>
                     <button className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        <i className="fas fa-plus"></i>
                        <span>تسجيل في دورة جديدة</span>
                    </button>
                </div>
                {current.length > 0 ? (
                    <div>
                        {/* Mobile View */}
                        <div className="md:hidden space-y-3">
                            {current.map(enr => (
                                <div key={enr.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
                                    <p className="font-semibold text-gray-800">{enr.course.title}</p>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-600 me-3 w-10">{enr.progress}%</span>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${enr.progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Desktop View */}
                        <div className="overflow-x-auto hidden md:block border rounded-lg">
                            <table className="w-full">
                            <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">الدورة</th>
                                        <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">التقدم</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y">
                                    {current.map(enr => (
                                        <tr key={enr.id}>
                                            <td className="px-4 py-3">{enr.course.title}</td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center">
                                                    <div className="w-full bg-gray-200 rounded-full h-2 me-3">
                                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${enr.progress}%` }}></div>
                                                    </div>
                                                    <span className="text-sm text-gray-600">{enr.progress}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">لا توجد دورات حالية.</p>}
            </div>

            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">سجل الدورات المكتملة (داخلية)</h3>
                 {completed.length > 0 ? (
                    <div className="overflow-x-auto border rounded-lg">
                       <table className="w-full">
                           <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">الدورة</th>
                                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">تاريخ الإكمال</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y">
                                {completed.map(enr => (
                                    <tr key={enr.id}>
                                        <td className="px-4 py-3">{enr.course.title}</td>
                                        <td className="px-4 py-3">{enr.completionDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">لم يتم إكمال أي دورات بعد.</p>}
            </div>

             <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">سجل الدورات الخارجية</h3>
                 {externalCourses.length > 0 ? (
                    <div className="overflow-x-auto border rounded-lg">
                       <table className="w-full">
                           <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">الدورة</th>
                                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">النتيجة</th>
                                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">تاريخ الإكمال</th>
                                    <th className="px-4 py-2 text-start text-xs font-medium text-gray-500 uppercase">الشهادة</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y">
                                {externalCourses.map(course => (
                                    <tr key={course.id}>
                                        <td className="px-4 py-3 font-medium">
                                            {course.courseName}
                                            <p className="text-xs text-gray-500 font-normal">{course.provider}</p>
                                        </td>
                                        <td className="px-4 py-3">{course.score || '-'}</td>
                                        <td className="px-4 py-3">{course.completionDate}</td>
                                        <td className="px-4 py-3">
                                            <a href={course.certificateUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                <i className="fas fa-file-certificate me-2"></i>عرض
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">لم يسجل الموظف أي دورات خارجية.</p>}
            </div>
        </div>
    );
};

export default LearningTab;