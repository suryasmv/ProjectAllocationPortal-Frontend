import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  activeTab: 'login' | 'register' = 'login';

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    /* ---------------- LOGIN FORM ---------------- */
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    /* -------------- REGISTER FORM -------------- */
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required], // frontend-only
    });
  }

  /* ---------------- TAB SWITCH ---------------- */
  switchTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }

  /* ---------------- LOGIN ---------------- */
  login() {
  if (this.loginForm.invalid) {
    alert('Please enter username and password');
    return;
  }

  this.authService.login(this.loginForm.value).subscribe({
    next: (res: any) => {
      alert('Login successful');

      // ✅ Role-based routing
      if (res.role === 'ADMIN') {
        this.router.navigate(['/admin']); // or dashboard
      } else {
        this.router.navigate(['/users']);
      }
    },
    error: () => {
      alert('Invalid username or password');
    },
  });
}

  /* ---------------- REGISTER ---------------- */
  register() {
    if (this.registerForm.invalid) {
      alert('Please fill all fields');
      return;
    }

    const { password, confirmPassword, ...payload } = this.registerForm.value;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    payload.password = password;

    this.authService.register(payload).subscribe({
      next: () => {
        alert('Registration successful');
        this.registerForm.reset();
        this.switchTab('login');
      },
      error: () => {
        alert('Registration failed');
      },
    });
  }
}
