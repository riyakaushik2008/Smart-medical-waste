import { useState } from 'react';
import {
  Recycle, CheckCircle2, Weight, User, Clock, Filter,
  ArrowRight, Trash2, FlaskConical, Scissors, Zap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORY_INFO, WasteCategory, SegregationRecord, CollectionRequest } from '@/data/types';

const TREATMENT_METHODS: Record<WasteCategory, string[]> = {
  yellow: ['Incineration', 'Autoclaving', 'Microwave Treatment'],
  red: ['Autoclaving + Shredding', 'Chemical Disinfection'],
  blue: ['Disinfection + Landfill', 'Chemical Treatment'],
  white: ['Needle Destroyer + Autoclave', 'Chemical Disinfection'],
};

export default function WasteSegregation() {
  const { requests, segregations, addSegregation, updateRequestStatus } = useApp();
  const [selectedRequest, setSelectedRequest] = useState<CollectionRequest | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [form, setForm] = useState({
    segregatedWeight: '',
    treatmentMethod: '',
    operator: '',
  });
  const [success, setSuccess] = useState<SegregationRecord | null>(null);

  const pendingRequests = requests.filter(
    (r) => r.status === 'at-facility' || r.status === 'collected' || r.status === 'in-transit'
  );

  const filteredPending = pendingRequests.filter(
    (r) => categoryFilter === 'all' || r.category === categoryFilter
  );

  const handleSegregate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;
    const id = `SEG-${String(segregations.length + 1).padStart(3, '0')}`;
    const record: SegregationRecord = {
      id,
      requestId: selectedRequest.id,
      hospitalName: selectedRequest.hospitalName,
      category: selectedRequest.category,
      incomingWeight: selectedRequest.weightKg,
      segregatedWeight: parseFloat(form.segregatedWeight) || 0,
      treatmentMethod: form.treatmentMethod || CATEGORY_INFO[selectedRequest.category].treatment,
      operator: form.operator || 'Vikram Singh',
      timestamp: new Date().toISOString(),
      status: 'segregated',
    };
    addSegregation(record);
    updateRequestStatus(selectedRequest.id, 'segregated');
    setSuccess(record);
    setSelectedRequest(null);
    setForm({ segregatedWeight: '', treatmentMethod: '', operator: '' });
  };

  const catIcon = (cat: WasteCategory) => {
    switch (cat) {
      case 'yellow': return <FlaskConical className="w-4 h-4" />;
      case 'red': return <Zap className="w-4 h-4" />;
      case 'blue': return <Trash2 className="w-4 h-4" />;
      case 'white': return <Scissors className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-xl bg-accent-100 flex items-center justify-center mx-auto mb-4">
          <Recycle className="w-7 h-7 text-accent-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Waste Segregation</h1>
        <p className="text-slate-600">Segregate and process incoming waste at the treatment facility</p>
      </div>

      {success && (
        <div className="card p-5 mb-6 bg-success-50 border-success-200 flex items-center gap-4 animate-fade-in">
          <CheckCircle2 className="w-8 h-8 text-success-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold text-success-800">Segregation Complete</p>
            <p className="text-sm text-success-700">
              {success.id} · {success.hospitalName} · {success.segregatedWeight} kg processed via {success.treatmentMethod}
            </p>
          </div>
          <button onClick={() => setSuccess(null)} className="text-success-600 hover:text-success-800">
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Category guide */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {(['yellow', 'red', 'blue', 'white'] as WasteCategory[]).map((cat) => {
          const info = CATEGORY_INFO[cat];
          return (
            <div key={cat} className="card p-4 border-l-4" style={{ borderLeftColor: info.color }}>
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-7 h-7 rounded-lg ${info.bg} flex items-center justify-center ${info.text}`}>
                  {catIcon(cat)}
                </div>
                <span className="font-bold text-slate-800 text-sm">{info.label}</span>
              </div>
              <p className="text-xs text-slate-500 mb-1">{info.description}</p>
              <p className="text-xs font-semibold text-slate-600">{info.treatment}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Pending requests */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-800">Incoming Waste</h3>
            <div className="relative">
              <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                className="text-xs border border-slate-300 rounded-lg pl-8 pr-6 py-1.5 appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="yellow">Yellow</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="white">White</option>
              </select>
            </div>
          </div>

          {filteredPending.length === 0 && (
            <div className="card p-8 text-center text-slate-500">
              <Recycle className="w-10 h-10 mx-auto mb-3 text-slate-300" />
              <p className="text-sm">No waste awaiting segregation.</p>
            </div>
          )}

          <div className="space-y-3">
            {filteredPending.map((r) => {
              const info = CATEGORY_INFO[r.category];
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    setSelectedRequest(r);
                    setForm({
                      segregatedWeight: String(r.weightKg),
                      treatmentMethod: TREATMENT_METHODS[r.category][0],
                      operator: '',
                    });
                  }}
                  className={`card w-full text-left p-4 transition-all hover:shadow-md ${
                    selectedRequest?.id === r.id ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-primary-700">{r.id}</span>
                    <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: info.color }}>
                      <span className="text-[10px] font-bold text-white">{info.label[0]}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 mb-1 truncate">{r.hospitalName}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Weight className="w-3 h-3" />{r.weightKg} kg</span>
                    <span className="capitalize">{r.status.replace('-', ' ')}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Segregation form */}
        <div className="lg:col-span-3">
          {selectedRequest ? (
            <form onSubmit={handleSegregate} className="card p-6 space-y-5 animate-fade-in">
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
                <Recycle className="w-5 h-5 text-primary-600" />
                <h3 className="font-bold text-slate-800">Segregate: {selectedRequest.id}</h3>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-slate-500">Hospital</span><p className="font-semibold text-slate-800">{selectedRequest.hospitalName}</p></div>
                  <div>
                    <span className="text-slate-500">Category</span>
                    <p><span className={`badge ${CATEGORY_INFO[selectedRequest.category].bg} ${CATEGORY_INFO[selectedRequest.category].text}`}>{CATEGORY_INFO[selectedRequest.category].label}</span></p>
                  </div>
                  <div><span className="text-slate-500">Incoming Weight</span><p className="font-semibold text-slate-800">{selectedRequest.weightKg} kg</p></div>
                  <div><span className="text-slate-500">Description</span><p className="font-semibold text-slate-800 text-xs">{selectedRequest.description}</p></div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Segregated Weight (kg) *</label>
                  <input className="input" type="number" step="0.1" required value={form.segregatedWeight} onChange={(e) => setForm((prev) => ({ ...prev, segregatedWeight: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Treatment Method *</label>
                  <select className="input" required value={form.treatmentMethod} onChange={(e) => setForm((prev) => ({ ...prev, treatmentMethod: e.target.value }))}>
                    {TREATMENT_METHODS[selectedRequest.category].map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Operator Name *</label>
                  <input className="input" required value={form.operator} onChange={(e) => setForm((prev) => ({ ...prev, operator: e.target.value }))} placeholder="e.g. Vikram Singh" />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button type="submit" className="btn-primary">
                  <CheckCircle2 className="w-4 h-4" /> Complete Segregation
                </button>
                <button type="button" onClick={() => setSelectedRequest(null)} className="btn-secondary">Cancel</button>
              </div>
            </form>
          ) : (
            <div className="card p-12 text-center text-slate-500">
              <Recycle className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>Select incoming waste from the left to begin segregation</p>
            </div>
          )}

          {/* Recent segregations */}
          <div className="mt-6">
            <h3 className="font-bold text-slate-800 mb-4">Recent Segregation Records</h3>
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">ID</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Hospital</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Cat.</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Weight</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Treatment</th>
                      <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {segregations.map((s) => {
                      const info = CATEGORY_INFO[s.category];
                      return (
                        <tr key={s.id} className="hover:bg-slate-50 transition">
                          <td className="px-4 py-3 font-mono text-xs text-primary-700">{s.id}</td>
                          <td className="px-4 py-3 font-medium text-slate-800 text-xs truncate max-w-[140px]">{s.hospitalName}</td>
                          <td className="px-4 py-3"><span className={`badge ${info.bg} ${info.text}`}>{info.label}</span></td>
                          <td className="px-4 py-3 text-slate-600">{s.segregatedWeight} kg</td>
                          <td className="px-4 py-3 text-slate-600 text-xs">{s.treatmentMethod}</td>
                          <td className="px-4 py-3"><span className="badge bg-success-100 text-success-700 capitalize">{s.status}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
