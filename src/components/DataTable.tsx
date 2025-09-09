import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, MoreHorizontal, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import InputField from './InputField';

export interface Column<T = any> {
  /** Unique key for the column */
  key: string;
  /** Display header text */
  header: string;
  /** Custom render function for cell content */
  render?: (value: any, row: T) => React.ReactNode;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Column width */
  width?: string | number;
  /** Column alignment */
  align?: 'left' | 'center' | 'right';
  /** Whether column is searchable in global search */
  searchable?: boolean;
}

export interface DataTableProps<T = any> {
  /** Array of data to display */
  data: T[];
  /** Column configuration */
  columns: Column<T>[];
  /** Whether to show pagination */
  pagination?: boolean;
  /** Items per page when pagination is enabled */
  pageSize?: number;
  /** Whether to show search */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Whether to show row selection */
  selectable?: boolean;
  /** Callback when row selection changes */
  onSelectionChange?: (selectedRows: T[]) => void;
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Additional className for the table container */
  className?: string;
  /** Table variant */
  variant?: 'default' | 'striped' | 'bordered';
  /** Table size */
  size?: 'compact' | 'default' | 'comfortable';
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  pagination = true,
  pageSize = 10,
  searchable = true,
  searchPlaceholder = 'Search...',
  selectable = false,
  onSelectionChange,
  loading = false,
  emptyMessage = 'No data available',
  className,
  variant = 'default',
  size = 'default',
}: DataTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter((row) =>
      columns.some((column) => {
        if (column.searchable === false) return false;
        
        const value = row[column.key];
        if (value == null) return false;
        
        return String(value)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    );
  }, [data, columns, searchTerm]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortConfig.direction === 'desc' ? -comparison : comparison;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (columnKey: string) => {
    setSortConfig((current) => {
      if (current?.key !== columnKey) {
        return { key: columnKey, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key: columnKey, direction: 'desc' };
      }
      return null;
    });
  };

  const handleRowSelect = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
    
    if (onSelectionChange) {
      const selectedData = Array.from(newSelected).map(i => paginatedData[i]);
      onSelectionChange(selectedData);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIndices = new Set(paginatedData.map((_, index) => index));
      setSelectedRows(allIndices);
      onSelectionChange?.(paginatedData);
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    }
  };

  const getSortIcon = (columnKey: string) => {
    if (sortConfig?.key !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="h-4 w-4" />
      : <ChevronDown className="h-4 w-4" />;
  };

  const sizeClasses = {
    compact: 'text-xs',
    default: 'text-sm',
    comfortable: 'text-base',
  };

  const cellPadding = {
    compact: 'px-2 py-1',
    default: 'px-3 py-2',
    comfortable: 'px-4 py-3',
  };

  const variantClasses = {
    default: '',
    striped: '[&>tbody>tr:nth-child(odd)]:bg-muted/50',
    bordered: 'border border-border',
  };

  if (loading) {
    return (
      <div className={cn('space-y-4', className)}>
        {searchable && (
          <div className="w-full max-w-sm">
            <InputField
              placeholder={searchPlaceholder}
              leftIcon={<Search className="h-4 w-4" />}
              disabled
            />
          </div>
        )}
        <div className="rounded-md border">
          <div className="p-8 text-center">
            <div className="animate-spin mx-auto h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
            <p className="mt-2 text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {searchable && (
        <div className="flex items-center space-x-2">
          <div className="w-full max-w-sm">
            <InputField
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="h-4 w-4" />}
            />
          </div>
          {searchTerm && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchTerm('')}
            >
              Clear
            </Button>
          )}
        </div>
      )}

      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className={cn('w-full caption-bottom', sizeClasses[size], variantClasses[variant])}>
            <thead className="bg-table-header">
              <tr className="border-b border-border">
                {selectable && (
                  <th className={cn('text-left font-medium', cellPadding[size])}>
                    <input
                      type="checkbox"
                      checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-border"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      'font-medium text-muted-foreground',
                      cellPadding[size],
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right',
                      column.sortable && 'cursor-pointer hover:text-foreground select-none'
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.header}</span>
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.length === 0 ? (
                <tr>
                  <td 
                    colSpan={columns.length + (selectable ? 1 : 0)} 
                    className={cn('text-center text-muted-foreground', cellPadding[size], 'py-8')}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-border hover:bg-table-hover transition-colors"
                  >
                    {selectable && (
                      <td className={cellPadding[size]}>
                        <input
                          type="checkbox"
                          checked={selectedRows.has(index)}
                          onChange={(e) => handleRowSelect(index, e.target.checked)}
                          className="rounded border-border"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          cellPadding[size],
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right'
                        )}
                        style={{ width: column.width }}
                      >
                        {column.render
                          ? column.render(row[column.key], row)
                          : row[column.key]
                        }
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = currentPage <= 3 
                  ? i + 1 
                  : currentPage >= totalPages - 2 
                  ? totalPages - 4 + i 
                  : currentPage - 2 + i;
                
                if (page < 1 || page > totalPages) return null;
                
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;