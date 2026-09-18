import { useState } from 'react';
import {
  LayoutDashboard, Hospital, Truck, Recycle, Users, Weight,
  TrendingUp, CheckCircle2, Clock, Car, User, MapPin,
  Activity, AlertCircle, ChevronRight,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORY_INFO, STATUS_INFO, WasteCategory, RequestStatus } from '@/data/types';

type Tab = 'overview' | 'hospitals' | 'requests' | 'drivers' | 'segregations';

export default function AdminDashboard() {
  const { hospitals, requests, segregations, drivers, updateRequestStatus, assignDriver } = useApp();
  const [tab, setTab] = useState<Tab>('overview');

  const totalWeight = requests.reduce((a, r) => a + r.weightKg, 0);
  const completedCount = requests.filter((r) => r.status === 'completed').length;
  const pendingCount = requests.filter((r) => r.status === 'pending').length;
  const activeHospitals = hospitals.filter((h) => h.status === 'active').length;

  const stats = [
    { icon: Hospital, label: 'Total Hospitals', value: hospitals.length, sub: `${activeHospitals} active`, color: 'primary', bg: 'bg-primary-50', text: 'text-primary-600' },
    { icon: Truck, label: 'Collection Requests', value: requests.length, sub: `${pendingCount} pending`, color: 'secondary', bg: 'bg-secondary-50', text: 'text-secondary-600' },
    { icon: Weight, label: 'Total Waste', value: `${totalWeight} kg`, sub: 'across all requests', color: 'accent', bg: 'bg-accent-50', text: 'text-accent-600' },
    { icon: CheckCircle2, label: 'Completed', value: completedCount, sub: 'treatment cycles', color: 'success', bg: 'bg-success-50', text: 'text-success-600' },
  { icon: Users, label: 'Drivers', value: drivers.length, sub: `${drivers.filter((d) => d.status === 'available').length} available`, color: 'secondary', bg: 'bg-secondary-50', text: 'text-secondary-600' },
    { icon: Recycle, label: 'Segregated', value: segregations.length, sub: 'records', color: 'accent', bg: 'bg-accent-50', text: 'text-accent-600' },
  ];

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'hospitals', label: 'Hospitals', icon: Hospital },
    { id: 'requests', label: 'Requests', icon: Truck },
    { id: 'drivers', label: 'Drivers', icon: Car },
    { id: 'segregations', label: 'Segregations', icon: Recycle },
  ];

  // Category distribution
  const catCounts: Record<WasteCategory, number> = { yellow: 0, red: 0, blue: 0, white: 0 };
  requests.forEach((r) => { catCounts[r.category] += r.weightKg; });
  const maxCatWeight = Math.max(...Object.values(catCounts), 1);

  // Status distribution
  const statusCounts: Record<string, number> = {};
  requests.forEach((r) => { statusCounts[r.status] = (statusCounts[r.status] || 0) + 1; });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
          <LayoutDashboard className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">System overview and management</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              tab === t.id
                ? 'bg-slate-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="card p-5 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <s.icon className={`w-5 h-5 ${s.text}`} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-slate-800">{s.value}</p>
                <p className="text-sm font-medium text-slate-600">{s.label}</p>
                <p className="text-xs text-slate-400 mt-1">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Category distribution */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <Activity className="w-5 h-5 text-primary-600" />
                <h3 className="font-bold text-slate-800">Waste by Category</h3>
              </div>
              <div className="space-y-4">
                {(Object.keys(catCounts) as WasteCategory[]).map((cat) => {
                  const info = CATEGORY_INFO[cat];
                  const weight = catCounts[cat];
                  const pct = (weight / maxCatWeight) * 100;
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium text-slate-700">{info.label} — {info.description.split(',')[0]}</span>
                        <span className="text-sm font-bold text-slate-800">{weight} kg</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: info.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Status distribution */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                <h3 className="font-bold text-slate-800">Requests by Status</h3>
              </div>
              <div className="space-y-2.5">
                {(Object.keys(STATUS_INFO) as RequestStatus[]).map((status) => {
                  const info = STATUS_INFO[status];
                  const count = statusCounts[status] || 0;
                  if (count === 0) return null;
                  return (
                    <div key={status} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition">
                      <span className={`badge ${info.badge}`}>{info.label}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-400 rounded-full" style={{ width: `${(count / requests.length) * 100}%` }} />
                        </div>
                        <span className="text-sm font-bold text-slate-700 w-6 text-right">{count}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="card p-6">
            <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {requests.slice(0, 5).map((r) => {
                const info = CATEGORY_INFO[r.category];
                const statusInfo = STATUS_INFO[r.status];
                return (
                  <div key={r.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: info.color }}>
                      <span className="text-xs font-bold text-white">{info.label[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{r.hospitalName}</p>
                      <p className="text-xs text-slate-500">{r.id} · {r.weightKg} kg · {r.pickupDate}</p>
                    </div>
                    <span className={`badge ${statusInfo.badge} flex-shrink-0`}>{statusInfo.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Hospitals tab */}
      {tab === 'hospitals' && (
        <div className="card overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">ID</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Hospital</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Type</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">City</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Beds</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Contact</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hospitals.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-3 font-mono text-xs text-primary-700">{h.id}</td>
                    <td className="px-5 py-3">
                      <p className="font-semibold text-slate-800">{h.name}</p>
                      <p className="text-xs text-slate-400">{h.license}</p>
                    </td>
                    <td className="px-5 py-3 text-slate-600">{h.type}</td>
                    <td className="px-5 py-3 text-slate-600">{h.city}, {h.state}</td>
                    <td className="px-5 py-3 text-slate-600">{h.beds}</td>
                    <td className="px-5 py-3">
                      <p className="text-xs text-slate-600">{h.contactName}</p>
                      <p className="text-xs text-slate-400">{h.contactPhone}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`badge ${
                        h.status === 'active' ? 'bg-success-100 text-success-700' :
                        h.status === 'pending' ? 'bg-accent-100 text-accent-700' :
                        'bg-danger-100 text-danger-700'
                      }`}>{h.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Requests tab */}
      {tab === 'requests' && (
        <div className="card overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Request ID</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Hospital</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Cat.</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Weight</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Driver</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Status</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((r) => {
                  const info = CATEGORY_INFO[r.category];
                  const statusInfo = STATUS_INFO[r.status];
                  const isPending = r.status === 'pending';
                  return (
                    <tr key={r.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-3 font-mono text-xs text-primary-700">{r.id}</td>
                      <td className="px-5 py-3 font-medium text-slate-800 text-xs">{r.hospitalName}</td>
                      <td className="px-5 py-3"><span className={`badge ${info.bg} ${info.text}`}>{info.label}</span></td>
                      <td className="px-5 py-3 text-slate-600">{r.weightKg} kg</td>
                      <td className="px-5 py-3 text-slate-600 text-xs">{r.driver || '—'}</td>
                      <td className="px-5 py-3"><span className={`badge ${statusInfo.badge}`}>{statusInfo.label}</span></td>
                      <td className="px-5 py-3">
                        {isPending ? (
                          <div className="flex gap-1">
                            {drivers.filter((d) => d.status === 'available').map((d) => (
                              <button
                                key={d.id}
                                onClick={() => assignDriver(r.id, d)}
                                className="text-xs px-2 py-1 rounded bg-primary-50 text-primary-700 hover:bg-primary-100 font-medium transition"
                                title={`Assign ${d.name}`}
                              >
                                {d.name.split(' ')[0]}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            {r.status === 'assigned' && (
                              <button onClick={() => updateRequestStatus(r.id, 'collected')} className="text-xs px-2 py-1 rounded bg-secondary-50 text-secondary-700 hover:bg-secondary-100 font-medium transition">Collect</button>
                            )}
                            {r.status === 'collected' && (
                              <button onClick={() => updateRequestStatus(r.id, 'in-transit')} className="text-xs px-2 py-1 rounded bg-secondary-50 text-secondary-700 hover:bg-secondary-100 font-medium transition">Transit</button>
                            )}
                            {r.status === 'in-transit' && (
                              <button onClick={() => updateRequestStatus(r.id, 'at-facility')} className="text-xs px-2 py-1 rounded bg-primary-50 text-primary-700 hover:bg-primary-100 font-medium transition">Arrived</button>
                            )}
                            {r.status === 'segregated' && (
                              <button onClick={() => updateRequestStatus(r.id, 'treated')} className="text-xs px-2 py-1 rounded bg-success-50 text-success-700 hover:bg-success-100 font-medium transition">Treat</button>
                            )}
                            {r.status === 'treated' && (
                              <button onClick={() => updateRequestStatus(r.id, 'completed')} className="text-xs px-2 py-1 rounded bg-success-50 text-success-700 hover:bg-success-100 font-medium transition">Complete</button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Drivers tab */}
      {tab === 'drivers' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {drivers.map((d) => (
            <div key={d.id} className="card p-5 hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{d.name}</p>
                  <p className="text-xs text-slate-500">{d.id}</p>
                </div>
              </div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-slate-500 flex items-center gap-1"><Car className="w-3.5 h-3.5" />Vehicle</dt><dd className="font-semibold text-slate-700">{d.vehicle}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Type</dt><dd className="font-semibold text-slate-700">{d.vehicleType}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500 flex items-center gap-1"><Weight className="w-3.5 h-3.5" />Capacity</dt><dd className="font-semibold text-slate-700">{d.capacityKg} kg</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />Area</dt><dd className="font-semibold text-slate-700">{d.assignedArea}</dd></div>
                <div className="flex justify-between"><dt className="text-slate-500">Phone</dt><dd className="font-semibold text-slate-700 text-xs">{d.phone}</dd></div>
              </dl>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className={`badge ${
                  d.status === 'available' ? 'bg-success-100 text-success-700' :
                  d.status === 'on-duty' ? 'bg-accent-100 text-accent-700' :
                  'bg-slate-200 text-slate-600'
                }`}>{d.status.replace('-', ' ')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Segregations tab */}
      {tab === 'segregations' && (
        <div className="card overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Seg. ID</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Request</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Hospital</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Cat.</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">In/Out (kg)</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Treatment</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Operator</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {segregations.map((s) => {
                  const info = CATEGORY_INFO[s.category];
                  return (
                    <tr key={s.id} className="hover:bg-slate-50 transition">
                      <td className="px-5 py-3 font-mono text-xs text-primary-700">{s.id}</td>
                      <td className="px-5 py-3 font-mono text-xs text-secondary-700">{s.requestId}</td>
                      <td className="px-5 py-3 font-medium text-slate-800 text-xs">{s.hospitalName}</td>
                      <td className="px-5 py-3"><span className={`badge ${info.bg} ${info.text}`}>{info.label}</span></td>
                      <td className="px-5 py-3 text-slate-600">{s.incomingWeight} → {s.segregatedWeight}</td>
                      <td className="px-5 py-3 text-slate-600 text-xs">{s.treatmentMethod}</td>
                      <td className="px-5 py-3 text-slate-600">{s.operator}</td>
                      <td className="px-5 py-3"><span className="badge bg-success-100 text-success-700 capitalize">{s.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
