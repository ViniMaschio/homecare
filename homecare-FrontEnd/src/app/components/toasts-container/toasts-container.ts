import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast-service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-toasts',
  imports: [NgbToastModule, NgTemplateOutlet],
  templateUrl: './toasts-container.html',
  styleUrl: './toasts-container.scss',
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200',
  },
})
export class ToastsContainer {
  readonly toastService = inject(ToastService);
}
