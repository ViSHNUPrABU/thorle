import { BrowserRouter, Navigate, useNavigate, useRoutes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StaticLayout, registerComponent } from './components/Layout/StaticLayout';
import { Dashboard } from './components/Dashboard/Dashboard';
import { DashboardListPage } from './components/Dashboard/DashboardListPage';
import { appConfig } from './configs/dashboards';
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
  path: string;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ label, path }) => {
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

// A simple component registry for route elements
const routeComponentRegistry: Record<string, React.ComponentType<any>> = {
  DashboardListPage,
  Dashboard,
};

// Content Area Component - renders based on route
const ContentArea = ({ routes, defaultPath = '/' }: { routes?: { path: string; component: string }[], defaultPath?: string }) => {
  const generatedRoutes = routes?.map(route => {
    const Component = routeComponentRegistry[route.component];
    return {
      path: route.path,
      element: Component ? <Component /> : <Navigate to={defaultPath} replace />,
    };
  }) || [];

  // Add a default route
  generatedRoutes.push({
    path: '/',
    element: <Navigate to={defaultPath} replace />,
  });
  
  const element = useRoutes(generatedRoutes);

  return element;
};

// Register components for StaticLayout
registerComponent('AppTitle', AppTitle);
registerComponent('SidebarNavItem', SidebarNavItem);
registerComponent('ContentArea', ContentArea);

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
