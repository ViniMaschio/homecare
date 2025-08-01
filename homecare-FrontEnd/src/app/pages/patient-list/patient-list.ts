import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient';
import { Patient } from '../../model/patients';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss',
})
export class PatientList implements OnInit {
  patients!: Patient[];
  private subscription!: Subscription;

  toastService = inject(ToastService);
  @ViewChild('successDeleted', { static: true })
  successDeleted!: TemplateRef<any>;
  @ViewChild('errorTemplate', { static: true })
  errorTemplate!: TemplateRef<any>;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllPatients();
  }

  private getAllPatients(): void {
    this.subscription = this.patientService.getPatients().subscribe({
      next: (patients) => {
        console.log('Pacientes recebidos:', patients);
        this.patients = patients;
        this.cdr.detectChanges();
      },
      error: () => {
        alert('Erro ao buscar pacientes.');
      },
    });
  }

  deletePatient(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este paciente?')) return;

    this.patientService.deletePatient(id).subscribe({
      next: () => {
        this.toastService.show({
          template: this.successDeleted,
          classname: 'bg-success text-light',
          delay: 5000,
        });
        this.getAllPatients();
      },
      error: () => {
        this.toastService.show({
          template: this.errorTemplate,
          classname: 'bg-danger text-light',
          delay: 5000,
        });
      },
    });
  }

  editPatient(id: number): void {
    this.router.navigate(['/patients/edit', id]);
  }

  createPatient(): void {
    this.router.navigate(['/patients/new']);
  }

  OnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
