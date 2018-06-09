import { Component, OnInit } from '@angular/core';
import { AuthServiceService }from '../services/auth-service.service';
import { EmpleadoServiceService }from '../services/empleado-service.service';
import { ProductServiceService }from '../services/product-service.service';
import { VentaServiceService }from '../services/venta-service.service';
import { ActivatedRoute, Router } from "@angular/router/";




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public identify :any;
  public products;
  public cant_products;
  public cant_emp;
  public cant_ventas;
  public products_fechas;
  public model;
  public model1;
  public products_fechas_flat=false;
  public orden = 'desc';
  public consulta = 'day';
  public anioActual;
  public mesActual;
  public fecha = new Date();
  public hoy;
  public dia_mes_anio;
  public token;

  constructor(
    private _authServiceService: AuthServiceService,
    private _productServiceService: ProductServiceService,
    private _empleadoServiceService:EmpleadoServiceService,
    private _ventaServiceService:VentaServiceService,
    private route: ActivatedRoute,
    private router: Router) {
    //var fecha = new Date();
    this.hoy = this.fecha.getFullYear().toString()+"-"+(this.fecha.getMonth()+1).toString()+"-"+this.fecha.getDate().toString()
    this.anioActual = this.fecha.getFullYear();
    this.mesActual = (this.fecha.getMonth()+1);
    this.identify = _authServiceService.getIdentify();
    this.token = _authServiceService.getToken();   
  }

  ngOnInit() { 
    if (this.identify == null) {
      this.router.navigate(['/login']);
    }else if(this.identify.rol == 'vendedor'){
      this.router.navigate(['/reg-ventas']);
    }else if(this.identify.rol == 'analista de ventas'){
      this.router.navigate(['productos']);
    }else{
      //alert("model1: "+this.model1+" "+"model: "+this.model)
      this._ventaServiceService.getVentas().subscribe(
        data=>{
          this.cant_ventas = data.venta.length;
        });
      this._empleadoServiceService.getEmpleados().subscribe(
        data=>{
          this.cant_emp = data.empleado.length;
        }
      );
      this._productServiceService.getProduts().subscribe(
        response=>{
          this.cant_products = response.productos.length;
        }
      );
      this._productServiceService.productosMasVendidos().subscribe(
        response =>{
          this.products = response.productos;
        }
       );
    }
    
  }

  buscarFecha(){
    if (this.model && this.model1) {
      let fechaIni = JSON.stringify(this.model.year)+"-"+JSON.stringify(this.model.month)+"-"+JSON.stringify(this.model.day);
      let fechaFin = JSON.stringify(this.model1.year)+"-"+JSON.stringify(this.model1.month)+"-"+JSON.stringify(this.model1.day);
      
      this._productServiceService.topTenRangoFechas(fechaIni, fechaFin, this.orden).subscribe(
      response =>{
        this.products_fechas = response.productos;
        this.products_fechas_flat = true;
        //alert("entro")
      },error=>{
        console.log(<any>error);
      }
     );
    }
    
  }

  buscarAnioMesDia(){
    let yearMonthDay;
    if (this.consulta == 'month') {
      // code...
      yearMonthDay = this.mesActual.toString();
    }else if(this.consulta == 'year'){
      yearMonthDay = this.anioActual.toString();
    }else{
      yearMonthDay = this.hoy;
    }
    this._ventaServiceService.ganancias(this.consulta, yearMonthDay).subscribe(
      response=>{
        this.dia_mes_anio = response.ganancias;
        alert("melito ompa");
      },error=>{
        console.log(<any>error)
      }
    )    
  }


  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

}
