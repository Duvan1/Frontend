import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthServiceService {
	public identify;
	public token;

  constructor(private http: HttpClient) { }

  signup(user, gettoken = null): Observable<any>{
    console.log('lo que trae: '+gettoken);
  	if (gettoken != null) {
  		user.gettoken = 'true';
  		console.log('entro al token');
  	}
  	let json = JSON.stringify(user);
  	let params = 'json='+json;
  	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');

  	return this.http.post('http://laravel-api.test/api/login', params, {headers: headers});
  }

  getToken(){
    //console.log((localStorage.getItem("token")));
  	let token = localStorage.getItem("token")//"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEyMywidXNlcm5hbWUiOiJQZWxsaSIsInBhc3N3b3JkIjoiZGUwNGQ1OGRjNWNjYzRiOTY3MWMzNjI3ZmI4ZDYyNmZlNGExNTgxMGJjMWZlM2U3MjRmZWVhNzYxOTY1ZmI3MSIsInJvbCI6ImFkbWluaXN0cmFkb3IiLCJpYXQiOjE1Mjg1NTMzMDAsImV4cCI6MTUyOTE1ODEwMH0.OwNN1r9eyb7ZUUrTagCVNGt6-cq1F_2mXq1mWfukFVI"
  	if (token != "undefined") {
  		 this.token = token;
  	}else{
  		this.token = null;
  	}
  	return this.token;

  }

  getIdentify(){
  	let identify = JSON.parse(localStorage.getItem("identify"));
  	if (identify != "undefined") {
  		 this.identify = identify;
  	}else{
  		this.identify = null;
  	}
  	return this.identify;
  }

}
