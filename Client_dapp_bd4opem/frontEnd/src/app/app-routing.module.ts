import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { FirstRouteComponent } from './components/first-route/first-route.component';
import { LoginComponent } from './components/login/login.component';
import { CalculateComponent } from './components/calculate/calculate.component';
import { ReadComponent } from './components/read/read.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'service', component:FirstRouteComponent },
  { path: 'login', component: LoginComponent },
  { path: 'calculate', component: CalculateComponent },
  { path: 'read', component: ReadComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
  // { path: 'text', component:Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
