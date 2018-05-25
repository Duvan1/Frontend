import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service'

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
	public food;
	public products;
	public itemsCnt = 1;
  public order = [];
  public isDisabled = true;

  constructor(private _productServiceService: ProductServiceService) {  	
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
  	this.food = {
      pizza       : {count: 1, id:2, detail: "Brick Oven Pizza", price: 15},
      donut       : {count: 3, id:3, detail: "Glazed Donut",price: 8},
      tortilla    : {count: 1, id:4, detail: "Tortilla Chips",price: 3},
      burger      : {count: 1, id:5, detail: "Burger",price: 3},
      samosa      : {count: 1, id:6, detail: "Delicious Samosas",price: 3},
      coldcoffee  : {count: 1, id:7, detail: "Cold Coffee",price: 2},
      hotcoffee   : {count: 1, id:8, detail: "Hot Coffee",price: 2},
      coke        : {count: 1, id:9, detail: "Coke",price: 2},
      dietcoke    : {count: 1, id:10, detail: "Diet Coke",price: 2},
      pepsi       : {count: 1, id:11, detail: "Pepsi",price: 2}
    };
  }

  ngOnInit() {
  	//console.log("food: "+JSON.stringify(this.food));
  }


  isEmpty(obj) {
    return Object.keys(obj).length === 0;
	}

	add(item) {
		//console.log("item: "+JSON.stringify(item));
		
    let orderedItemCnt = 1;
    var foodItem = {
      orderedItemCnt : 1,
      totalPrice : item.price,
      itemId : item.id, 
      id : this.itemsCnt,
      item : item
    };
    /*
			var tooltipsData = $.grep(tooltips, function (element, index) {
			    return (element.ProductCode == ProductCode);
			});

			this.tooltipsData = tooltips.forEach((element, index)=>{
			   return (element.ProductCode == ProductCode);
			});

			var cartItems = this.order.filter((element) => {
			   return (element.itemId == item.id);
			});
    */

      // Find if the item is already in Cart
      /*
      var cartItems = this.order.forEach(element=>{
			   return (element.itemId == item.id);
			});*/
      //var cartItems = $.grep(this.order, function(e){ return e.itemId == item.id; });
      
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

    };

    getSum() {
      var i = 0,
        sum = 0;

      for(; i < this.order.length; i++) {
        sum += parseInt(this.order[i].totalPrice, 10);
      }
      return sum;
    };

    getCantidad() {
      var i = 0,
        sum = 0;

      for(; i < this.order.length; i++) {
        sum += parseInt(this.order[i].orderedItemCnt, 10);
      }
      return sum;
    };

    addItem = function(item, index) {         
          item.orderedItemCnt = ++ item.orderedItemCnt; 
          item.totalPrice = item.item.price * item.orderedItemCnt;
    };


    subtractItem = function(item, $index)
    {
      if (item.orderedItemCnt > 1) {
          item.orderedItemCnt = -- item.orderedItemCnt; 
          item.totalPrice = item.item.price * item.orderedItemCnt;
      }
      else{
          this.isDisabled = true;
          // isDisabled = false;    
         // $("#SubstractItemBtn").prop("disabled", true);
      }
    }

    deleteItem = function(index) {
      this.order.splice(index, 1);
    };
    
    checkout = function(index) {
      alert("Order total: $" + this.getSum() + "\n\n"+"Order cantidad: " + this.getCantidad() + "\n\nPayment received. Thanks.");
      console.log("ordensirijilla "+JSON.stringify(this.order));
    };
    
    clearOrder = function() {
      this.order = [];
    };

}
