// src/components/UI/DataTable.tsx
import React from 'react';

interface Column {
  header: string;
  accessor: string;
  cell?: (row: any) => React.ReactNode;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
  className?: string;
  rowClassName?: string;
  headerClassName?: string;
}

const DataTable: React.FC<DataTableProps> = ({ 
  columns, 
  data, 
  onRowClick,
  className = '',
  rowClassName = '',
  headerClassName = ''
}) => {
  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={`bg-gray-50 ${headerClassName}`}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={`${column.accessor}-${index}`}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  onClick={() => onRowClick?.(row)}
                  className={`
                    ${onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''}
                    ${rowClassName}
                  `}
                >
                  {columns.map((column, colIndex) => (
                    <td 
                      key={`${rowIndex}-${column.accessor}-${colIndex}`}
                      className={`
                        px-6 py-4 whitespace-nowrap text-sm 
                        ${typeof row[column.accessor] === 'number' ? 'text-gray-900' : 'text-gray-500'}
                        ${column.className || ''}
                      `}
                    >
                      {column.cell ? column.cell(row) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;