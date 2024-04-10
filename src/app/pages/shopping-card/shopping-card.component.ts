import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingCartItemsComponent } from '../shopping-cart-items/shopping-cart-items.component';
import { ContextService } from '../../context.service';
import { ApiService } from '../../../service/http.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ShippingAddressComponent } from '../shipping-address/shipping-address.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderpaymentComponent } from '../orderpayment/orderpayment.component';

@Component({
  selector: 'app-shopping-card',
  standalone: true,
  imports: [
    MatIconModule,
    ShoppingCartItemsComponent,
    RouterLink,
    RouterOutlet,
    ShippingAddressComponent,
    NgFor,
    FormsModule,
    OrderpaymentComponent
  ],
  templateUrl: './shopping-card.component.html',
  styleUrl: './shopping-card.component.css',
})
export class ShoppingCardComponent implements OnInit {
  shippingAddressData: any[] = [];
  AddressOn: Boolean = false;
  AddressAndOpenPayment: Boolean = false;
  AddressNew: any;
  UserProductPrice: number = 0;
  DefaultProductPrice: number = 0;
  selectedItem: number = 0;
  userId:any ;

  changeSelectedItem() {
    // You can perform any additional logic here when the item changes
    let address = this?.shippingAddressData[this?.selectedItem]?._id
    console.log("Selected Item:" ,address, this?.shippingAddressData[this?.selectedItem]);
  }

  constructor(
    private apiService: ApiService,
    private contextService: ContextService
  ) { }

  ngOnInit(): void {
    const userData: any = localStorage.getItem('userData');
    const data: any = JSON.parse(userData);
    let userId: any = data?._id;
    this.userId = data?._id;

    ///////////////////////////////

    this.contextService.addressNew$.subscribe((newVal) => {
      this.AddressNew = newVal;
    });

    ////////////////////////////

    this.apiService
      .post('shipping/getshippingaddress', {userId})
      .subscribe((data) => {
        console.log(data);

        if (data?.message === 'gethippingAddress_200') {
          return this.shippingAddressData = data?.userAddress;
        }
      });

    /////////////////////////

    this.apiService.getUserProductPrice().subscribe((price) => {
      this.UserProductPrice = price;
      console.log(this.UserProductPrice);
    });
    this.apiService
      .get('addtocard/getaddtocardproduct', userId)
      .subscribe((data) => {
        let ProductPrice = data.userProduct.map((product: any) => {
          return product?.price;
        });

        this.DefaultProductPrice = ProductPrice.reduce(
          (acc: any, currval: any) => {
            return acc + currval;
          },
          0
        );
      });
  }

///////////////////////////////////////////////

  // paymentOn = new EventEmitter();
  nextStepAddress() {
    this.AddressOn = true;
    // this.paymentOn.emit(true);
  }
////////////  confirmAddressAndOpenPayment  ////////////

  confirmAddressAndOpenPayment(){
    this.AddressAndOpenPayment = true
  }
/////////////////////////////////////////////////////

  backtoCardHandler() {
    this.AddressOn = false;
  }
  newaddress() {
    this.contextService.setAddressNew(true);
  }

  canceladdress() {
    this.contextService.setAddressNew(false);
  }
  backtoAddressHandler(){
    this.AddressAndOpenPayment = false
  }
/////////////////////////////////////////////// PaymentConfirm /////////////////////////////////////////////////////////
  PaymentConfirm(){
      console.log(this.userId);
      let userId = this.userId
      this.apiService.post('order/createorderproduct', {userId}).subscribe((data) => {
        console.log(data);

        if (data?.message === 'savedOrder_200') {
          
        }
      });
  }
}
