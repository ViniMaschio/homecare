import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PatientService } from '../../services/patient';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ToastService } from '../../services/toast-service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTooltipModule,
    NgxMaskDirective,
  ],
  providers: [
    provideNgxMask({
      dropSpecialCharacters: true,
    }),
  ],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.scss',
})
export class PatientForm implements OnInit {
  patientForm!: FormGroup;
  patientId!: number;
  updatePatient: boolean = false;
  submitted = false;

  toastService = inject(ToastService);
  @ViewChild('successCreate', { static: true })
  successCreate!: TemplateRef<any>;
  @ViewChild('successUpdate', { static: true })
  successUpdate!: TemplateRef<any>;
  @ViewChild('errorTemplate', { static: true })
  errorTemplate!: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.patientForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      date_of_birth: ['', Validators.required],
      address: ['', Validators.required],
      phone: [''],
      medical_history: [''],
    });
  }

  showToast(template: TemplateRef<any>, type: 'success' | 'error'): void {
    this.toastService.show({
      template: template,
      classname:
        type === 'success' ? 'bg-success text-light' : 'bg-danger text-light',
      delay: 5000,
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.patientId = +id;
      this.updatePatient = true;
      this.loadUpdatePatient();
    }
  }

  private loadUpdatePatient(): void {
    this.patientService
      .getPatientById(this.patientId)
      .pipe(take(1))
      .subscribe({
        next: (patient) => {
          this.patientForm.patchValue(patient);
        },
        error: (error) => {
          console.error('Error loading patient data:', error);
        },
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
              this.showToast(this.successUpdate, 'success');
              this.router.navigate(['/patients']);
            },
            error: (error) => {
              console.error('Error updating patient:', error);
              this.showToast(this.errorTemplate, 'error');
            },
          });
      } else {
        this.patientService
          .createPatient(patientData)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.showToast(this.successCreate, 'success');
              this.router.navigate(['/patients']);
            },
            error: (error) => {
              console.error('Error creating patient:', error);
              this.showToast(this.errorTemplate, 'error');
            },
          });
      }
    }
  }
  cancel(): void {
    this.router.navigate(['/patients']);
  }
}
