import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CaregiverService } from '../../../services/caregiver-service';
import {
  PatientUpSertModel,
  PatientViewModel,
} from '../../../model/patient-model';
import { PatientService } from '../../../services/patient-service';
import { CaregiverViewModel } from '../../../model/caregiver-model';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-modal.html',
  styleUrl: './patient-modal.scss',
})
export class PatientModal implements OnInit {
  constructor(
    protected activeModal: NgbActiveModal,
    private caregiverService: CaregiverService,
    private patientService: PatientService
  ) {}
  @Input() patient!: PatientViewModel;
  protected Listcaregiver!: CaregiverViewModel[];
  protected caregiverId!: number[];
  protected selectedCaregiver: number = 0;

  ngOnInit() {
    this.caregiverService
      .getAllCaregivers()
      .pipe(take(1))
      .subscribe({
        next: (caregiver) => {
          this.Listcaregiver = caregiver;
        },
      });
    this.caregiverId = this.patient.caregivers?.map((c) => c.id);
  }

  addCaregiver() {
    if (this.selectedCaregiver > 0) {
      const caregiver = this.Listcaregiver.find(
        (c) => c.id == this.selectedCaregiver
      );

      if (caregiver && !this.caregiverId.includes(caregiver.id)) {
        this.patient.caregivers.push(caregiver);
        this.caregiverId.push(caregiver.id);
      }
    }

    this.selectedCaregiver = 0;
  }
  removeCaregiver(caregiverId: number) {
    this.patient.caregivers = this.patient.caregivers?.filter(
      (c) => c.id !== caregiverId
    );
    this.caregiverId = this.caregiverId.filter((id) => id !== caregiverId);
  }

  close() {
    this.activeModal.dismiss();
  }

  save() {
    const patientData: PatientUpSertModel = {
      name: this.patient.name,
      address: this.patient.address,
      birth_date: this.patient.birth_date,
      caregiver_ids: this.caregiverId,
    };

    this.patientService
      .updatePatient(this.patient.id, patientData)
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
