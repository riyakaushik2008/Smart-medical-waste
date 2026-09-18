import { ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';

export type PageId =
  | 'home'
  | 'register'
  | 'request'
  | 'tracking'
  | 'segregation'
  | 'admin';

interface NavItem {
  id: PageId;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'register', label: 'Hospital Registration' },
  { id: 'request', label: 'Collection Request' },
  { id: 'tracking', label: 'Waste Tracking' },
  { id: 'segregation', label: 'Segregation' },
  { id: 'admin', label: 'Admin Dashboard' },
];

interface NavbarProps {
  current: PageId;
  onNavigate: (page: PageId) => void;
}

export default function Navbar({ current, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="block text-base font-bold text-slate-800 leading-tight">BioWaste</span>
              <span className="block text-xs text-primary-600 font-medium leading-tight">Smart Segregation System</span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  current === item.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:text-primary-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-slate-200 bg-white animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                  current === item.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
