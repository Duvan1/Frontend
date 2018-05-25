import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service'
import {Observable} from 'rxjs/Rx';
import { Product } from '../../models/product';
import {Http} from "@angular/http";
import {AuthServiceService} from '../../services/auth-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent implements OnInit {
	
  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 6;
  public sortBy = "nombre";
  public sortOrder = "asc";
  public token;
  private _productService: ProductServiceService;
  


  constructor(private productServiceService: ProductServiceService, private AuthServiceService: AuthServiceService, private _router: Router) {
    this.token = this.AuthServiceService.getToken();
    this.getProducts();
   }

  ngOnInit(): void {
  }

  getProducts(){

    this.productServiceService.getProduts()
      .subscribe((data)=> {
        if (data.status == 'success') {
          // code...
          setTimeout(()=> {
          this.data = data.productos;//Array.of(data);
          console.log(data.productos);
          }, 2000);
        }
        
      });
  }
  delete(id){
    console.log(id);
    this.productServiceService.deleteProduct(this.token, id).subscribe(
      response=>{
       // this._router.navigate['productos'];
       this.getProducts();
      },
      error=>{
        console.log(<any>error);
      }
      )
  }

}
