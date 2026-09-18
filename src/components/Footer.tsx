import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="block text-base font-bold text-white leading-tight">BioWaste</span>
                <span className="block text-xs text-primary-400 leading-tight">Smart Segregation System</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              A Smart Mobile Medical-Waste Collection and Segregation System designed for
              Indian healthcare facilities, ensuring safe, traceable, and compliant
              biomedical waste management per BMWM Rules 2016.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('register')} className="hover:text-primary-400 transition">Hospital Registration</button></li>
              <li><button onClick={() => onNavigate('request')} className="hover:text-primary-400 transition">Collection Request</button></li>
              <li><button onClick={() => onNavigate('tracking')} className="hover:text-primary-400 transition">Waste Tracking</button></li>
              <li><button onClick={() => onNavigate('segregation')} className="hover:text-primary-400 transition">Segregation</button></li>
              <li><button onClick={() => onNavigate('admin')} className="hover:text-primary-400 transition">Admin Dashboard</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary-400" />
                <span>Bengaluru, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary-400" />
                <span>+91 80 4567 8900</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary-400" />
                <span>support@biowaste.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">© 2026 BioWaste — SIH 2026 Prototype. All rights reserved.</p>
          <p className="text-xs text-slate-500">Smart India Hackathon · Prototype Demonstration</p>
        </div>
      </div>
    </footer>
  );
}
