import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service'
import { Cliente } from '../models/cliente';
import { Venta } from '../models/venta';
import { DetallesVenta } from '../models/detallesventa';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { ClienteServiceService } from '../services/cliente-service.service';
import { VentaServiceService } from '../services/venta-service.service';
import { DetallesVentaServiceService } from '../services/detalles-venta-service.service';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
	public food;
	public products;
  public venta;
	public itemsCnt = 1;
  public order = [];
  public isDisabled = true;
  public fecha;
  public cliente: Cliente;
  public identify;
  public token;
  public clientExist = false;
  public cedulaBusqueda = "";
  public reg = false;
  public status;
  public seleccion = ["credito","fiado"];
  public tipo_pago;
  public seleccionDias = [30,60,90];
  public dia;

  constructor(
    private _authServiceService: AuthServiceService,
    private router:Router,
    private _productServiceService: ProductServiceService,
    private _clienteServiceService: ClienteServiceService,
    private _ventaServiceService:VentaServiceService,
    private _detallesVentaServiceService:DetallesVentaServiceService 
    ) {  	

    this.identify = _authServiceService.getIdentify();
    //this.product.Empleado_cedula = this.identify.sub;
    this.token = _authServiceService.getToken();
    

  	this.fecha = new Date();
  	//console.log("fecha: "+this.fecha);
  	_productServiceService.getProduts()
      .subscribe((data)=> {
        if (data.status == 'success') {
          // code...
          setTimeout(()=> {
          	this.products = data.productos
          console.log(this.products);
          }, 2000);
        }
        
      });
  	
  }

  ngOnInit() {
    if (this.identify == null) {
      this.router.navigate(['/login']);
    }else{
      this.cliente = new Cliente(null, '','','','');      
      //alert(this.identify.sub+" "+this.fecha);
    }
  }

  onKeydown(event) {
   
  }

  //registrar al cliente
  onSubmit(form){    
    //console.log(this.cliente.cedula);
    if (!this.reg) {
      if (this.cliente.cedula > 600000 ) {
        this._clienteServiceService.getCliente(this.cliente.cedula).subscribe(
          response => {
              console.log(response);
              this.clientExist = false;
              this.cliente = response.cliente;
              this.status = response.status;
          },
          error=> {
            console.log(<any>error);
            this.status = "error";
            console.log(JSON.stringify(this.cliente));
            this.clientExist = true;
            this.reg = true;
            //this.cliente = new Cliente(null, '','','','');
          }
        )
      }
    }else{
        console.log(this.token);
        this.reg = false;
        console.log("----------------------------------- "+JSON.stringify(this.cliente));
        this.clientExist= false;
        this._clienteServiceService.registrar(this.token, this.cliente).subscribe(
          response=>{
            
            this.cliente = response.cliente;
          },error=>{
            console.log(<any>error);
          }
        );

    }
    
    
    
  }

  getCliente(id){
     this._clienteServiceService.getCliente(id).subscribe(
        response=>{
          if(response.status=='success'){
            this.cliente = response.cliente;
          }
        },
        error=>{
          console.log(<any>error);
        }
      );
    
  }


  isEmpty(obj) {
    return Object.keys(obj).length === 0;
	}
  //añadir producto a la lista de compras
	add(item) {
    let orderedItemCnt = 1;
    var foodItem = {
      orderedItemCnt : 1,
      totalPrice : item.precio_estandar,
      itemId : item.id, 
      id : this.itemsCnt,
      item : item
    };
      
    var cartItems = this.order.filter((element) => {
  	   return (element.itemId == item.id);
  	});
    console.log("cartItems "+JSON.stringify(cartItems));

     if(cartItems.length > 0  && this.order){
        cartItems[0].orderedItemCnt = ++ cartItems[0].orderedItemCnt; 
        cartItems[0].totalPrice = item.precio_estandar * cartItems[0].orderedItemCnt;
     }
     else{
        this.order.push(foodItem);
        this.itemsCnt = this.order.length; 
     }
     localStorage.setItem("order", JSON.stringify(this.order));
     //console.log(JSON.stringify(this.order));
     
   };

    getSum() {
      var i = 0,
        sum = 0;

      for(; i < this.order.length; i++) {
        sum += parseInt(this.order[i].totalPrice);
      }
      return sum;
    };

    getCantidad() {
      var i = 0,
        sum = 0;

      for(; i < this.order.length; i++) {
        sum += parseInt(this.order[i].orderedItemCnt);
      }
      return sum;
    };

    addItem = function(item, index) {     
      console.log(JSON.stringify(item) + " "+index);
      item.orderedItemCnt = ++ item.orderedItemCnt; 
      item.totalPrice = item.item.precio_estandar * item.orderedItemCnt;
      localStorage.setItem("order", JSON.stringify(this.order));
    };


    subtractItem = function(item, $index)
    {
      if (item.orderedItemCnt > 1) {
          item.orderedItemCnt = -- item.orderedItemCnt; 
          item.totalPrice = item.item.precio_estandar * item.orderedItemCnt;
          localStorage.setItem("order", JSON.stringify(this.order));
      }
      else{
          this.isDisabled = true;
          // isDisabled = false;    
         // $("#SubstractItemBtn").prop("disabled", true);
      }
    }

    deleteItem = function(index) {
      this.order.splice(index, 1);
      localStorage.setItem("order", JSON.stringify(this.order));
    };
    
    checkout = function(index) {
      
      if (this.cliente.cedula == null || this.cliente.nombre == "" || this.cliente.apellidos == "" || this.cliente.direccion == "" || this.cliente.telefono == "") {
        alert("por favor llene todos los campos del cliente.")
      }else{              
        console.log(JSON.stringify(this.order));
        if (this.tipo_pago == "credito") {
          this.dia = 0;
        }
        this.venta = new Venta(this.cliente.cedula, this.identify.sub,/*this.fecha*/this.tipo_pago,this.dia);
        //alert(JSON.stringify(this.venta));
        
        this._ventaServiceService.registrar(this.token, this.venta).subscribe(
          response => {
            //console.log(response);
            this.detallesVenta(response.venta.id); 
          },error => {
            alert(<any>error);
          }
        );

        //this.clearOrder();
      }
      
    };

    detallesVenta = function (id) {
      //[{"orderedItemCnt":1,"totalPrice":12,"itemId":16,"id":1,"item":{"id":16,"Empleado_cedula":123,"codigo":"1","nombre":"camisetas","description":"melas","cantidad":1,"precio_estandar":12,"descuento_paquete":0,"categoria":"melita","updated_at":"2018-05-15 20:03:22","created_at":"2018-05-15 20:03:22","user":null}}]
      //console.log(localStorage.getItem("order"));
      //let ordensirijilla = [];
      let ordensirijilla = JSON.parse(localStorage.getItem("order"));

      //console.log(JSON.stringify(ordensirijilla) + " "+id);
      /*var i;
      for (i = 0; i < ordensirijilla.length; i++) { 
          console.log(ordensirijilla[i].orderedItemCnt);
      }*/
      for(var i in ordensirijilla) {
         console.log(ordensirijilla[i].orderedItemCnt+ " "+ordensirijilla[i].totalPrice);  // (o el campo que necesites)
         let detalles_venta = new DetallesVenta(id, ordensirijilla[i].itemId, ordensirijilla[i].orderedItemCnt, ordensirijilla[i].totalPrice);
         this._detallesVentaServiceService.registrar(this.token, detalles_venta).subscribe(
           response =>{
             this.clearOrder();
           }, error=>{

           }
         );
      }
    }
    
    clearOrder = function() {
      //alert("limpiando");
      this.order = [];
      this.cliente = new Cliente(null, '','','','');
      this.reg = false;
      this.clientExist= false;
      this.status = "";
    };

}
