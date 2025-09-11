
import React from 'react';
import { AiTableData } from '../../../types';

interface TableResultProps {
    data: AiTableData;
}

const TableResult: React.FC<TableResultProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-center text-gray-500">لا توجد بيانات لعرضها.</p>;
    }

    const headers = Object.keys(data[0]);

    return (
        <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        {headers.map(header => (
                            <th key={header} className="px-4 py-2 text-start font-semibold text-gray-700">{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                            {headers.map(header => (
                                <td key={`${rowIndex}-${header}`} className="px-4 py-3 text-gray-800">
                                    {String(row[header])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableResult;
