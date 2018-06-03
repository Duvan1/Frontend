import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class EmpleadoServiceService {

  constructor(private http:Http) { }

  getEmpleados(){
  	return this.http.get('http://laravel-api.test/api/empleado/').map((response:Response)=> response.json());
  }

}
