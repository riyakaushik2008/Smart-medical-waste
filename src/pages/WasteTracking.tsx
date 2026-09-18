import { useState } from 'react';
import {
  Search, Truck, MapPin, QrCode, Package, Weight, Calendar,
  User, Car, CheckCircle2, Clock, Navigation, Filter,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORY_INFO, STATUS_INFO, RequestStatus, CollectionRequest } from '@/data/types';

const STATUS_STEPS: RequestStatus[] = [
  'pending', 'assigned', 'collected', 'in-transit', 'at-facility', 'segregated', 'treated', 'completed',
];

export default function WasteTracking() {
  const { requests } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<CollectionRequest | null>(requests[0] || null);

  const filtered = requests.filter((r) => {
    const matchSearch =
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.hospitalName.toLowerCase().includes(search.toLowerCase()) ||
      r.qrCode.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const currentStep = selected ? STATUS_INFO[selected.status].step : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
          <Navigation className="w-7 h-7 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Waste Tracking</h1>
        <p className="text-slate-600">Track biomedical waste from hospital to treatment facility in real-time</p>
      </div>

      {/* Search & Filter */}
      <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            className="input pl-10"
            placeholder="Search by Request ID, Hospital, or QR Code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
          <select
            className="input pl-10 pr-8 appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            {STATUS_STEPS.map((s) => (
              <option key={s} value={s}>{STATUS_INFO[s].label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* List */}
        <div className="lg:col-span-2 space-y-3">
          <p className="text-sm font-semibold text-slate-500 px-1">{filtered.length} Requests Found</p>
          {filtered.length === 0 && (
            <div className="card p-8 text-center text-slate-500">
              <Package className="w-10 h-10 mx-auto mb-3 text-slate-300" />
              <p className="text-sm">No requests match your search.</p>
            </div>
          )}
          {filtered.map((r) => {
            const catInfo = CATEGORY_INFO[r.category];
            const statusInfo = STATUS_INFO[r.status];
            return (
              <button
                key={r.id}
                onClick={() => setSelected(r)}
                className={`card w-full text-left p-4 transition-all hover:shadow-md ${
                  selected?.id === r.id ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-primary-700">{r.id}</span>
                  <span className={`badge ${statusInfo.badge}`}>{statusInfo.label}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: catInfo.color }}>
                    <span className="text-[10px] font-bold text-white">{catInfo.label[0]}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 truncate">{r.hospitalName}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Weight className="w-3 h-3" />{r.weightKg} kg</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{r.pickupDate}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <div className="space-y-5 animate-fade-in">
              {/* Status tracker */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-slate-800">Tracking: {selected.id}</h3>
                    <p className="text-sm text-slate-500">{selected.hospitalName}</p>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                    <QrCode className="w-7 h-7 text-slate-400" />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="relative mb-2">
                  <div className="flex justify-between items-center">
                    {STATUS_STEPS.map((step, i) => {
                      const info = STATUS_INFO[step];
                      const isActive = i <= currentStep;
                      const isCurrent = i === currentStep;
                      return (
                        <div key={step} className="flex flex-col items-center relative z-10">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isActive
                                ? 'bg-primary-600 text-white'
                                : 'bg-slate-200 text-slate-400'
                            } ${isCurrent ? 'ring-4 ring-primary-200 scale-110' : ''}`}
                          >
                            {isActive ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="absolute top-4 left-4 right-4 h-1 bg-slate-200 -z-0 rounded-full">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all duration-500"
                      style={{ width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  {STATUS_STEPS.map((step) => (
                    <span key={step} className="text-[10px] text-slate-500 text-center w-12 leading-tight">
                      {STATUS_INFO[step].label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="w-4 h-4 text-primary-600" />
                    <h4 className="text-sm font-bold text-slate-800">Waste Details</h4>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-slate-500">Category</dt><dd><span className={`badge ${CATEGORY_INFO[selected.category].bg} ${CATEGORY_INFO[selected.category].text}`}>{CATEGORY_INFO[selected.category].label}</span></dd></div>
                    <div className="flex justify-between"><dt className="text-slate-500">Weight</dt><dd className="font-semibold text-slate-700">{selected.weightKg} kg</dd></div>
                    <div className="flex justify-between"><dt className="text-slate-500">Requested</dt><dd className="font-semibold text-slate-700">{selected.requestedOn}</dd></div>
                    <div className="flex justify-between"><dt className="text-slate-500">Pickup Date</dt><dd className="font-semibold text-slate-700">{selected.pickupDate}</dd></div>
                  </dl>
                  <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">{selected.description}</p>
                </div>

                <div className="card p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-4 h-4 text-primary-600" />
                    <h4 className="text-sm font-bold text-slate-800">Driver &amp; Vehicle</h4>
                  </div>
                  {selected.driver ? (
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between"><dt className="text-slate-500">Driver</dt><dd className="font-semibold text-slate-700 flex items-center gap-1"><User className="w-3 h-3" />{selected.driver}</dd></div>
                      <div className="flex justify-between"><dt className="text-slate-500">Vehicle</dt><dd className="font-semibold text-slate-700 flex items-center gap-1"><Car className="w-3 h-3" />{selected.vehicle}</dd></div>
                      <div className="flex justify-between"><dt className="text-slate-500">QR Code</dt><dd className="font-mono font-bold text-secondary-700 text-xs">{selected.qrCode}</dd></div>
                    </dl>
                  ) : (
                    <div className="text-center py-4">
                      <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">Driver not yet assigned</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-primary-600" />
                  <h4 className="text-sm font-bold text-slate-800">Live Location Tracking</h4>
                </div>
                <div className="relative h-48 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }} />
                  <div className="relative text-center">
                    <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-2 animate-pulse-slow">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-xs font-semibold text-slate-600">
                      {selected.status === 'in-transit' ? 'Vehicle in transit to facility' : selected.status === 'completed' ? 'Delivered to facility' : 'Awaiting pickup'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">GPS tracking enabled</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-12 text-center text-slate-500">
              <Package className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>Select a request to view tracking details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
