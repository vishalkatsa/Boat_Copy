import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/http.service';
import { ContextService } from '../../context.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shopping-cart-items',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './shopping-cart-items.component.html',
  styleUrl: './shopping-cart-items.component.css'
})
export class ShoppingCartItemsComponent implements OnInit {
  UserProduct: any[] = [];
  myArray: any[] = [];
  constructor(private apiService: ApiService,private contextService:ContextService) {
    console.log(this.UserProduct);
    
  }
 
  
  ngOnInit(): void {
    this.getaddtocadd()
  };
  getaddtocadd(){
    const userData: any = localStorage.getItem('userData');
    const data: any = JSON.parse(userData);
    const userId: any = data?._id

    this.apiService.get('addtocard/getaddtocardproduct', userId).subscribe((data) => {
      this.UserProduct = data?.userProduct
      // console.log(this.UserProduct);
    });
    this.myArray = this.contextService.getMyArray();
  }
  pulse2(item:any){
    console.log("ngOnit pulse2 2");
    this.apiService.pluseHandler(item)
  }
  minus2(item:any){
    console.log("ngOnit minus2  2");
    this.apiService.minusHandler(item)
  }

  
  // ////////////////////////    reduce ///////////////////////////


  PriceHandler(item:any){
    let productPrice = item.quantity * item.productId.price;
    console.log(typeof productPrice);
    
    
    return productPrice ; 
  } 

  //////////////////// DeleteAddToCard  ////////////////////////

  DeleteAddToCard(id:any){
    if (id) {
      this.apiService.delete(`addtocard/deleteaddtocardproduct/${id}`).subscribe((data)=>{
        if (data?.message === "deletedAddtocard_200") {
          this.getaddtocadd()
        }
      })
    }
  }
}
