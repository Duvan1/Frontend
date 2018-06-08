import { Component, OnInit } from '@angular/core';
import { EmpleadoServiceService } from '../../services/empleado-service.service'
import {Observable} from 'rxjs/Rx';
import { Product } from '../../models/product';
import {Http} from "@angular/http";

@Component({
  selector: 'app-tabla-empleados',
  templateUrl: './tabla-empleados.component.html',
  styleUrls: ['./tabla-empleados.component.css']
})
export class TablaEmpleadosComponent implements OnInit {

  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 7;
  public sortBy = "cedula";
  public sortOrder = "asc";

  //sorting
  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;
 
  constructor(
    private empleadoServiceService:EmpleadoServiceService,
    private _http: Http) { }
 
  ngOnInit(): void {
    
    /*this.data$ = this.empleadoServiceService.getEmpleados();
    console.log(this.data$);*/
    
    this.empleadoServiceService.getEmpleados()
      .subscribe((data)=> {        
          // code...
          setTimeout(()=> {
          this.data = data.empleado;//Array.of(data);
          //console.log(JSON.stringify(data.empleado));
          }, 2000);
        
        
      },error =>{
        alert("es que el servidor esta fallando!")
      });
      
  }

}
