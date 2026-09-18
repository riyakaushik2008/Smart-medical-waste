import { useState } from 'react';
import {
  Truck, CheckCircle2, Package, Weight, Calendar, FileText,
  QrCode, ArrowRight, Info,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CollectionRequest, WasteCategory, CATEGORY_INFO } from '@/data/types';
import { PageId } from '@/components/Navbar';

interface RequestProps {
  onNavigate: (page: PageId) => void;
}

const CATEGORIES: WasteCategory[] = ['yellow', 'red', 'blue', 'white'];

export default function CollectionRequestPage({ onNavigate }: RequestProps) {
  const { hospitals, requests, addRequest } = useApp();
  const [submitted, setSubmitted] = useState<CollectionRequest | null>(null);
  const [form, setForm] = useState({
    hospitalId: hospitals[0]?.id || '',
    category: 'yellow' as WasteCategory,
    weightKg: '',
    description: '',
    pickupDate: '',
  });

  const selectedHospital = hospitals.find((h) => h.id === form.hospitalId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = requests.length + 148;
    const id = `REQ-2026-${String(num).padStart(4, '0')}`;
    const newReq: CollectionRequest = {
      id,
      hospitalId: form.hospitalId,
      hospitalName: selectedHospital?.name || '',
      category: form.category,
      weightKg: parseFloat(form.weightKg) || 0,
      description: form.description,
      requestedOn: new Date().toISOString().split('T')[0],
      pickupDate: form.pickupDate,
      status: 'pending',
      driver: null,
      vehicle: null,
      qrCode: `QR-${num}-${selectedHospital?.name.slice(0, 3).toUpperCase() || 'GEN'}`,
    };
    addRequest(newReq);
    setSubmitted(newReq);
  };

  if (submitted) {
    const catInfo = CATEGORY_INFO[submitted.category];
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Collection Request Created!</h2>
          <p className="text-slate-600 mb-6">Your waste collection request has been submitted. A driver will be assigned shortly.</p>

          <div className="bg-slate-50 rounded-xl p-5 text-left mb-6 space-y-3">
            <div className="flex justify-between"><span className="text-sm text-slate-500">Request ID</span><span className="text-sm font-bold text-primary-700">{submitted.id}</span></div>
            <div className="flex justify-between"><span className="text-sm text-slate-500">Hospital</span><span className="text-sm font-semibold text-slate-700">{submitted.hospitalName}</span></div>
            <div className="flex justify-between"><span className="text-sm text-slate-500">Category</span><span className={`badge ${catInfo.bg} ${catInfo.text}`}>{catInfo.label}</span></div>
            <div className="flex justify-between"><span className="text-sm text-slate-500">Weight</span><span className="text-sm font-semibold text-slate-700">{submitted.weightKg} kg</span></div>
            <div className="flex justify-between"><span className="text-sm text-slate-500">Pickup Date</span><span className="text-sm font-semibold text-slate-700">{submitted.pickupDate}</span></div>
            <div className="flex justify-between"><span className="text-sm text-slate-500">QR Code</span><span className="text-sm font-mono font-bold text-secondary-700">{submitted.qrCode}</span></div>
            <div className="flex justify-between"><span className="text-sm text-slate-500">Status</span><span className="badge bg-slate-200 text-slate-700">Pending</span></div>
          </div>

          <div className="flex gap-3 justify-center">
            <button onClick={() => onNavigate('tracking')} className="btn-primary">Track This Request <ArrowRight className="w-4 h-4" /></button>
            <button onClick={() => setSubmitted(null)} className="btn-secondary">New Request</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-xl bg-secondary-100 flex items-center justify-center mx-auto mb-4">
          <Truck className="w-7 h-7 text-secondary-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Waste Collection Request</h1>
        <p className="text-slate-600">Raise a new biomedical waste pickup request for your facility</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 lg:p-8 space-y-8">
        {/* Hospital selection */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Package className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-slate-800">Select Hospital</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {hospitals.filter((h) => h.status !== 'suspended').map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, hospitalId: h.id }))}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  form.hospitalId === h.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800 text-sm">{h.name}</span>
                  <span className={`badge ${h.status === 'active' ? 'bg-success-100 text-success-700' : 'bg-accent-100 text-accent-700'}`}>{h.status}</span>
                </div>
                <p className="text-xs text-slate-500">{h.id} · {h.city}, {h.state}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Category selection */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <FileText className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-slate-800">Waste Category</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CATEGORIES.map((cat) => {
              const info = CATEGORY_INFO[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, category: cat }))}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    form.category === cat ? 'border-2' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  style={form.category === cat ? { borderColor: info.color, backgroundColor: `${info.color}10` } : {}}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: info.color }}>
                      <span className="text-xs font-bold text-white">{info.label[0]}</span>
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{info.label}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{info.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Weight className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-slate-800">Pickup Details</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Estimated Weight (kg) *</label>
              <input className="input" type="number" step="0.1" required value={form.weightKg} onChange={(e) => setForm((prev) => ({ ...prev, weightKg: e.target.value }))} placeholder="e.g. 45" />
            </div>
            <div>
              <label className="label">Preferred Pickup Date *</label>
              <input className="input" type="date" required value={form.pickupDate} onChange={(e) => setForm((prev) => ({ ...prev, pickupDate: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Waste Description *</label>
              <textarea className="input min-h-[80px] resize-none" required value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} placeholder="e.g. General infectious waste from ICU and surgical wards" />
            </div>
          </div>
        </div>

        {/* QR preview */}
        <div className="bg-secondary-50 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-secondary-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600">
            A unique QR code will be generated for this request. The QR code enables end-to-end
            tracking of your waste from pickup through treatment and disposal.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
          <button type="submit" className="btn-primary">
            <QrCode className="w-4 h-4" /> Submit Collection Request
          </button>
        </div>
      </form>

      {/* Recent requests */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-5">
          <Calendar className="w-5 h-5 text-primary-600" />
          <h3 className="font-bold text-slate-800">Recent Collection Requests</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.slice(0, 6).map((r) => {
            const info = CATEGORY_INFO[r.category];
            return (
              <div key={r.id} className="card p-4 hover:shadow-md transition">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-primary-700">{r.id}</span>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: info.color }}>
                    <span className="text-xs font-bold text-white">{info.label[0]}</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-800 mb-1 truncate">{r.hospitalName}</p>
                <p className="text-xs text-slate-500 mb-3">{r.weightKg} kg · Pickup: {r.pickupDate}</p>
                <span className="badge bg-slate-100 text-slate-600 capitalize">{r.status.replace('-', ' ')}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
