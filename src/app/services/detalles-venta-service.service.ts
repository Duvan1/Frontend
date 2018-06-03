import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {DetallesVenta} from '../models/detallesventa';
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable()
export class DetallesVentaServiceService {

  constructor(
  	private _http:HttpClient,
  	private http:Http) { }

  registrar(token, detalles_venta:DetallesVenta): Observable<any>{
  	let json = JSON.stringify(detalles_venta);
  	let params = "json="+json;

  	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
  								   .set('Authorization', token);
  	return this._http.post('http://laravel-api.test/api/detalles', params, {headers:headers});
  }

}
