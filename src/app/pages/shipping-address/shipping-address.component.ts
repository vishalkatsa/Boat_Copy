import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../../service/http.service';
import { ContextService } from '../../context.service';

@Component({
  selector: 'app-shipping-address',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.css'
})
export class ShippingAddressComponent {
  // isFormSubmited: boolean = false;
  constructor(private apiService: ApiService,private contextService: ContextService){}
  user: any;

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const localData: string | null = localStorage.getItem('userData');
    if (localData) {
      this.user = JSON.parse(localData);
    }
  }

  
  registerOBJ:any = {
    fullname:"",
    mobilenumber:"",
    pincode:"",
    state:"",
    city:"",
    fulladdress:"",
    roadnumber:""
  }

  ShippingAdsressSumbit(registerFrom:NgForm){
    // this.isFormSubmited = true;
    const isFormValid = registerFrom.form.valid;
    
    console.log(this.user._id);
    
    
    if (isFormValid && this.user._id) {
      
      this.apiService.post('shipping/createshippingaddress',{
        userId:this.user._id,
        fullname:this.registerOBJ.fullname, 
        mobilenumber:this.registerOBJ.mobilenumber,
        pincode:this.registerOBJ.pincode,
        state:this.registerOBJ.state,
        city:this.registerOBJ.city,
        fulladdress:this.registerOBJ.fulladdress,
        roadnumber:this.registerOBJ.roadnumber,
      }).subscribe((data)=>{
        if (data?.message === "savedsavedShippingAddress_200") {
          console.log("savedsavedShippingAddress_200");
          this.contextService.setAddressNew(false);
        }
        
      })
      
    }


  }
}
