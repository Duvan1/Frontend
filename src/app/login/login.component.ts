import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public user: User;
  public token;
  public identify;
  public status: string;

  constructor(
    private _authServiceService: AuthServiceService,
    private route:ActivatedRoute,
    private router:Router
    ) { 
  	this.user = new User(1, 'ROLE_USER', '', 1, '');

  }

  ngOnInit() {
    this.logout();  
    //console.log(this._authServiceService.getIdentify());
    //console.log(this._authServiceService.getToken());  
    
  }

  onSubmit(form){
  	
  	this._authServiceService.signup(this.user).subscribe(
  		response=>{
          
          if (response.status != "error") {
            this.status = 'success';                     
            this.token = response; 
            localStorage.setItem("token", this.token);
            this._authServiceService.signup(this.user, true).subscribe(
              response=>{
                //obtengo los datos del usuario
                this.identify = response;
                localStorage.setItem("identify", JSON.stringify(this.identify));
              },
              error=>{
                console.log(<any>error);
              }
            );
            
            this.router.navigate(['/']);
          }else{
          this.status= 'error';
          }        
  		},
  		error=>{
  			console.log(<any>error);
  		}
  	);
    
    /*
    setTimeout(()=> {
      window.location.reload();
    },4000);*/
    //window.location.reload();
    //let app= new AppComponent(this._authServiceService);
  }

  logout(){  
    this.route.params.subscribe(
      params=>{
        let logout = +params['sure'];
        if(logout ==1){
          localStorage.removeItem('token');
          localStorage.removeItem('identify');

          this.identify = null;
          this.token = null;
          this.router.navigate(['login']);  
          window.location.reload();
        }
      }
     );   
  }

}
