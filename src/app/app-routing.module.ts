import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ProductosComponent } from './productos/productos.component';
import { RegProductosComponent } from './productos/reg-productos/reg-productos.component';
import { ActProductosComponent } from './productos/act-productos/act-productos.component';
import { VentasComponent } from './ventas/ventas.component';


const routes: Routes = [
	{path: '', component: DashboardComponent},
  	{path: 'login', component: LoginComponent},
  	{path: 'logout/:sure', component: LoginComponent},
  	{path: 'empleados', component: EmpleadosComponent},
  	{path: 'productos', component: ProductosComponent},
  	{path: 'registrar-productos', component: RegProductosComponent},
    {path: 'reg-ventas', component: VentasComponent},
  	{path: 'actualizar-productos/:id', component: ActProductosComponent},
  	{path: '**', component: NotfoundpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
