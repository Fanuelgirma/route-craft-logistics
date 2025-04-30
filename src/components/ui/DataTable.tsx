
import { ReactNode, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SearchInput from './SearchInput';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  cell?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  keyField?: keyof T;
  selectable?: boolean;
}

export default function DataTable<T>({
  columns,
  data,
  searchable = true,
  searchPlaceholder = 'Search...',
  emptyMessage = 'No data available',
  onRowClick,
  keyField = 'id' as keyof T,
  selectable = false
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());

  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleToggleSelectAll = () => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredData.map(row => String(row[keyField]))));
    }
  };

  const handleToggleRow = (id: string | number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
  };

  // Filter data based on search term
  const filteredData = searchTerm 
    ? data.filter(row => {
        return Object.values(row).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : data;

  // Sort data if sort field is set
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue === bValue) return 0;
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {searchable && (
        <div className="p-4 border-b border-gray-200">
          <SearchInput 
            placeholder={searchPlaceholder} 
            onSearch={setSearchTerm} 
            className="max-w-md"
          />
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              {selectable && (
                <th className="w-10">
                  <input
                    type="checkbox"
                    className="rounded text-logistic-accent focus:ring-logistic-accent"
                    checked={selectedRows.size === filteredData.length && filteredData.length > 0}
                    onChange={handleToggleSelectAll}
                  />
                </th>
              )}
              {columns.map((column, index) => {
                const isString = typeof column.accessor === 'string';
                const accessor = isString ? column.accessor : null;
                
                return (
                  <th 
                    key={index}
                    className="cursor-pointer"
                    onClick={() => isString ? handleSort(accessor as keyof T) : null}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.header}</span>
                      {isString && sortField === accessor && (
                        <span>
                          {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, rowIndex) => (
                <tr 
                  key={String(row[keyField]) || rowIndex}
                  className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {selectable && (
                    <td onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="rounded text-logistic-accent focus:ring-logistic-accent"
                        checked={selectedRows.has(String(row[keyField]))}
                        onChange={() => handleToggleRow(String(row[keyField]))}
                      />
                    </td>
                  )}
                  {columns.map((column, colIndex) => {
                    let displayValue: ReactNode;
                    
                    if (typeof column.accessor === 'function') {
                      displayValue = column.accessor(row);
                    } else if (column.cell) {
                      displayValue = column.cell(row);
                    } else {
                      // Type assertion to ReactNode to handle the TypeScript error
                      displayValue = String(row[column.accessor as keyof T]);
                    }
                    
                    return <td key={colIndex}>{displayValue}</td>;
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-6">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
