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
import { CaregiverViewModel } from '../../../model/caregiver-model';
import { CaregiverService } from '../../../services/caregiver-service';
import { ToastService } from '../../../services/toast-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaregiverModal } from '../caregiver-modal/caregiver-modal';

@Component({
  selector: 'app-caregiver-card',
  imports: [CommonModule],
  templateUrl: './caregiver-card.html',
  styleUrl: './caregiver-card.scss',
})
export class CaregiverCard {
  @Input() caregiver!: CaregiverViewModel;
  @Output() caregiverDeleted = new EventEmitter<void>();

  constructor(
    private router: Router,
    private caregiverService: CaregiverService,
    private toastService: ToastService,
    private modalService: NgbModal
  ) {}

  protected message = '';

  @ViewChild('Template', { static: true })
  Template!: TemplateRef<any>;

  protected navigateToEditCaregiver(caregiverId: number): void {
    this.router.navigate(['/caregivers/edit', caregiverId]);
  }
  protected deleteCaregiver(caregiverId: number): void {
    this.caregiverService
      .deletedCaregiver(caregiverId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.message = 'Cuidador excluído com sucesso!';
          this.showToast('success');
          this.caregiverDeleted.emit();
        },
        error: (err) => {
          this.message = `Ocorreu um erro ao excluir o cuidador. ${err.message}`;
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

  protected openModal(): void {
    const modalRef = this.modalService.open(CaregiverModal);
    modalRef.componentInstance.caregiver = structuredClone(this.caregiver);
    modalRef.result.then(() => {
      this.caregiverService
        .getCaregiverById(this.caregiver.id)
        .pipe(take(1))
        .subscribe({
          next: (updatedCaregiver) => {
            this.caregiver = updatedCaregiver;
            this.message = 'Paciente atualizado com sucesso!';
            this.showToast('success');
          },
          error: (err) => {
            this.message = `Ocorreu um erro ao atualizar o Paciente. ${err.message}`;
            this.showToast('error');
          },
        });
    });
  }
}
