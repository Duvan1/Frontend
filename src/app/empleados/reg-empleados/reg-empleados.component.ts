import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { EmpleadoServiceService } from '../../services/empleado-service.service';
import { UserServiceService } from '../../services/user-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Empleado } from '../../models/empleado';
import { User } from '../../models/user';

@Component({
  selector: 'app-reg-empleados',
  templateUrl: './reg-empleados.component.html',
  styleUrls: ['./reg-empleados.component.css']
})
export class RegEmpleadosComponent implements OnInit {

	public regUser: any;
	public reg;
	public identify;
	public token;
	public user: User;
	public empleado: Empleado;
  public status: string;
  public retryPassword;
  public exist = false;
  public cedulaBusq;

  constructor(
  	private _authServiceService: AuthServiceService,
  	private activatedRoute:ActivatedRoute,
  	private router:Router,
  	private _empleadoServiceService:EmpleadoServiceService,
  	private _userServiceService:UserServiceService
  	) { 
  	this.regUser = "si";
  	this.reg = true;
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
  		this.empleado = new Empleado(null, null, null, "vendedor",null, null, null, true);
  		this.user = new User(null, "vendedor", null, null, null);
  	}
  }

  onSubmit(form){
  	console.log(JSON.stringify(this.empleado));
  	this._empleadoServiceService.registrar(this.token, this.empleado).subscribe(
  		response=>{
  			console.log(response);
				this.empleado = response.empleado;
        this.status = "success";
        if (this.regUser == "si") {
        	this.user.empleado_cedula = this.empleado.cedula;
        	console.log("+++++++++++++++++++++++ "+JSON.stringify(this.user));
        	this._userServiceService.registrar(this.token, this.user).subscribe(
        		response=>{
        			this.user = response.user;
        			console.log(response);
              this.router.navigate(['/empleados']);
        		},error=>{
        			console.log(<any> error);
              
        		}
        	);
        	
        }else{
        	this.router.navigate(['/empleados']);
        }        
  		}, error=>{
  			console.log(<any>error);
  		}
  	);
  }

  userNombre(value){
  	this._userServiceService.UserName(value).subscribe(
  		response=>{
  			if (response.message == "El usuario ya existe") {
  				//alert("ya existe");
  				this.exist = true;
  			}
  		},error=>{
  			//alert("no existe")
  			this.exist = false;
  		}
  	);
  }

  validarCedula(event){  
    if (event== null) {
      this.cedulaBusq = "El documento no puede estar vacio.";
    }else {
      let x = event.toString(); 
      if (x.length < 7) {
        this.cedulaBusq = "El documento es demasiado corto.";
      }else if(x.length > 10){
        this.cedulaBusq = "El documento es demasiado largo.";     
      }else{
        this.cedulaBusq = null;      
      }
    }
  }

  onChange(value){
  	if (value == "si") {
  		this.reg= true;
  	}else{
  		this.reg= false;
  	}
	}

}
