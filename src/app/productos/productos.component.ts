import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
	public identify;
	public token;

  constructor(private router:Router,
  	private _authServiceService: AuthServiceService) { 
  	this.identify = _authServiceService.getIdentify();
  	this.token = _authServiceService.getToken();
  }

  ngOnInit() {
  	if (this.identify == null) {
      this.router.navigate(['/login']);
    }else if(this.identify.rol == 'vendedor'){
      this.router.navigate(['/reg-ventas']);
    }
  }

}
