import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'patients',
    loadChildren: () =>
      import('./pages/patient/patient.routing').then((m) => m.PatientRoutes),
  },

  {
    path: 'caregivers',
    loadChildren: () =>
      import('./pages/caregiver/caregiver.routing').then(
        (m) => m.CaregiverRoutes
      ),
  },
  {
    path: '',
    redirectTo: 'patients',
    pathMatch: 'full',
  },
];
