import { Routes } from '@angular/router';
import { CaregiverList } from './caregiver-list/caregiver-list';
import { CaregiverForm } from './caregiver-form/caregiver-form';

export const CaregiverRoutes: Routes = [
  {
    path: '',
    component: CaregiverList,
  },
  {
    path: 'edit/:id',
    component: CaregiverForm,
  },
  {
    path: 'new',
    component: CaregiverForm,
  },
];
