import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CaregiverService } from '../../../services/caregiver-service';
import { PatientService } from '../../../services/patient-service';
import { PatientViewModel } from '../../../model/patient-model';
import { take } from 'rxjs';
import {
  CaregiverUpSertModel,
  CaregiverViewModel,
} from '../../../model/caregiver-model';

@Component({
  selector: 'app-caregiver-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './caregiver-modal.html',
  styleUrl: './caregiver-modal.scss',
})
export class CaregiverModal implements OnInit {
  constructor(
    protected activeModal: NgbActiveModal,
    private caregiverService: CaregiverService,
    private patientService: PatientService
  ) {}
  @Input() caregiver!: CaregiverViewModel;
  protected listPatient!: PatientViewModel[];
  protected patientId!: number[];
  protected selectedPatient: number = 0;

  ngOnInit() {
    this.patientService
      .getAllPatients()
      .pipe(take(1))
      .subscribe({
        next: (patient) => {
          this.listPatient = patient;
        },
      });
    this.patientId = this.caregiver.patients?.map((p) => p.id);
  }

  protected addPatient() {
    if (this.selectedPatient > 0) {
      const patient = this.listPatient.find(
        (p) => p.id == this.selectedPatient
      );

      if (patient && !this.patientId.includes(patient.id)) {
        this.caregiver.patients.push(patient);
        this.patientId.push(patient.id);
      }
    }

    this.selectedPatient = 0;
  }

  protected removePatient(patientId: number): void {
    this.caregiver.patients = this.caregiver.patients?.filter(
      (p) => p.id !== patientId
    );
    this.patientId = this.patientId.filter((id) => id !== patientId);
  }
  close() {
    this.activeModal.dismiss();
  }

  protected save(): void {
    const caregiverData: CaregiverUpSertModel = {
      name: this.caregiver.name,
      phone: this.caregiver.phone,
      specialty: this.caregiver.specialty,
      patient_ids: this.patientId,
    };

    this.caregiverService
      .updateCaregiver(this.caregiver.id, caregiverData)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.activeModal.close();
        },
        error: (err) => {
          this.activeModal.dismiss(err);
        },
      });
  }
}
