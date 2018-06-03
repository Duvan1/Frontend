import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {Cliente} from '../models/cliente';
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable()
export class ClienteServiceService {

  constructor(
  	private _http:HttpClient,
  	private http:Http) { }

  getClientes(){
  	return this.http.get('http://laravel-api.test/api/cliente/').map((response:Response)=> response.json());
  }

  getCliente(id): Observable<any>{
    return this._http.get('http://laravel-api.test/api/cliente/' + id);
  }

  registrar(token, cliente:Cliente): Observable<any>{
    console.log(JSON.stringify(cliente));
  	let json = JSON.stringify(cliente);
  	let params = "json="+json;

  	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
  								   .set('Authorization', token);
  	return this._http.post('http://laravel-api.test/api/cliente', params, {headers:headers});
  }

}
