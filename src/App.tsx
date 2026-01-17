import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import { router } from './router/routes';
import { registerBatch } from './services/componentRegistry';
import { Chart } from './components/Chart';
import { Table } from './components/Table';
import { Data } from './components/Data';
import { DashboardGrid } from './components/DashboardGrid';
import { LayoutBuilder } from './components/LayoutBuilder';
import { NavBar } from './components/NavBar';
import { RootLayout } from './components/RootLayout';
import { DashboardsListPage } from './pages/Dashboards/DashboardsListPage';
import { DashboardDetailPage } from './pages/Dashboards/DashboardDetailPage';
import { DatabasePage } from './pages/Database/DatabasePage';
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

// Helper component for DatabasePage title
const DatabaseTitle: React.FC = () => (
  <div style={{
    fontSize: '1.5rem',
    fontWeight: 600,
    marginBottom: '1rem',
  }}>
    MySQL Database Metrics
  </div>
);

// Register all components for use in LayoutBuilder
registerBatch({
  Chart,
  Table,
  Data,
  DashboardGrid,
  LayoutBuilder,
  NavBar,
  RootLayout,
  DashboardsListPage,
  DashboardDetailPage,
  DatabasePage,
  DatabaseTitle,
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
