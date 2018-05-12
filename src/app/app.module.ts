import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule} from "angular2-datatable";
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

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
    DataFilterPipe
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
