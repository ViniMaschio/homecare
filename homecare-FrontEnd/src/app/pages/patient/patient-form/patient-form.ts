import { PatientService } from './../../../services/patient-service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../../services/toast-service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-patient-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.scss',
})
export class PatientForm implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private toastService: ToastService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  @ViewChild('template', { static: true })
  template!: TemplateRef<any>;

  protected message: string = '';
  protected patientForm!: FormGroup;
  protected submitted: boolean = false;
  protected patientId!: number;
  protected updatePatient: boolean = false;

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', [Validators.required, Validators.min(5)]],
      birth_date: ['', Validators.required],
      caregiver_ids: [[]],
    });
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.patientId = +id;
      this.updatePatient = true;
      this.loadUpdatePatient();
    }
  }

  protected loadUpdatePatient(): void {
    this.patientService
      .getPatientById(this.patientId)
      .pipe(take(1))
      .subscribe({
        next: (patient) => {
          this.patientForm.patchValue({
            name: patient.name,
            address: patient.address,
            birth_date: patient.birth_date,
            caregiver_ids: patient.caregivers.map((c) => c.id),
          });
        },
        error: (err) => {
          this.message = `Ocorreu um erro ao carregar o paciente. ${err.message}`;
          this.showToast('error');
        },
      });
  }

  private showToast(type: 'success' | 'error'): void {
    this.toastService.show({
      template: this.template,
      classname:
        type === 'success' ? 'bg-success text-light' : 'bg-danger text-light',
      delay: 5000,
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.patientForm.valid) {
      const patientData = this.patientForm.value;
      if (this.updatePatient) {
        this.patientService
          .updatePatient(this.patientId, patientData)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.message = 'Paciente atualizado com sucesso!';
              this.showToast('success');
              this.router.navigate(['/patients']);
            },
            error: (err) => {
              this.message = `Ocorreu um erro ao atualizar o paciente. ${err.message}`;
              this.showToast('error');
            },
          });
      } else {
        this.patientService
          .createPatient(patientData)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.message = 'Paciente cadastrado com sucesso!';
              this.showToast('success');
              this.router.navigate(['/patients']);
            },
            error: (err) => {
              this.message = `Ocorreu um erro ao cadastrar o paciente. ${err.message}`;
              this.showToast('error');
            },
          });
      }
    }
  }
  cancel(): void {
    this.router.navigate(['/patients']);
  }
  isInvalid(fieldName: string): boolean {
    const field = this.patientForm.get(fieldName);
    return this.submitted && !!field && field.invalid;
  }
  isValid(fieldName: string): boolean {
    const field = this.patientForm.get(fieldName);
    return !!this.submitted && !!field && field?.valid;
  }
}
