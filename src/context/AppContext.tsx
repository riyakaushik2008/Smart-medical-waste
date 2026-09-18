import { createContext, useContext, useState, ReactNode } from 'react';
import {
  Hospital,
  CollectionRequest,
  SegregationRecord,
  Driver,
  SAMPLE_HOSPITALS,
  SAMPLE_REQUESTS,
  SAMPLE_SEGREGATIONS,
  SAMPLE_DRIVERS,
} from '@/data/types';

interface AppState {
  hospitals: Hospital[];
  requests: CollectionRequest[];
  segregations: SegregationRecord[];
  drivers: Driver[];
  addHospital: (h: Hospital) => void;
  addRequest: (r: CollectionRequest) => void;
  updateRequestStatus: (id: string, status: CollectionRequest['status']) => void;
  assignDriver: (id: string, driver: Driver) => void;
  addSegregation: (s: SegregationRecord) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [hospitals, setHospitals] = useState<Hospital[]>(SAMPLE_HOSPITALS);
  const [requests, setRequests] = useState<CollectionRequest[]>(SAMPLE_REQUESTS);
  const [segregations, setSegregations] = useState<SegregationRecord[]>(SAMPLE_SEGREGATIONS);
  const [drivers] = useState<Driver[]>(SAMPLE_DRIVERS);

  const addHospital = (h: Hospital) => setHospitals((prev) => [h, ...prev]);

  const addRequest = (r: CollectionRequest) => setRequests((prev) => [r, ...prev]);

  const updateRequestStatus = (id: string, status: CollectionRequest['status']) =>
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  const assignDriver = (id: string, driver: Driver) =>
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, driver: driver.name, vehicle: driver.vehicle, status: 'assigned' as const }
          : r
      )
    );

  const addSegregation = (s: SegregationRecord) => setSegregations((prev) => [s, ...prev]);

  return (
    <AppContext.Provider
      value={{ hospitals, requests, segregations, drivers, addHospital, addRequest, updateRequestStatus, assignDriver, addSegregation }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
