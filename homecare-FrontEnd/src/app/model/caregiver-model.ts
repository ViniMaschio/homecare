import { PatientModel } from './patient-model';

export interface CaregiverViewModel {
  id: number;
  name: string;
  specialty: string;
  phone: string;
  patients: PatientModel[];
}

export interface CaregiverModel {
  id: number;
  name: string;
  specialty: string;
  phone: string;
}

export interface CaregiverUpSertModel {
  name: string;
  specialty: string;
  phone: string;
  patient_ids: number[];
}
