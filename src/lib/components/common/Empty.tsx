// src/components/common/Empty.tsx
import React from 'react';

interface EmptyProps {
  message?: string;
  description?: string;
}

export const Empty: React.FC<EmptyProps> = ({ 
  message = 'No Data', 
  description = 'No data available to display' 
}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: '200px',
      color: '#999',
    }}>
      <svg 
        width="64" 
        height="64" 
        viewBox="0 0 64 64" 
        fill="none" 
        style={{ marginBottom: '1rem' }}
      >
        <rect x="8" y="8" width="48" height="48" rx="4" stroke="#ccc" strokeWidth="2" fill="none"/>
        <line x1="16" y1="24" x2="48" y2="24" stroke="#ccc" strokeWidth="2"/>
        <line x1="16" y1="32" x2="40" y2="32" stroke="#ccc" strokeWidth="2"/>
        <line x1="16" y1="40" x2="44" y2="40" stroke="#ccc" strokeWidth="2"/>
      </svg>
      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>{message}</h4>
      <p style={{ margin: 0, fontSize: '0.875rem' }}>{description}</p>
    </div>
  );
};
