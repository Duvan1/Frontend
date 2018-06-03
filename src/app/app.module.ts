import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule} from "angular2-datatable";
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { ProductServiceService } from './services/product-service.service';
import { EmpleadoServiceService } from './services/empleado-service.service';
import { AuthServiceService } from './services/auth-service.service';
import { VentaServiceService } from './services/venta-service.service';
import { DetallesVentaServiceService } from './services/detalles-venta-service.service';
import { ClienteServiceService } from './services/cliente-service.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { TablaEmpleadosComponent } from './empleados/tabla-empleados/tabla-empleados.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { ProductosComponent } from './productos/productos.component';
import { RegProductosComponent } from './productos/reg-productos/reg-productos.component';
import { ActProductosComponent } from './productos/act-productos/act-productos.component';
import { TablaProductosComponent } from './productos/tabla-productos/tabla-productos.component';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { ChartEmpleadosComponent } from './empleados/chart-empleados/chart-empleados.component';
import { RegEmpleadosComponent } from './empleados/reg-empleados/reg-empleados.component';
import { ActEmpleadosComponent } from './empleados/act-empleados/act-empleados.component';
import { EmpleadoFilterPipe } from './pipes/empleado-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { VentasComponent } from './ventas/ventas.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    EmpleadosComponent,
    TablaEmpleadosComponent,
    NotfoundpageComponent,
    ProductosComponent,
    RegProductosComponent,
    ActProductosComponent,
    TablaProductosComponent,
    DataFilterPipe,
    ChartEmpleadosComponent,
    RegEmpleadosComponent,
    ActEmpleadosComponent,
    EmpleadoFilterPipe,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [ProductServiceService, EmpleadoServiceService, AuthServiceService, ClienteServiceService, VentaServiceService, DetallesVentaServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
