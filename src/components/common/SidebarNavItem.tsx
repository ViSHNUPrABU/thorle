// src/components/common/SidebarNavItem.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SidebarNavItemProps {
  itemId: string;
  label: string;
  path: string;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ label, path }) => {
  const navigate = useNavigate();
  const isSelected = window.location.pathname === path || (path !== '/' && window.location.pathname.startsWith(path));

  return (
    <div
      onClick={() => navigate(path)}
      style={{
        padding: '0.75rem 1rem',
        cursor: 'pointer',
        background: isSelected ? '#e3f2fd' : 'transparent',
        borderLeft: isSelected ? '3px solid #1976d2' : '3px solid transparent',
        fontWeight: isSelected ? 600 : 400,
        color: isSelected ? '#1976d2' : '#333',
        transition: 'all 0.2s',
      }}
    >
      {label}
    </div>
  );
};
