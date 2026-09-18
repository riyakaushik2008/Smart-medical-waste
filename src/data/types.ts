export type WasteCategory = 'yellow' | 'red' | 'blue' | 'white';

export type RequestStatus =
  | 'pending'
  | 'assigned'
  | 'collected'
  | 'in-transit'
  | 'at-facility'
  | 'segregated'
  | 'treated'
  | 'completed';

export interface Hospital {
  id: string;
  name: string;
  type: string;
  license: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  beds: number;
  registeredOn: string;
  status: 'active' | 'pending' | 'suspended';
}

export interface CollectionRequest {
  id: string;
  hospitalId: string;
  hospitalName: string;
  category: WasteCategory;
  weightKg: number;
  description: string;
  requestedOn: string;
  pickupDate: string;
  status: RequestStatus;
  driver: string | null;
  vehicle: string | null;
  qrCode: string;
}

export interface SegregationRecord {
  id: string;
  requestId: string;
  hospitalName: string;
  category: WasteCategory;
  incomingWeight: number;
  segregatedWeight: number;
  treatmentMethod: string;
  operator: string;
  timestamp: string;
  status: 'pending' | 'segregated' | 'treated' | 'completed';
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  vehicleType: string;
  capacityKg: number;
  status: 'available' | 'on-duty' | 'off-duty';
  assignedArea: string;
}

export const CATEGORY_INFO: Record<
  WasteCategory,
  { label: string; color: string; bg: string; text: string; description: string; treatment: string }
> = {
  yellow: {
    label: 'Yellow',
    color: '#f59e0b',
    bg: 'bg-accent-100',
    text: 'text-accent-700',
    description: 'Infectious, biodegradable, animal waste',
    treatment: 'Incineration / Autoclaving',
  },
  red: {
    label: 'Red',
    color: '#ef4444',
    bg: 'bg-danger-100',
    text: 'text-danger-700',
    description: 'Recyclable contaminated plastics, tubing, catheters',
    treatment: 'Autoclaving + Shredding',
  },
  blue: {
    label: 'Blue',
    color: '#0ea5e9',
    bg: 'bg-secondary-100',
    text: 'text-secondary-700',
    description: 'Glassware, broken glass, sharps',
    treatment: 'Disinfection + Landfill',
  },
  white: {
    label: 'White',
    color: '#64748b',
    bg: 'bg-slate-200',
    text: 'text-slate-700',
    description: 'Sharps, needles, scalpels',
    treatment: 'Needle Destroyer + Autoclave',
  },
};

export const STATUS_INFO: Record<
  RequestStatus,
  { label: string; badge: string; step: number }
> = {
  pending: { label: 'Pending', badge: 'bg-slate-200 text-slate-700', step: 0 },
  assigned: { label: 'Assigned', badge: 'bg-secondary-100 text-secondary-700', step: 1 },
  collected: { label: 'Collected', badge: 'bg-accent-100 text-accent-700', step: 2 },
  'in-transit': { label: 'In Transit', badge: 'bg-secondary-100 text-secondary-700', step: 3 },
  'at-facility': { label: 'At Facility', badge: 'bg-primary-100 text-primary-700', step: 4 },
  segregated: { label: 'Segregated', badge: 'bg-primary-100 text-primary-700', step: 5 },
  treated: { label: 'Treated', badge: 'bg-success-100 text-success-700', step: 6 },
  completed: { label: 'Completed', badge: 'bg-success-100 text-success-700', step: 7 },
};

export const SAMPLE_HOSPITALS: Hospital[] = [
  {
    id: 'HSP-001',
    name: 'Apollo Speciality Hospital',
    type: 'Multi-Speciality',
    license: 'KMC-2019-0042',
    address: 'Greams Road, Thousand Lights',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600006',
    contactName: 'Dr. Rajesh Kumar',
    contactPhone: '+91 98400 12345',
    contactEmail: 'biowaste@apollochennai.in',
    beds: 650,
    registeredOn: '2026-01-15',
    status: 'active',
  },
  {
    id: 'HSP-002',
    name: 'AIIMS New Delhi',
    type: 'Government',
    license: 'DLH-2018-0156',
    address: 'Ansari Nagar, Aurobindo Marg',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110029',
    contactName: 'Dr. Priya Sharma',
    contactPhone: '+91 98187 65432',
    contactEmail: 'waste@aiims.edu',
    beds: 1200,
    registeredOn: '2026-02-03',
    status: 'active',
  },
  {
    id: 'HSP-003',
    name: 'Fortis Hospital Mulund',
    type: 'Multi-Speciality',
    license: 'MHB-2020-0891',
    address: 'Mulund Goregaon Link Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400078',
    contactName: 'Dr. Anil Mehta',
    contactPhone: '+91 98200 33445',
    contactEmail: 'bio@fortismulund.in',
    beds: 300,
    registeredOn: '2026-02-20',
    status: 'active',
  },
  {
    id: 'HSP-004',
    name: 'Narayana Health City',
    type: 'Multi-Speciality',
    license: 'KRB-2021-0334',
    address: 'Bommasandra, Anekal Taluk',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560099',
    contactName: 'Dr. Sneha Reddy',
    contactPhone: '+91 98860 11223',
    contactEmail: 'waste@narayanahealth.org',
    beds: 1500,
    registeredOn: '2026-03-05',
    status: 'pending',
  },
];

