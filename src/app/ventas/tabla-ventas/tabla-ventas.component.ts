import { Component, OnInit } from '@angular/core';
import { VentaServiceService } from '../../services/venta-service.service';
import { EmpleadoServiceService } from '../../services/empleado-service.service';
import { ClienteServiceService } from '../../services/cliente-service.service';
import { ProductServiceService } from '../../services/product-service.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { Cliente } from '../../models/cliente';
import { Empleado } from '../../models/empleado';
import { Product } from '../../models/product';
import { Auxi } from '../../models/auxi';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-tabla-ventas',
  templateUrl: './tabla-ventas.component.html',
  styleUrls: ['./tabla-ventas.component.css']
})
export class TablaVentasComponent implements OnInit {
	public ventas;
	public total;
	public cantidad;
	public tipo_pago;
	public dias;
	public cliente = new Cliente(null, null,null,null,null);
	public empleado = new Empleado(null, null,null,null,null,null,null,null);
	public product = new Product(null, null,null,null,null,null,null,null);
	public fecha;
	public products;
  public identify;
  public token;
	p: number = 1;

  constructor(
    private router:Router,
    private _authServiceService:AuthServiceService,
  	private _ventaServiceService:VentaServiceService,
  	private _clienteServiceService:ClienteServiceService,
  	private _empleadoServiceService:EmpleadoServiceService,
  	private _productServiceService:ProductServiceService
  ) {
    this.identify = this._authServiceService.getIdentify();
    //this.product.Empleado_cedula = this.identify.sub;
    this.token = this._authServiceService.getToken();
   }

  ngOnInit() {
    if (this.identify == null) {
      this.router.navigate(['/login']);
    }else if(this.identify.rol == 'analista de ventas'){
      this.router.navigate(['productos']);
    }else{
      this._ventaServiceService.getVentas().subscribe(
      response=>{
        this.ventas = (response.venta);
      },error=>{
        console.log(<any>error);
      }
    )
    }
  	
  }

  detalles(id){
  	//console.log(JSON.stringify(this.products[0].nombre))
  	//var data = [];
  	

  	this.products = [];
  	this._ventaServiceService.detalles(id).subscribe(
  		response=>{
  			let cli_cedula;
  			let emp_cedula;
  			//console.log(response);
  			this.total = response.totales[0].total_sales;
  			this.cantidad = response.totales[0].cantidad_sales;
  			this.dias = response.detalles[0].dias;
  			this.tipo_pago = response.detalles[0].tipo_pago;
  			this.fecha = response.detalles[0].fecha;
  			this._clienteServiceService.getCliente(response.detalles[0].clientes_cedula).subscribe(
  				(data)=>{
  					this.cliente = data.cliente;
  			})
  			this._empleadoServiceService.getEmpleado(response.detalles[0].Empleado_cedula).subscribe(
  				(data)=>{
  					this.empleado = data.empleado;
  				});

  			for(var i in response.detalles){
  				let total = response.detalles[i].total;
  				let cantidad = response.detalles[i].cantidad;
  				this._productServiceService.getProdut(response.detalles[i].producto_id).subscribe(
					(data)=>{
						var file = {"nombre": data.producto.nombre, "desc": data.producto.description, "cant": cantidad, "tot": total};											 
					  this.products.push(file);
					});
  			}
  			//console.log(this.products[0].nombre);
  		},error=>{
  			console.log(<any>error)
  		}
  	);
  	
  	//console.log(JSON.stringify(this.products[0].nombre));
  }

}
