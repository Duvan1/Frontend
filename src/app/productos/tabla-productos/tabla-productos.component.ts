import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service'
import {Observable} from 'rxjs/Rx';
import { Product } from '../../models/product';
import {Http} from "@angular/http";

@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent implements OnInit {
	
  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "email";
  public sortOrder = "asc";

  constructor(private productServiceService: ProductServiceService) { }

  ngOnInit(): void {
    this.productServiceService.getProduts()
      .subscribe((data)=> {
        setTimeout(()=> {
          this.data = data;
        }, 2000);
      });
  }

}
