import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import {
  CaregiverUpSertModel,
  CaregiverViewModel,
} from '../model/caregiver-model';

@Injectable({
  providedIn: 'root',
})
export class CaregiverService {
  constructor(private http: HttpClient) {}

  getAllCaregivers() {
    return this.http.get<CaregiverViewModel[]>(
      `${environment.apiUrl}/caregivers`
    );
  }
  getCaregiverById(id: number) {
    return this.http.get<CaregiverViewModel>(
      `${environment.apiUrl}/caregivers/${id}`
    );
  }
  createCaregiver(caregiver: CaregiverUpSertModel) {
    return this.http.post(`${environment.apiUrl}/caregivers`, caregiver);
  }
  updateCaregiver(id: number, caregiver: CaregiverUpSertModel) {
    return this.http.put(`${environment.apiUrl}/caregivers/${id}`, caregiver);
  }
  deletedCaregiver(id: number) {
    return this.http.delete(`${environment.apiUrl}/caregivers/${id}`);
  }
}
