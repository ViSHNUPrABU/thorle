// src/components/Widget/TableWidget.tsx
import React, { useMemo } from 'react';
import type { TableWidgetConfig } from '../../types/config';

interface TableWidgetProps {
  config: TableWidgetConfig;
  data: any;
}

export const TableWidget: React.FC<TableWidgetProps> = ({ config, data }) => {
  const tableData = useMemo(() => {
    if (Array.isArray(data)) {
      return data;
    }
    if (data?.rows) {
      return data.rows;
    }
    if (data?.data) {
      return data.data;
    }
    return [];
  }, [data]);
  
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  
  const sortedData = useMemo(() => {
    if (!sortColumn) return tableData;
    
    return [...tableData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      
      if (aVal === bVal) return 0;
      
      const comparison = aVal > bVal ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [tableData, sortColumn, sortDirection]);
  
  const handleSort = (columnId: string, sortable?: boolean) => {
    if (!sortable) return;
    
    if (sortColumn === columnId) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };
  
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      overflow: 'auto',
      background: 'white',
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.875rem',
      }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            {config.columns.map(col => (
              <th 
                key={col.id}
                onClick={() => handleSort(col.id, col.sortable)}
                style={{
                  padding: '0.75rem',
                  textAlign: 'left',
                  fontWeight: 600,
                  borderBottom: '2px solid #e0e0e0',
                  cursor: col.sortable ? 'pointer' : 'default',
                  userSelect: 'none',
                }}
              >
                {col.label}
                {col.sortable && sortColumn === col.id && (
                  <span style={{ marginLeft: '0.5rem' }}>
                    {sortDirection === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row: any, index: number) => (
            <tr 
              key={index}
              style={{
                borderBottom: '1px solid #f0f0f0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fafafa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
            >
              {config.columns.map(col => (
                <td 
                  key={col.id}
                  style={{
                    padding: '0.75rem',
                  }}
                >
                  {row[col.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {sortedData.length === 0 && (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          color: '#999' 
        }}>
          No data available
        </div>
      )}
    </div>
  );
};
