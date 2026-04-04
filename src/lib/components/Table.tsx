// src/components/Table.tsx
import React, { useMemo } from 'react';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';

interface TableColumn {
  id: string;
  label: string;
  sortable?: boolean;
  render?: string;
}

interface TableProps {
  data: any[];
  columns: TableColumn[];
  enablePagination?: boolean;
  enableSorting?: boolean;
  pageSize?: number;
}

export const Table: React.FC<TableProps> = ({
  data,
  columns,
  enablePagination = true,
  enableSorting = true,
  pageSize = 10,
}) => {
  // Transform columns to Mantine format
  const mantineColumns = useMemo<MRT_ColumnDef<any>[]>(() => {
    return columns.map(col => ({
      accessorKey: col.id,
      header: col.label,
      enableSorting: col.sortable !== false && enableSorting,
      size: 150,
    }));
  }, [columns, enableSorting]);

  // Ensure data is array
  const tableData = useMemo(() => {
    if (Array.isArray(data)) {
      return data;
    }
    if (data && typeof data === 'object' && 'rows' in data) {
      return (data as any).rows;
    }
    if (data && typeof data === 'object' && 'data' in data) {
      return (data as any).data;
    }
    return [];
  }, [data]);

  return (
    <MantineReactTable
      columns={mantineColumns}
      data={tableData}
      enablePagination={enablePagination}
      enableSorting={enableSorting}
      enableColumnActions={false}
      enableColumnFilters={false}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
      enableHiding={false}
      initialState={{
        pagination: { pageSize, pageIndex: 0 },
        density: 'xs',
      }}
      mantineTableProps={{
        striped: true,
        highlightOnHover: true,
        withColumnBorders: false,
      }}
      mantineTableBodyRowProps={{
        sx: {
          cursor: 'default',
        },
      }}
    />
  );
};

import { z } from 'zod';
import { sduiRegistry } from '../sdui/registry/Registry';

const TableColumnSchema = z.object({
  id: z.string(),
  label: z.string(),
  sortable: z.boolean().default(true),
  render: z.string().optional(),
});

const TablePropsSchema = z.object({
  columns: z.array(TableColumnSchema),
  enablePagination: z.boolean().default(true),
  enableSorting: z.boolean().default(true),
  pageSize: z.number().default(10),
  data: z.any().optional(),
});

sduiRegistry.register('Table', {
  component: Table,
  schema: TablePropsSchema,
  metadata: {
    version: '1.0.0',
    category: 'data-display',
    description: 'Data table with sorting, pagination, and column configuration via mantine-react-table',
    tags: ['table', 'data', 'grid', 'pagination'],
  },
  defaultProps: { enablePagination: true, enableSorting: true, pageSize: 10 },
});
