import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ProductosComponent } from './productos/productos.component';


const routes: Routes = [
	{path: '', component: DashboardComponent},
  	{path: 'login', component: LoginComponent},
  	{path: 'empleados', component: EmpleadosComponent},
  	{path: 'productos', component: ProductosComponent},
  	{path: '**', component: NotfoundpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
