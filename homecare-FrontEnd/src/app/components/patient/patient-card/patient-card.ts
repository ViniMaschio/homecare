import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { Router } from '@angular/router';
import { take } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PatientService } from '../../../services/patient-service';
import { PatientViewModel } from '../../../model/patient-model';
import { ToastService } from '../../../services/toast-service';
import { PatientModal } from '../patient-modal/patient-modal';

@Component({
  selector: 'app-patient-card',
  imports: [CommonModule],
  templateUrl: './patient-card.html',
  styleUrl: './patient-card.scss',
})
export class PatientCard {
  @Input() patient!: PatientViewModel;
  @Output() patientDeleted = new EventEmitter<void>();

  constructor(
    private router: Router,
    private patientService: PatientService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  protected message = '';

  @ViewChild('Template', { static: false })
  Template!: TemplateRef<any>;

  protected navigateToEditPatient(patientId: number): void {
    this.router.navigate(['/patients/edit', patientId]);
  }
  protected deletePatient(patientId: number): void {
    this.patientService
      .deletedPatient(patientId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.message = 'Paciente excluído com sucesso!';
          this.showToast('success');
          this.patientDeleted.emit();
        },
        error: (err) => {
          this.message = `Ocorreu um erro ao excluir o paciente. ${err.message}`;
          this.showToast('error');
        },
      });
  }
  private showToast(type: 'success' | 'error'): void {
    this.toastService.show({
      template: this.Template,
      classname:
        type === 'success' ? 'bg-success text-light' : 'bg-danger text-light',
      delay: 5000,
    });
  }

  protected openModal() {
    const modalRef = this.modalService.open(PatientModal);
    modalRef.componentInstance.patient = structuredClone(this.patient);
    modalRef.result.then(() => {
      this.patientService
        .getPatientById(this.patient.id)
        .pipe(take(1))
        .subscribe({
          next: (updatedPatient) => {
            this.patient = updatedPatient;
            this.message = 'Cuidador atualizado com sucesso!';
            this.showToast('success');
          },
          error: (err) => {
            this.message = `Ocorreu um erro ao atualizar o Cuidador. ${err.message}`;
            this.showToast('error');
          },
        });
    });
  }
}
