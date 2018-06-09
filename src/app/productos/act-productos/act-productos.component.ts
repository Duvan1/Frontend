import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { ProductServiceService } from '../../services/product-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../models/product';
@Component({
  selector: 'app-act-productos',
  templateUrl: '../reg-productos/reg-productos.component.html',
  styleUrls: ['./act-productos.component.css']
})
export class ActProductosComponent implements OnInit {
	public product: Product;
	public identify;
	public token;
	public status_product;

  constructor(
  	private _ProductServiceService: ProductServiceService,
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _AuthService: AuthServiceService,
  	) { 
  		this.token = this._AuthService.getToken();
      this.identify= this._AuthService.getIdentify();
  }

  ngOnInit() {
    if (this.identify == null) {
      this._router.navigate(['/login']);
    }else if(this.identify.rol == 'vendedor'){
      this._router.navigate(['/reg-ventas']);
    }else{    
  		this._route.params.subscribe(params =>{
  		let id =+params['id'];
  		this.getProduct(id); 	  
      })
    	this.product = new Product(100, 'this.identify.sub','','',1,1,1,'');
    }
  }
  getProduct(id){
 		this._ProductServiceService.getProdut(id).subscribe(
  			response=>{
  				if(response.status=='success'){
  					this.product = response.producto;
  				}else{
  					this._router.navigate['productos'];
  				}

  			},
  			error=>{
  				console.log(<any>error);
  			}
  		);
  	
  }
  onSubmit(form){
  	console.log(this.product.id);
  	this._ProductServiceService.update(this.token, this.product, this.product.id).subscribe(
  		response=>{
  			if(response.status =='success'){
  				this.status_product = 'success';
  				this.product = response.product;
  				this._router.navigate(['/productos']);
  			}
  			console.log(response);
  		},
  		error =>{
  			console.log(<any>error);
  		}
  	);
  }

}
