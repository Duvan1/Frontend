import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ProductServiceService {

  constructor(private http:Http) { }

  getProduts() {
  	return this.http.get("http://localhost:8000/api/courses/").map((response:Response)=> response.json());
  	
  }

}
