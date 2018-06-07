import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {User} from '../models/user';
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable()
export class UserServiceService {

  constructor(
  	private _http:HttpClient,
  	private http:Http
  	) { }

  registrar(token, user:User): Observable<any>{
    console.log(JSON.stringify(user));
  	let json = JSON.stringify(user);
  	let params = "json="+json;

  	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
  								   .set('Authorization', token);
  	return this._http.post('http://laravel-api.test/api/register', params, {headers:headers});
  }

  UserName(username): Observable<any>{
    return this._http.get('http://laravel-api.test/api/username/' + username);
  }

}
