import { useState } from 'react';
import {
  Hospital, CheckCircle2, Building2, MapPin, User, Phone, Mail,
  BedDouble, FileText, BadgeCheck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Hospital as HospitalType } from '@/data/types';
import { PageId } from '@/components/Navbar';

interface RegisterProps {
  onNavigate: (page: PageId) => void;
}

const HOSPITAL_TYPES = ['Government', 'Multi-Speciality', 'Single-Speciality', 'Clinic', 'Diagnostic Center', 'Nursing Home'];

export default function HospitalRegistration({ onNavigate }: RegisterProps) {
  const { hospitals, addHospital } = useApp();
  const [submitted, setSubmitted] = useState<HospitalType | null>(null);
  const [form, setForm] = useState({
    name: '',
    type: 'Multi-Speciality',
    license: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    beds: '',
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `HSP-${String(hospitals.length + 1).padStart(3, '0')}`;
    const newHospital: HospitalType = {
      id,
      name: form.name,
      type: form.type,
      license: form.license,
      address: form.address,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      contactName: form.contactName,
      contactPhone: form.contactPhone,
      contactEmail: form.contactEmail,
      beds: parseInt(form.beds) || 0,
      registeredOn: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    addHospital(newHospital);
    setSubmitted(newHospital);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
        <div className="card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-success-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Registration Submitted!</h2>
          <p className="text-slate-600 mb-6">
            Your hospital has been registered successfully. Your application is pending verification.
          </p>
          <div className="bg-slate-50 rounded-xl p-5 text-left mb-6 space-y-2">
            <div className="flex justify-between"><span className="text-sm text-slate-500">Hospital ID</span><span className="text-sm font-bold text-primary-700">{submitted.id}</span></div>
            <div className="flex justify-between"><span className="text-sm text-slate-500">Hospital Name</span><span className="text-sm font-semibold text-slate-700">{submitted.name}</span></div>
            <div className="flex justify-between"><span className="text-sm text-slate-500">License No.</span><span className="text-sm font-semibold text-slate-700">{submitted.license}</span></div>
            <div className="flex justify-between"><span className="text-sm text-slate-500">Registered On</span><span className="text-sm font-semibold text-slate-700">{submitted.registeredOn}</span></div>
            <div className="flex justify-between"><span className="text-sm text-slate-500">Status</span><span className="badge bg-accent-100 text-accent-700">Pending Verification</span></div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={() => onNavigate('request')} className="btn-primary">Request Collection</button>
            <button onClick={() => { setSubmitted(null); setForm({ name: '', type: 'Multi-Speciality', license: '', address: '', city: '', state: '', pincode: '', contactName: '', contactPhone: '', contactEmail: '', beds: '' }); }} className="btn-secondary">Register Another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
          <Hospital className="w-7 h-7 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Hospital Registration</h1>
        <p className="text-slate-600">Register your healthcare facility to join the BioWaste network</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 lg:p-8 space-y-8">
        {/* Facility Info */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-slate-800">Facility Information</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="label">Hospital Name *</label>
              <input className="input" required value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="e.g. Apollo Speciality Hospital" />
            </div>
            <div>
              <label className="label">Hospital Type *</label>
              <select className="input" value={form.type} onChange={(e) => handleChange('type', e.target.value)}>
                {HOSPITAL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">License Number *</label>
              <input className="input" required value={form.license} onChange={(e) => handleChange('license', e.target.value)} placeholder="e.g. KMC-2026-0001" />
            </div>
            <div>
              <label className="label">Number of Beds *</label>
              <input className="input" type="number" required value={form.beds} onChange={(e) => handleChange('beds', e.target.value)} placeholder="e.g. 250" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-slate-800">Address</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="label">Street Address *</label>
              <input className="input" required value={form.address} onChange={(e) => handleChange('address', e.target.value)} placeholder="e.g. Greams Road, Thousand Lights" />
            </div>
            <div>
              <label className="label">City *</label>
              <input className="input" required value={form.city} onChange={(e) => handleChange('city', e.target.value)} placeholder="e.g. Chennai" />
            </div>
            <div>
              <label className="label">State *</label>
              <input className="input" required value={form.state} onChange={(e) => handleChange('state', e.target.value)} placeholder="e.g. Tamil Nadu" />
            </div>
            <div>
              <label className="label">PIN Code *</label>
              <input className="input" required value={form.pincode} onChange={(e) => handleChange('pincode', e.target.value)} placeholder="e.g. 600006" />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <User className="w-5 h-5 text-primary-600" />
            <h3 className="font-bold text-slate-800">Contact Person</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Contact Name *</label>
              <input className="input" required value={form.contactName} onChange={(e) => handleChange('contactName', e.target.value)} placeholder="e.g. Dr. Rajesh Kumar" />
            </div>
            <div>
              <label className="label">Phone Number *</label>
              <input className="input" required value={form.contactPhone} onChange={(e) => handleChange('contactPhone', e.target.value)} placeholder="e.g. +91 98400 12345" />
            </div>
            <div className="md:col-span-2">
              <label className="label">Email Address *</label>
              <input className="input" type="email" required value={form.contactEmail} onChange={(e) => handleChange('contactEmail', e.target.value)} placeholder="e.g. biowaste@hospital.in" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-100">
          <button type="submit" className="btn-primary">
            <BadgeCheck className="w-4 h-4" /> Submit Registration
          </button>
          <button type="reset" onClick={() => setForm({ name: '', type: 'Multi-Speciality', license: '', address: '', city: '', state: '', pincode: '', contactName: '', contactPhone: '', contactEmail: '', beds: '' })} className="btn-secondary">
            Reset Form
          </button>
        </div>
      </form>

      {/* Registered hospitals */}
      <div className="mt-12">
        <div className="flex items-center gap-2 mb-5">
          <FileText className="w-5 h-5 text-primary-600" />
          <h3 className="font-bold text-slate-800">Recently Registered Hospitals</h3>
        </div>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">ID</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Hospital</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">City</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Beds</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hospitals.slice(0, 5).map((h) => (
                  <tr key={h.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-3 font-mono text-xs text-primary-700">{h.id}</td>
                    <td className="px-5 py-3 font-medium text-slate-800">{h.name}</td>
                    <td className="px-5 py-3 text-slate-600">{h.city}</td>
                    <td className="px-5 py-3 text-slate-600">{h.beds}</td>
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
      </div>
    </div>
  );
}