export const SAMPLE_DRIVERS: Driver[] = [
  {
    id: 'DRV-01',
    name: 'Suresh Patel',
    phone: '+91 99001 22113',
    vehicle: 'KA-01-AB-4521',
    vehicleType: 'Refrigerated Truck',
    capacityKg: 500,
    status: 'available',
    assignedArea: 'Bengaluru South',
  },
  {
    id: 'DRV-02',
    name: 'Mahesh Yadav',
    phone: '+91 99002 44556',
    vehicle: 'KA-05-MN-8830',
    vehicleType: 'Closed Van',
    capacityKg: 300,
    status: 'on-duty',
    assignedArea: 'Bengaluru North',
  },
  {
    id: 'DRV-03',
    name: 'Ramesh Iyer',
    phone: '+91 99003 77889',
    vehicle: 'KA-03-PQ-1190',
    vehicleType: 'Refrigerated Truck',
    capacityKg: 500,
    status: 'available',
    assignedArea: 'Bengaluru East',
  },
];

export const SAMPLE_REQUESTS: CollectionRequest[] = [
  {
    id: 'REQ-2026-0148',
    hospitalId: 'HSP-001',
    hospitalName: 'Apollo Speciality Hospital',
    category: 'yellow',
    weightKg: 45,
    description: 'General infectious waste from ICU and wards',
    requestedOn: '2026-09-14',
    pickupDate: '2026-09-18',
    status: 'in-transit',
    driver: 'Suresh Patel',
    vehicle: 'KA-01-AB-4521',
    qrCode: 'QR-148-APO',
  },
  {
    id: 'REQ-2026-0151',
    hospitalId: 'HSP-002',
    hospitalName: 'AIIMS New Delhi',
    category: 'red',
    weightKg: 28,
    description: 'Contaminated plastic tubing and catheters',
    requestedOn: '2026-09-15',
    pickupDate: '2026-09-18',
    status: 'assigned',
    driver: 'Mahesh Yadav',
    vehicle: 'KA-05-MN-8830',
    qrCode: 'QR-151-AIIMS',
  },
  {
    id: 'REQ-2026-0153',
    hospitalId: 'HSP-003',
    hospitalName: 'Fortis Hospital Mulund',
    category: 'white',
    weightKg: 12,
    description: 'Used needles and sharps from dialysis unit',
    requestedOn: '2026-09-16',
    pickupDate: '2026-09-19',
    status: 'pending',
    driver: null,
    vehicle: null,
    qrCode: 'QR-153-FRT',
  },
  {
    id: 'REQ-2026-0142',
    hospitalId: 'HSP-001',
    hospitalName: 'Apollo Speciality Hospital',
    category: 'blue',
    weightKg: 18,
    description: 'Broken glass from laboratory',
    requestedOn: '2026-09-12',
    pickupDate: '2026-09-15',
    status: 'completed',
    driver: 'Suresh Patel',
    vehicle: 'KA-01-AB-4521',
    qrCode: 'QR-142-APO',
  },
  {
    id: 'REQ-2026-0145',
    hospitalId: 'HSP-003',
    hospitalName: 'Fortis Hospital Mulund',
    category: 'yellow',
    weightKg: 62,
    description: 'Infectious waste from surgical wards',
    requestedOn: '2026-09-13',
    pickupDate: '2026-09-16',
    status: 'segregated',
    driver: 'Ramesh Iyer',
    vehicle: 'KA-03-PQ-1190',
    qrCode: 'QR-145-FRT',
  },
  {
    id: 'REQ-2026-0149',
    hospitalId: 'HSP-002',
    hospitalName: 'AIIMS New Delhi',
    category: 'white',
    weightKg: 8,
    description: 'Sharps from emergency ward',
    requestedOn: '2026-09-14',
    pickupDate: '2026-09-17',
    status: 'treated',
    driver: 'Mahesh Yadav',
    vehicle: 'KA-05-MN-8830',
    qrCode: 'QR-149-AIIMS',
  },
];

export const SAMPLE_SEGREGATIONS: SegregationRecord[] = [
  {
    id: 'SEG-001',
    requestId: 'REQ-2026-0142',
    hospitalName: 'Apollo Speciality Hospital',
    category: 'blue',
    incomingWeight: 18,
    segregatedWeight: 18,
    treatmentMethod: 'Disinfection + Landfill',
    operator: 'Vikram Singh',
    timestamp: '2026-09-15T14:30:00',
    status: 'completed',
  },
  {
    id: 'SEG-002',
    requestId: 'REQ-2026-0145',
    hospitalName: 'Fortis Hospital Mulund',
    category: 'yellow',
    incomingWeight: 62,
    segregatedWeight: 60,
    treatmentMethod: 'Incineration',
    operator: 'Vikram Singh',
    timestamp: '2026-09-16T11:00:00',
    status: 'segregated',
  },
  {
    id: 'SEG-003',
    requestId: 'REQ-2026-0149',
    hospitalName: 'AIIMS New Delhi',
    category: 'white',
    incomingWeight: 8,
    segregatedWeight: 8,
    treatmentMethod: 'Needle Destroyer + Autoclave',
    operator: 'Anjali Verma',
    timestamp: '2026-09-17T09:15:00',
    status: 'treated',
  },
];
