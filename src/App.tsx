import { useState } from 'react';
import { AppProvider } from '@/context/AppContext';
import Navbar, { PageId } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import HospitalRegistration from '@/pages/HospitalRegistration';
import CollectionRequestPage from '@/pages/CollectionRequest';
import WasteTracking from '@/pages/WasteTracking';
import WasteSegregation from '@/pages/WasteSegregation';
import AdminDashboard from '@/pages/AdminDashboard';

function App() {
  const [page, setPage] = useState<PageId>('home');

  const handleNavigate = (p: PageId) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar current={page} onNavigate={handleNavigate} />
        <main className="flex-1">
          {page === 'home' && <Home onNavigate={handleNavigate} />}
          {page === 'register' && <HospitalRegistration onNavigate={handleNavigate} />}
          {page === 'request' && <CollectionRequestPage onNavigate={handleNavigate} />}
          {page === 'tracking' && <WasteTracking />}
          {page === 'segregation' && <WasteSegregation />}
          {page === 'admin' && <AdminDashboard />}
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    </AppProvider>
  );
}

export default App;
