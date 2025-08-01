import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../model/patients';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}
  getPatients() {
    return this.http.get<Patient[]>(`${environment.apiUrl}/patients`);
  }

  getPatientById(id: number) {
    return this.http.get<Patient>(`${environment.apiUrl}/patients/${id}`);
  }

  createPatient(patient: Patient) {
    return this.http.post<Patient>(`${environment.apiUrl}/patients`, patient);
  }

  updatePatient(id: number, patient: Patient) {
    return this.http.put<Patient>(
      `${environment.apiUrl}/patients/${id}`,
      patient
    );
  }

  deletePatient(id: number) {
    return this.http.delete(`${environment.apiUrl}/patients/${id}`);
  }
}
