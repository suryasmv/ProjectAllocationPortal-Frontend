import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./user/user-routing.module').then(m => m.USER_ROUTES)
  }
];
