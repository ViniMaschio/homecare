import { Routes } from '@angular/router';
import { PatientList } from './pages/patient-list/patient-list';
import { PatientForm } from './pages/patient-form/patient-form';

export const routes: Routes = [
  { path: 'patients', component: PatientList },
  { path: 'patients/new', component: PatientForm },
  { path: 'patients/edit/:id', component: PatientForm },
  { path: '', redirectTo: '/patients', pathMatch: 'full' },
];
