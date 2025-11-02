// src/components/NavBar/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { NavItem } from '../../types/config';

interface NavBarProps {
  items: NavItem[];
}

export const NavBar: React.FC<NavBarProps> = ({ items }) => {
  return (
    <nav style={{
      height: '60px',
      background: '#1e1e1e',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <h1 style={{ 
        margin: 0, 
        fontSize: '1.25rem', 
        fontWeight: 600,
        marginRight: '2rem',
      }}>
        Monithor
      </h1>
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem',
        alignItems: 'center',
      }}>
        {items.map(item => (
          <Link
            key={item.id}
            to={item.route}
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.9rem',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
