// src/components/common/AppTitle.tsx
import React from 'react';

export const AppTitle = () => (
  <div style={{ 
    fontSize: '1.25rem', 
    fontWeight: 600,
    marginRight: '2rem',
    cursor: 'pointer',
  }}
  onClick={() => window.location.href = '/'}
  >
    Monithor
  </div>
);
