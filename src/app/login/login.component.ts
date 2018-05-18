import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	public user: User;
  public token;
  public identify;

  constructor(private _authServiceService: AuthServiceService) { 
  	this.user = new User(1, 'ROLE_USER', '', 1, '','','');

  }

  ngOnInit() {
    
  }

  onSubmit(form){
  	console.log(this.user);
  	this._authServiceService.signup(this.user).subscribe(
  		response=>{
  			//console.log(response);
        //Objeto usuario identificado
        //this.token = response; 
        //localStorage.setItem("token", this.token);
        console.log("1 "+response);
        //console.log("token re melo "+localStorage.getItem('token'))
        this._authServiceService.signup(this.user, true).subscribe(
          response=>{
            //console.log("response awsdfghbnjmhgfdsfgvbhnjm");
            //this.identify = res;
            //localStorage.setItem("identify1", JSON.stringify(this.identify));
            console.log(response);
          },
          error=>{
            console.log(<any>error);
          }
        );
  		},
  		error=>{
  			console.log(<any>error);
  		}
  	);
  }

}
