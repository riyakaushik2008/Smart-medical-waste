import {
  ShieldCheck, Truck, Recycle, Activity, QrCode, MapPin,
  ArrowRight, CheckCircle2, Hospital, Users, Weight, Leaf,
} from 'lucide-react';
import { PageId } from '@/components/Navbar';
import { CATEGORY_INFO, WasteCategory } from '@/data/types';
import { useApp } from '@/context/AppContext';

interface HomeProps {
  onNavigate: (page: PageId) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const { hospitals, requests, segregations } = useApp();

  const stats = [
    { icon: Hospital, label: 'Registered Hospitals', value: hospitals.length, color: 'text-primary-600', bg: 'bg-primary-50' },
    { icon: Truck, label: 'Collection Requests', value: requests.length, color: 'text-secondary-600', bg: 'bg-secondary-50' },
    { icon: Recycle, label: 'Waste Segregated', value: `${segregations.reduce((a, s) => a + s.segregatedWeight, 0)} kg`, color: 'text-accent-600', bg: 'bg-accent-50' },
    { icon: CheckCircle2, label: 'Completed Cycles', value: requests.filter((r) => r.status === 'completed').length, color: 'text-success-600', bg: 'bg-success-50' },
  ];

  const features = [
    {
      icon: QrCode,
      title: 'QR-Based Tracking',
      desc: 'Every waste bag gets a unique QR code for end-to-end traceability from hospital to treatment facility.',
    },
    {
      icon: Recycle,
      title: 'AI-Assisted Segregation',
      desc: 'Smart color-coded segregation system (Yellow, Red, Blue, White) compliant with BMWM Rules 2016.',
    },
    {
      icon: Truck,
      title: 'Optimized Collection',
      desc: 'Route-optimized collection vehicles with real-time driver assignment and GPS tracking.',
    },
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      desc: 'Live dashboard tracking waste status from pickup request through treatment and disposal.',
    },
    {
      icon: MapPin,
      title: 'GPS Vehicle Tracking',
      desc: 'Track collection vehicles in real-time with geofenced routes and automated alerts.',
    },
    {
      icon: Leaf,
      title: 'Eco-Compliant Disposal',
      desc: 'Environmentally safe treatment methods: incineration, autoclaving, and shredding.',
    },
  ];

  const categories: WasteCategory[] = ['yellow', 'red', 'blue', 'white'];

  const steps = [
    { num: '01', title: 'Hospital Registers', desc: 'Healthcare facilities register on the platform with license and contact details.' },
    { num: '02', title: 'Request Collection', desc: 'Hospitals raise waste collection requests specifying category and weight.' },
    { num: '03', title: 'Driver Assigned', desc: 'System assigns the nearest available vehicle and driver for pickup.' },
    { num: '04', title: 'Track Transit', desc: 'QR-coded bags are tracked in real-time from hospital to treatment facility.' },
    { num: '05', title: 'Segregation & Treatment', desc: 'Waste is segregated by color code and treated using approved methods.' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="badge bg-primary-100 text-primary-700 mb-5">
                <ShieldCheck className="w-3.5 h-3.5" /> SIH 2026 · Smart India Hackathon
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
                Smart Medical-Waste Collection &amp; Segregation System
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
                An end-to-end platform for safe, traceable, and compliant biomedical waste
                management — connecting hospitals, collection vehicles, and treatment
                facilities under one intelligent system.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => onNavigate('register')} className="btn-primary">
                  Register Your Hospital <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => onNavigate('tracking')} className="btn-secondary">
                  Track Waste
                </button>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="card p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Live System Overview</h3>
                    <p className="text-xs text-slate-500">Real-time operational data</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-xl border border-slate-200 p-4 hover:shadow-md transition">
                      <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                        <s.icon className={`w-5 h-5 ${s.color}`} />
                      </div>
                      <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, label: 'Active Users', value: '240+' },
              { icon: Truck, label: 'Vehicles Deployed', value: '18' },
              { icon: Weight, label: 'Waste Processed', value: '12.4 tons' },
              { icon: CheckCircle2, label: 'Compliance Rate', value: '99.2%' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="w-7 h-7 text-primary-400 mx-auto mb-2" />
                <p className="text-2xl lg:text-3xl font-bold text-white">{s.value}</p>
                <p className="text-xs lg:text-sm text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge bg-secondary-100 text-secondary-700 mb-4">Core Features</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
            A Complete Waste Management Ecosystem
          </h2>
          <p className="text-slate-600">
            From hospital registration to final treatment — every step is digitized, tracked, and compliant.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Color-coded categories */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge bg-accent-100 text-accent-700 mb-4">BMWM Rules 2016</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
              Color-Coded Waste Categories
            </h2>
            <p className="text-slate-600">
              Medical waste is segregated into four color-coded categories, each with specific treatment protocols.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => {
              const info = CATEGORY_INFO[cat];
              return (
                <div key={cat} className="card p-6 border-t-4 hover:shadow-lg transition" style={{ borderTopColor: info.color }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${info.bg} flex items-center justify-center`}>
                      <Recycle className={`w-5 h-5 ${info.text}`} />
                    </div>
                    <h3 className="font-bold text-slate-800">{info.label} Category</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">{info.description}</p>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs font-medium text-slate-500 mb-1">Treatment</p>
                    <p className="text-sm font-semibold text-slate-700">{info.treatment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge bg-primary-100 text-primary-700 mb-4">How It Works</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
            From Registration to Treatment
          </h2>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              <div className="card p-5 h-full">
                <div className="text-3xl font-extrabold text-primary-200 mb-2">{step.num}</div>
                <h3 className="font-bold text-slate-800 text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-3 w-5 h-5 text-primary-300 -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={() => onNavigate('admin')} className="btn-primary">
            View Admin Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Digitize Your Waste Management?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Join the network of hospitals using BioWaste for safe, compliant, and traceable biomedical waste disposal.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => onNavigate('register')} className="btn bg-white text-primary-700 hover:bg-primary-50">
              Register Now <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onNavigate('request')} className="btn bg-primary-500 text-white hover:bg-primary-400 border border-primary-400">
              Request Collection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
