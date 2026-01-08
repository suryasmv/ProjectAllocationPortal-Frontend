import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  activeTab: 'login' | 'register' = 'login';

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  switchTab(tab: 'login' | 'register') {
    this.activeTab = tab;
  }

  login() {
    const { username, password } = this.loginForm.value;

    // Admin login
    if (username?.toLowerCase() === 'rmg') {
      if (password === 'admin123') {
        alert('Welcome Admin RMG');
        return;
      }
      alert('Invalid admin password');
      return;
    }

    const users = JSON.parse(localStorage.getItem('employees') || '[]');
    const user = users.find(
      (u: any) => u.username === username && u.password === password
    );

    user
      ? alert(`Welcome ${user.fullName}`)
      : alert('Invalid username or password');
  }

  register() {
    if (this.registerForm.invalid) {
      alert('Fill all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('employees') || '[]');
    const { username } = this.registerForm.value;

    if (username.toLowerCase() === 'rmg') {
      alert('Username reserved');
      return;
    }

    if (users.some((u: any) => u.username === username)) {
      alert('Username already exists');
      return;
    }

    users.push({
      ...this.registerForm.value,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem('employees', JSON.stringify(users));

    alert('Registration successful');
    this.registerForm.reset();
    this.switchTab('login');
  }
}
