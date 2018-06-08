import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {Venta} from '../models/venta';
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable()
export class VentaServiceService {

  constructor(
  	private _http:HttpClient,
  	private http:Http) { }

  registrar(token, venta:Venta): Observable<any>{
  	let json = JSON.stringify(venta);
  	let params = "json="+json;

  	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
  								   .set('Authorization', token);
  	return this._http.post('http://laravel-api.test/api/venta', params, {headers:headers});
  }

  getVentas(): Observable<any>{
    return this.http.get("http://laravel-api.test/api/venta").map((response:Response)=> response.json());    
  }

}
