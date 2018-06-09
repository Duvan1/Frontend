import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  public identify;
  public token;

  constructor(private router:Router,
    private _authServiceService: AuthServiceService) { 
    this.identify = _authServiceService.getIdentify();
    //this.product.Empleado_cedula = this.identify.sub;
    this.token = _authServiceService.getToken();
  }

  ngOnInit() {
    if (this.identify == null) {
      this.router.navigate(['/login']);
    }else if(this.identify.rol == 'vendedor'){
      this.router.navigate(['/reg-ventas']);
    }else if(this.identify.rol == 'analista de ventas'){
      this.router.navigate(['productos']);
    }
  }

  // lineChart
  public lineChartData:Array<any> = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType:string = 'line';
 
 
  public randomizeType():void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  }
 
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
