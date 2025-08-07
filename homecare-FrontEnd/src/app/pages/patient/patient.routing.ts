import { Routes } from '@angular/router';
import { PatientList } from './patient-list/patient-list';
import { PatientForm } from './patient-form/patient-form';

export const PatientRoutes: Routes = [
  {
    path: '',
    component: PatientList,
  },
  {
    path: 'edit/:id',
    component: PatientForm,
  },
  {
    path: 'new',
    component: PatientForm,
  },
];
