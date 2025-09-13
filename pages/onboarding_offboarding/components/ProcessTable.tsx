import React, { useState, useEffect, useRef } from 'react';
// FIX: Switched to named imports for 'react-window' to resolve module resolution errors.
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { OnboardingProcess } from '../../../types';
import ProcessListItem from './ProcessListItem';

interface ProcessTableProps {
  processes: OnboardingProcess[];
  onViewChecklist: (process: OnboardingProcess) => void;
}

const ProcessTable: React.FC<ProcessTableProps> = ({ processes, onViewChecklist }) => {
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

    if (processes.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <i className="fas fa-folder-open text-4xl mb-3"></i>
                <p>لا توجد عمليات لعرضها.</p>
            </div>
        );
    }

    return (
        <div ref={listContainerRef} className="h-[70vh] w-full">
            {/* Desktop Header */}
            <div className="hidden md:flex bg-gray-50 border-b">
                <div className="px-6 py-3 w-1/3 text-start text-xs font-medium text-gray-500 uppercase">الموظف</div>
                <div className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">التاريخ</div>
                <div className="px-6 py-3 w-1/4 text-start text-xs font-medium text-gray-500 uppercase">التقدم</div>
                <div className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">الحالة</div>
                <div className="px-6 py-3 w-1/6 text-start text-xs font-medium text-gray-500 uppercase">الإجراءات</div>
            </div>
             {listDimensions.height > 0 && (
                // FIX: Use named import for react-window component.
                <FixedSizeList
                    height={listDimensions.height - 45} // Adjust for header height
                    width={listDimensions.width}
                    itemCount={processes.length}
                    itemSize={95}
                >
                    {/* FIX: Use named import for react-window type. */}
                    {({ index, style }: ListChildComponentProps) => {
                        const process = processes[index];
                        return (
                            <div style={style}>
                                <div style={{ padding: '8px' }}>
                                    <ProcessListItem process={process} onViewChecklist={onViewChecklist} />
                                </div>
                            </div>
                        );
                    }}
                </FixedSizeList>
            )}
        </div>
    );
};

export default ProcessTable;