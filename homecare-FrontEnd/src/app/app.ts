import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastsContainer } from './components/toasts-container/toasts-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastsContainer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('FrontEnd');
}
