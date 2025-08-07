import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CaregiverService } from '../../../services/caregiver-service';
import { ToastService } from '../../../services/toast-service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CaregiverViewModel } from '../../../model/caregiver-model';
import { CommonModule } from '@angular/common';
import { CaregiverCard } from '../../../components/caregiver/caregiver-card/caregiver-card';
import { NavBar } from '../../../components/nav-bar/nav-bar';

@Component({
  selector: 'app-caregiver-list',
  imports: [CommonModule, CaregiverCard, NavBar],
  templateUrl: './caregiver-list.html',
  styleUrl: './caregiver-list.scss',
})
export class CaregiverList implements OnInit {
  constructor(
    private caregiverService: CaregiverService,
    private toastService: ToastService,
    private router: Router
  ) {}

  @ViewChild('template', { static: false })
  template!: TemplateRef<any>;

  protected messager = '';
  protected caregivers!: CaregiverViewModel[];

  ngOnInit(): void {
    this.loadCaregivers();
  }

  private loadCaregivers(): void {
    this.caregiverService
      .getAllCaregivers()
      .pipe(take(1))
      .subscribe({
        next: (caregivers) => {
          this.caregivers = caregivers;
        },
        error: (err) => {
          this.messager = `Ocorreu um erro ao carregar os cuidadores. ${err.message}`;
          this.showToast('error');
        },
      });
  }

  public loadCaregiversBeforeDelete(): void {
    this.loadCaregivers();
  }

  private showToast(type: 'success' | 'error'): void {
    this.toastService.show({
      template: this.template,
      classname:
        type === 'success' ? 'bg-success text-light' : 'bg-danger text-light',
      delay: 5000,
    });
  }

  protected navigateToCreateCaregiver(): void {
    this.router.navigate(['/caregivers/new']);
  }
}
