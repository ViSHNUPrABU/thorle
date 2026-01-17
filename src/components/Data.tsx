// src/components/Data.tsx
import React from 'react';

interface DataField {
  key: string;
  label?: string;
  format?: string;
}

interface DataProps {
  data: any;
  layout: 'stat' | 'list' | 'kpi';
  fields: DataField[];
}

export const Data: React.FC<DataProps> = ({ data, layout, fields }) => {
  if (layout === 'stat') {
    return <StatLayout data={data} fields={fields} />;
  }

  if (layout === 'kpi') {
    return <KPILayout data={data} fields={fields} />;
  }

  return <ListLayout data={data} fields={fields} />;
};

interface LayoutProps {
  data: any;
  fields: DataField[];
}

const StatLayout: React.FC<LayoutProps> = ({ data, fields }) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      padding: '1rem',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-around',
    }}>
      {fields.map(field => {
        const value = data?.[field.key];
        return (
          <div
            key={field.key}
            style={{
              textAlign: 'center',
              minWidth: '120px',
            }}
          >
            <div style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: '#1976d2',
              marginBottom: '0.25rem',
            }}>
              {formatValue(value, field.format)}
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#666',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {field.label || field.key}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const KPILayout: React.FC<LayoutProps> = ({ data, fields }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      padding: '1rem',
    }}>
      {fields.map(field => {
        const value = data?.[field.key];
        return (
          <div
            key={field.key}
            style={{
              background: '#f5f5f5',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e0e0e0',
            }}
          >
            <div style={{
              fontSize: '0.75rem',
              color: '#666',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {field.label || field.key}
            </div>
            <div style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              color: '#333',
            }}>
              {formatValue(value, field.format)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ListLayout: React.FC<LayoutProps> = ({ data, fields }) => {
  return (
    <div style={{
      padding: '1rem',
    }}>
      <dl style={{
        margin: 0,
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '0.75rem 1.5rem',
      }}>
        {fields.map(field => {
          const value = data?.[field.key];
          return (
            <React.Fragment key={field.key}>
              <dt style={{
                fontWeight: 600,
                color: '#666',
                fontSize: '0.875rem',
              }}>
                {field.label || field.key}:
              </dt>
              <dd style={{
                margin: 0,
                color: '#333',
                fontSize: '0.875rem',
              }}>
                {formatValue(value, field.format)}
              </dd>
            </React.Fragment>
          );
        })}
      </dl>
    </div>
  );
};

function formatValue(value: any, format?: string): string {
  if (value === null || value === undefined) {
    return 'N/A';
  }

  if (format === 'percent') {
    return `${Number(value).toFixed(2)}%`;
  }

  if (format === 'bytes') {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = Number(value);
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }

  if (format === 'number') {
    return Number(value).toLocaleString();
  }

  if (format && format.includes('{value}')) {
    return format.replace('{value}', String(value));
  }

  return String(value);
}
