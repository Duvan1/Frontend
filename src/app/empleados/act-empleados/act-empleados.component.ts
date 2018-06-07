import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { EmpleadoServiceService } from '../../services/empleado-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-act-empleados',
  templateUrl: '../reg-empleados/reg-empleados.component.html',
  styleUrls: ['./act-empleados.component.css']
})
export class ActEmpleadosComponent implements OnInit {
	public empleado: Empleado;
	public identify;
	public token;
	public status_empleado;
	public actualizar

  constructor(
  	private _empleadoServiceService: EmpleadoServiceService,
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _AuthService: AuthServiceService,
  	) {
  	this.token = this._AuthService.getToken();
  	}

  ngOnInit() {
  	this._route.params.subscribe(params =>{
			let id =+params['id'];
			this.getEmpleado(id); 
			this.actualizar = "Actualizar";
    })
    console.log(this.empleado);
  }

  getEmpleado(id){
 		this._empleadoServiceService.getEmpleado(id).subscribe(
  			response=>{
  				if(response.status=='success'){
  					this.empleado = response.empleado;
  				}else{
  					this._router.navigate['empleados'];
  				}

  			},
  			error=>{
  				console.log(<any>error);
  			}
  	);  	
  }

  onSubmit(form){
  	this._empleadoServiceService.update(this.token, this.empleado, this.empleado.cedula).subscribe(
  		response=>{
  			if(response.status =='success'){
  				this.status_empleado = 'success';
  				this.empleado = response.empleado;
  				this._router.navigate(['/empleados']);
  			}
  			console.log(response);
  		},
  		error =>{
  			console.log(<any>error);
  		}
  	);
  }

}
