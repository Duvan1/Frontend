import { Component, DoCheck } from '@angular/core';
import { AuthServiceService }from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'app';
  public identify :any;

  constructor(private _authServiceService: AuthServiceService){
  	
  }

  ngDoCheck(){
  	this.identify= this._authServiceService.getIdentify();
  }
}
