// src/components/UI/DataTable.tsx
import React from 'react';

interface Column<T = any> {
  header: string;
  accessor: string | ((row: T) => React.ReactNode);
  cell?: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  sortable?: boolean;
}

interface DataTableProps<T = any> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  className?: string;
  tableClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  headerClassName?: string;
  emptyMessage?: React.ReactNode;
  loading?: boolean;
  loadingMessage?: React.ReactNode;
  sortConfig?: {
    key: string;
    direction: 'ascending' | 'descending';
  };
  onSort?: (key: string) => void;
}

const DataTable = <T extends unknown>({
  columns,
  data,
  onRowClick,
  className = '',
  tableClassName = '',
  rowClassName = '',
  headerClassName = '',
  emptyMessage = 'No data available',
  loading = false,
  loadingMessage = 'Loading...',
  sortConfig,
  onSort
}: DataTableProps<T>) => {
  const getRowClassName = (row: T, index: number) => {
    if (typeof rowClassName === 'function') {
      return rowClassName(row, index);
    }
    return rowClassName;
  };

  const getCellValue = (row: T, column: Column<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }
    return (row as any)[column.accessor];
  };

  const handleHeaderClick = (column: Column<T>) => {
    if (column.sortable && onSort && typeof column.accessor === 'string') {
      onSort(column.accessor);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y divide-gray-200 ${tableClassName}`}>
          <thead className={`bg-gray-50 ${headerClassName}`}>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={`${typeof column.accessor === 'string' ? column.accessor : index}-header`}
                  className={`
                    px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                    ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}
                    ${column.headerClassName || ''}
                    ${column.className || ''}
                  `}
                  onClick={() => handleHeaderClick(column)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {column.sortable && (
                      <span className="ml-1">
                        {sortConfig?.key === column.accessor && (
                          <span>
                            {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                  {loadingMessage}
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onClick={() => onRowClick?.(row)}
                  className={`
                    ${onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''}
                    ${getRowClassName(row, rowIndex)}
                  `}
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={`${rowIndex}-${typeof column.accessor === 'string' ? column.accessor : colIndex}`}
                      className={`
                        px-6 py-4 whitespace-nowrap text-sm
                        ${typeof getCellValue(row, column) === 'number' ? 'text-gray-900' : 'text-gray-500'}
                        ${column.className || ''}
                      `}
                    >
                      {column.cell ? column.cell(row) : getCellValue(row, column)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                  {emptyMessage}
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