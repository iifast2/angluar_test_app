import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { AuthService } from './services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'social-media-backoffice';
  loading$ = this.loader.loading$;
  constructor(
    public loader: LoaderService,
    private authService: AuthService
  ) {}

  ngOnInit() {
  }  
}