import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StaticLayout, registerComponent } from './components/Layout/StaticLayout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { DashboardListPage } from './components/Dashboard/DashboardListPage';
import { appConfig } from './configs/dashboards';
import { useState } from 'react';
import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: 5000,
    },
  },
});

// App Title Component
const AppTitle = () => (
  <div style={{ 
    fontSize: '1.25rem', 
    fontWeight: 600,
    marginRight: '2rem',
  }}>
    Monithor
  </div>
);

// Sidebar Nav Item Component
interface SidebarNavItemProps {
  itemId: string;
  label: string;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ label }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const isSelected = window.location.pathname.startsWith('/dashboards');

  return (
    <div
      onClick={() => navigate('/dashboards')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '0.75rem 1rem',
        cursor: 'pointer',
        background: isSelected ? '#e3f2fd' : isHovered ? '#f0f0f0' : 'transparent',
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

// Content Area Component - renders based on route
const ContentArea = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboards" replace />} />
      <Route path="/dashboards" element={<DashboardListPage />} />
      <Route path="/dash/:dashboardId" element={<Dashboard />} />
    </Routes>
  );
};

// Register components for StaticLayout
registerComponent('AppTitle', AppTitle);
registerComponent('SidebarNavItem', SidebarNavItem);
registerComponent('ContentArea', ContentArea);
registerComponent('DashboardListPage', DashboardListPage);
registerComponent('Dashboard', Dashboard);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {appConfig.navLayout ? (
          <StaticLayout config={appConfig.navLayout} />
        ) : (
          <div style={{ padding: '2rem', color: '#d32f2f' }}>
            No navLayout configuration found
          </div>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
