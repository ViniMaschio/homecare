import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { PatientService } from '../../../services/patient-service';
import { PatientViewModel } from '../../../model/patient-model';
import { ToastService } from '../../../services/toast-service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { PatientCard } from '../../../components/patient/patient-card/patient-card';
import { NavBar } from '../../../components/nav-bar/nav-bar';

@Component({
  selector: 'app-patient-list',
  imports: [CommonModule, PatientCard, NavBar],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.scss',
})
export class PatientList implements OnInit {
  constructor(
    private patientService: PatientService,
    private toastService: ToastService,
    private router: Router
  ) {}

  @ViewChild('template', { static: true })
  template!: TemplateRef<any>;

  protected menssage: string = '';
  protected patients!: PatientViewModel[];

  ngOnInit(): void {
    this.loadPatients();
  }

  private loadPatients(): void {
    this.patientService
      .getAllPatients()
      .pipe(take(1))
      .subscribe({
        next: (patients) => {
          this.patients = patients;
        },
        error: (err) => {
          this.menssage = `Ocorreu um erro ao carregar os pacientes. ${err.message}`;
          this.showToast('error');
        },
      });
  }
  public loadPatientsBeforeDelete(): void {
    this.loadPatients();
  }
  private showToast(type: 'success' | 'error'): void {
    this.toastService.show({
      template: this.template,
      classname:
        type === 'success' ? 'bg-success text-light' : 'bg-danger text-light',
      delay: 5000,
    });
  }

  protected navigateToCreatePatient(): void {
    this.router.navigate(['/patients/new']);
  }
}
