import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavBar } from './components/NavBar/NavBar';
import { Sidebar } from './components/NavBar/Sidebar';
import { Dashboard } from './components/Dashboard/Dashboard';
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

// Dashboards list page
const DashboardsListPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Dashboards</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
      }}>
        {appConfig.dashboards.map(dashboard => (
          <a
            key={dashboard.id}
            href={`/dash/${dashboard.id}`}
            style={{
              display: 'block',
              padding: '1.5rem',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              textDecoration: 'none',
              color: '#333',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
              {dashboard.title}
            </h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.875rem' }}>
              {dashboard.layout.length} widgets
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

// Dashboard page wrapper
const DashboardPage = ({ dashboardId }: { dashboardId: string }) => {
  const dashboardConfig = appConfig.dashboards.find(d => d.id === dashboardId);
  
  if (!dashboardConfig) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
        <h2 style={{ color: '#d32f2f', marginBottom: '1rem' }}>Dashboard Not Found</h2>
        <p style={{ color: '#666' }}>The dashboard "{dashboardId}" does not exist.</p>
      </div>
    );
  }
  
  return <Dashboard config={dashboardConfig} />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <NavBar items={appConfig.nav} />
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <Sidebar dashboards={appConfig.dashboards} />
            <main style={{ flex: 1, overflow: 'auto' }}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboards" replace />} />
                <Route path="/dashboards" element={<DashboardsListPage />} />
                <Route path="/dash/:dashboardId" element={<DashboardPageRoute />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// Route wrapper to extract params
function DashboardPageRoute() {
  const dashboardId = window.location.pathname.split('/dash/')[1];
  return <DashboardPage dashboardId={dashboardId} />;
}

export default App;
