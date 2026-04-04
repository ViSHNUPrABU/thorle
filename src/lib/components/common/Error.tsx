// src/components/common/Error.tsx
import React from 'react';

interface ErrorProps {
  error?: Error | string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorDisplay: React.FC<ErrorProps> = ({ 
  error, 
  message = 'An error occurred',
  onRetry 
}) => {
  const errorMessage = error instanceof Error ? error.message : error || message;
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      minHeight: '200px',
      color: '#d32f2f',
    }}>
      <svg 
        width="64" 
        height="64" 
        viewBox="0 0 64 64" 
        fill="none"
        style={{ marginBottom: '1rem' }}
      >
        <circle cx="32" cy="32" r="28" stroke="#d32f2f" strokeWidth="2" fill="none"/>
        <line x1="32" y1="16" x2="32" y2="36" stroke="#d32f2f" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="32" cy="44" r="2" fill="#d32f2f"/>
      </svg>
      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', fontWeight: 600 }}>Error</h4>
      <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', textAlign: 'center', maxWidth: '400px' }}>
        {errorMessage}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          style={{
            padding: '0.5rem 1rem',
            background: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
};
