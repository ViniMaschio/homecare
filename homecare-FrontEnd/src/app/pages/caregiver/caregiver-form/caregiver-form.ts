import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CaregiverService } from '../../../services/caregiver-service';
import { ToastService } from '../../../services/toast-service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-caregiver-form',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './caregiver-form.html',
  styleUrl: './caregiver-form.scss',
  providers: [
    provideNgxMask({
      dropSpecialCharacters: false,
    }),
  ],
})
export class CaregiverForm implements OnInit {
  constructor(
    private caregiverService: CaregiverService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  @ViewChild('template', { static: false })
  template!: TemplateRef<any>;

  protected messager = '';
  protected caregiverForm!: FormGroup;
  protected caregiverId!: number;
  protected updateCaregiver: boolean = false;
  protected submitted: boolean = false;

  ngOnInit(): void {
    this.caregiverForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      specialty: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      patient_ids: [[]],
    });
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.caregiverId = +id;
      this.updateCaregiver = true;
      this.loadUpdateCaregiver();
    }
  }

  private loadUpdateCaregiver() {
    this.caregiverService
      .getCaregiverById(this.caregiverId)
      .pipe(take(1))
      .subscribe({
        next: (caregiver) => {
          this.caregiverForm.patchValue(caregiver);
        },
        error: (err) => {
          this.messager = `Ocorreu um erro ao carregar o cuidador. ${err.message}`;
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
    if (this.caregiverForm.valid) {
      const caregiverData = this.caregiverForm.value;
      if (this.updateCaregiver) {
        this.caregiverService
          .updateCaregiver(this.caregiverId, caregiverData)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.messager = 'Cuidador atualizado com sucesso!';
              this.showToast('success');
              this.router.navigate(['/caregivers']);
            },
            error: (err) => {
              this.messager = `Ocorreu um erro ao atualizar o cuidador. ${err.message}`;
              this.showToast('error');
            },
          });
      } else {
        this.caregiverService
          .createCaregiver(caregiverData)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.messager = 'Cuidador cadastrado com sucesso!';
              this.showToast('success');
              this.router.navigate(['/caregivers']);
            },
            error: (err) => {
              this.messager = `Ocorreu um erro ao cadastrar o cuidador. ${err.message}`;
              this.showToast('error');
            },
          });
      }
    }
  }
  cancel(): void {
    this.router.navigate(['/caregivers']);
  }
  isInvalid(fieldName: string): boolean {
    const field = this.caregiverForm.get(fieldName);
    return this.submitted && !!field && field.invalid;
  }
  isValid(fieldName: string): boolean {
    const field = this.caregiverForm.get(fieldName);
    return !!this.submitted && !!field && field?.valid;
  }
}
