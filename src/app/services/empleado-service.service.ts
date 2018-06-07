import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {Empleado} from '../models/empleado';
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable()
export class EmpleadoServiceService {

  constructor(private http:Http, private _http:HttpClient) { }

  getEmpleados(){
  	return this.http.get('http://laravel-api.test/api/empleado').map((response:Response)=> response.json());
  }

  getEmpleado(id): Observable<any>{
    return this._http.get('http://laravel-api.test/api/empleado/' + id);
  }

  registrar(token, empleado:Empleado): Observable<any>{
  	let json = JSON.stringify(empleado);
  	let params = "json="+json;

  	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
  								   .set('Authorization', token);
  	return this._http.post('http://laravel-api.test/api/empleado', params, {headers:headers});
  }

  update(token, empleado, cedula) :Observable<any>{
    let json = JSON.stringify(empleado);
    let params = "json="+ json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                     .set('Authorization', token);

    return this._http.put('http://laravel-api.test/api/empleado/' +cedula, params, {headers: headers});
  }

}
