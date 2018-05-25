import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { ProductServiceService } from '../../services/product-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../models/product';


@Component({
  selector: 'app-reg-productos',
  templateUrl: './reg-productos.component.html',
  styleUrls: ['./reg-productos.component.css']
})
export class RegProductosComponent implements OnInit {

	public identify;
	public token;
	public product: Product;
  public status: string;

  constructor(
  	private _authServiceService: AuthServiceService,
  	private activatedRoute:ActivatedRoute,
  	private router:Router,
  	private _productServiceService:ProductServiceService ) {

  	this.identify = _authServiceService.getIdentify();
  	//this.product.Empleado_cedula = this.identify.sub;
  	this.token = _authServiceService.getToken();
  }

  ngOnInit() {
  	if (this.identify == null) {
  		this.router.navigate(['/login']);
  	}else{
  		this.product = new Product(100, this.identify.sub,'','',1,1,1,'');
  	}
  }

  onSubmit(form){
  	console.log(this.product);
  	console.log(this.token);
  	//console.log(this.identify);
  	this._productServiceService.registrar(this.token, this.product).subscribe(
  		response => {
  				console.log(response);
  				this.product = response.product;
          this.status = "success";
          this.router.navigate(['/productos']);

  		},
  		error=> {
  			console.log(<any>error);
        this.status = "error";
  		}
  		)
  }

}
