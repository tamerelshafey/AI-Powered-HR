import React, { useState, useEffect, useRef } from 'react';
// FIX: Switched to named imports for 'react-window' to resolve module resolution errors.
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { EmployeeEnrollment } from '../../../types';
import EnrollmentListItem from './EnrollmentListItem';

interface EnrollmentTableProps {
    enrollments: EmployeeEnrollment[];
}

const EnrollmentTable: React.FC<EnrollmentTableProps> = ({ enrollments }) => {
    const listContainerRef = useRef<HTMLDivElement>(null);
    const [listDimensions, setListDimensions] = useState({ height: 0, width: 0 });

    useEffect(() => {
        if (listContainerRef.current) {
            const resizeObserver = new ResizeObserver(entries => {
                if (entries[0]) {
                    const { height, width } = entries[0].contentRect;
                    setListDimensions({ height, width });
                }
            });
            resizeObserver.observe(listContainerRef.current);
            return () => resizeObserver.disconnect();
        }
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">تقدم الموظفين</h3>
            </div>
            
            <div ref={listContainerRef} className="flex-grow w-full">
                {/* Desktop Header */}
                <div className="hidden md:flex bg-gray-50 border-b">
                    <div className="px-6 py-3 w-1/3 text-start text-xs font-medium text-gray-500 uppercase">الموظف</div>
                    <div className="px-6 py-3 w-1/3 text-start text-xs font-medium text-gray-500 uppercase">الدورة</div>
                    <div className="px-6 py-3 w-1/4 text-start text-xs font-medium text-gray-500 uppercase">التقدم</div>
                    <div className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">الحالة</div>
                </div>
                {listDimensions.height > 0 && enrollments.length > 0 ? (
                    // FIX: Use named import for react-window component.
                    <FixedSizeList
                        height={listDimensions.height - 45} // Adjust for header height on desktop
                        width={listDimensions.width}
                        itemCount={enrollments.length}
                        itemSize={95} // Approximate height for each item
                    >
                        {/* FIX: Use named import for react-window type. */}
                        {({ index, style }: ListChildComponentProps) => {
                            const enrollment = enrollments[index];
                            return (
                                <div style={style}>
                                    <div style={{ padding: '8px' }}>
                                        <EnrollmentListItem enrollment={enrollment} />
                                    </div>
                                </div>
                            );
                        }}
                    </FixedSizeList>
                ) : enrollments.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>لا توجد تسجيلات لعرضها.</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default EnrollmentTable;