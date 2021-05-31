import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CertificateComponent} from './components/certificate/certificate.component';

const routes: Routes = [
{
	path:"dashboard",
	component:DashboardComponent
},
{
	path:"certificate",
	component:CertificateComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
