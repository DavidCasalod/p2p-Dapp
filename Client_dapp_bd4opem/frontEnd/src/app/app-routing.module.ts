import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadComponent } from './components/read/read.component';
import { ListOfContractsComponent } from './components/list-of-contracts/list-of-contracts.component';
import { AuthGuard } from './guards/auth.guard';

// AuthGuard
const routes: Routes = [
  { path: '', pathMatch: 'full',  redirectTo: 'service'},
  // { path: 'service', component:FirstRouteComponent, canActivate: [AuthGuard]},
  // { path: 'read', component: ReadComponent ,canActivate: [AuthGuard]},
  // { path: 'test', component: ListOfContractsComponent,canActivate: [AuthGuard] },
  { path: 'read', component: ReadComponent },
  { path: 'test', component: ListOfContractsComponent},


  // { path: 'text', component:Component } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
