import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientUpSertModel, PatientViewModel } from '../model/patient-model';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getAllPatients() {
    return this.http.get<PatientViewModel[]>(`${environment.apiUrl}/patients`);
  }

  getPatientById(id: number) {
    return this.http.get<PatientViewModel>(
      `${environment.apiUrl}/patients/${id}`
    );
  }

  createPatient(patient: PatientUpSertModel) {
    return this.http.post(`${environment.apiUrl}/patients`, patient);
  }

  updatePatient(id: number, patient: PatientUpSertModel) {
    return this.http.put(`${environment.apiUrl}/patients/${id}`, patient);
  }

  deletedPatient(id: number) {
    return this.http.delete(`${environment.apiUrl}/patients/${id}`);
  }
}
