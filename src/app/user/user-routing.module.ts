import { Routes } from '@angular/router';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { RaiseRequestsComponent } from './raise-requests/raise-requests.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserLandingComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'projectsearch', component: ProjectSearchComponent },
      { path: 'raiserequests', component: RaiseRequestsComponent }
    ]
  }
];
