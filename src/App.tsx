import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StaticLayout, registerComponent } from './components/Layout/StaticLayout';
import { appConfig } from './configs/dashboards';
import { AppTitle } from './components/common/AppTitle';
import { ContentArea } from './components/common/ContentArea';
import { SidebarNavItem } from './components/common/SidebarNavItem';
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

// Register common components for StaticLayout
registerComponent('AppTitle', AppTitle);
registerComponent('SidebarNavItem', SidebarNavItem);
registerComponent('ContentArea', ContentArea);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {appConfig.layout ? (
          <StaticLayout config={appConfig.layout} />
        ) : (
          <div style={{ padding: '2rem', color: '#d32f2f' }}>
            No layout configuration found
          </div>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
