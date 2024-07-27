import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { Dashboard } from './pages/auth/Dashboard';
import { HomePage } from './pages/auth/HomePage';
import { SMSAuthPage } from './pages/auth/SMSAuthPage';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/signup" element={<SMSAuthPage />}></Route>
          </Routes>
          <Toaster />
          <ToastContainer closeOnClick />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
