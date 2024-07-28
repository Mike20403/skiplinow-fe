import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { Dashboard } from './pages/Dashboard.tsx';
import { HomePage } from './pages/auth/HomePage';
import { SMSAuthPage } from './pages/auth/SMSAuthPage';
import { Toaster } from './components/ui/toaster';
import ProtectedRoute from './components/route/ProtectedRoute';
import PublicRoute from './components/route/PublicRoute';
import { CaptionGeneratePage } from '@/pages/services/CaptionGeneratePage.tsx';
import { CaptionProfilePage } from '@/pages/profile/CaptionProfilePage.tsx';
import { CaptionGenerateHomePage } from '@/pages/services/CaptionGenerateHomePage.tsx';
import { ChooseMediaPage } from '@/pages/services/start-from-scratch/ChooseMediaPage.tsx';
import { GetInpsiredPage } from '@/pages/services/get-inspired/GetInspiredPage.tsx';
import { MediaFormPage } from '@/pages/services/start-from-scratch/MediaFormPage.tsx';
import SharePage from '@/pages/third-party/SharePage.tsx';


function App() {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="services" element={<CaptionGeneratePage />}>
            <Route index element={<CaptionGenerateHomePage />} />
            <Route path="medias" element={<ChooseMediaPage />} />
            <Route path="get-inspired" element={<GetInpsiredPage />} />
          </Route>


          <Route path="profile" element={<CaptionProfilePage />} />
        </Route>
        <Route path="/share" element={<SharePage />} />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SMSAuthPage />
            </PublicRoute>
          }/>
        <Route path="*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>

      <Toaster />
      <ToastContainer closeOnClick />
    </>
  );
}

export default App;
