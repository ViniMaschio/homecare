import { CaregiverModel } from './caregiver-model';

export interface PatientViewModel {
  id: number;
  name: string;
  address: string;
  birth_date: Date;
  caregivers: CaregiverModel[];
}

export interface PatientModel {
  id: number;
  name: string;
  address: string;
  birth_date: Date;
}

export interface PatientUpSertModel {
  name: string;
  address: string;
  birth_date: Date;
  caregiver_ids: number[];
}
