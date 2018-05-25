import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Rx';
import {Product} from '../models/product';
import {HttpHeaders, HttpClient} from '@angular/common/http';

@Injectable()
export class ProductServiceService {

  constructor(private _http:HttpClient,
  	private http:Http) { }

  getProduts(): Observable<any>{
  	return this.http.get("http://laravel-api.test/api/products").map((response:Response)=> response.json());  	
  }

  registrar(token, product:Product): Observable<any>{
  	let json = JSON.stringify(product);
  	let params = "json="+json;

  	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
  								   .set('Authorization', token);
  	return this._http.post('http://laravel-api.test/api/products', params, {headers:headers});
  }
  getProdut(id): Observable<any>{
    return this._http.get('http://laravel-api.test/api/products/' + id);
  }
  update(token, product, id) :Observable<any>{
    let json = JSON.stringify(product);
    let params = "json="+ json;
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                     .set('Authorization', token);

    return this._http.put('http://laravel-api.test/api/products/' +id, params, {headers: headers});
  }
  deleteProduct(token, id) :Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
                     .set('Authorization', token);

    return this._http.delete('http://laravel-api.test/api/products/' +id, {headers: headers});
  }
}
