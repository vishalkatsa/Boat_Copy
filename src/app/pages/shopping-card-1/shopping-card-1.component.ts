import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../service/http.service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-card-1',
  standalone: true,
  imports: [MatIconModule, NgIf, NgFor],
  templateUrl: './shopping-card-1.component.html',
  styleUrl: './shopping-card-1.component.css'
})
export class ShoppingCard1Component implements OnInit {

  constructor(private apiService: ApiService,private router: Router) { }
  
  products: any[] = [];

  shoppingCard1_Get() {
    this.apiService.get('product/getproduct').subscribe((data) => {
      const product = data?.product;
      if (product) {
        this.products = product;
        console.log(product);
      }
    });
  };
  ///////////// product save in backend ///////////////////////

  add_to_card_On_backend() {

  }
  ngOnInit(): void {
    this.shoppingCard1_Get()


  }

  ////////////////////////////////////////////////////////////

  //         add to card on user card          //

  add_to_card(item: any) {
      let productId = item?._id;
      let price = item?.price;
      console.log(productId);
      
      const userData:any = localStorage.getItem("userData");
      const userDataMy:any = JSON.parse(userData);
      const userId = userDataMy?._id
      this.apiService.post('addtocard/addtocardproduct',{productId,price,userId}).subscribe((data)=>{
        if (data?.message === "savedCard_200") {
          this.router.navigate(['/account/viewcart'])
        }
      })
  }

  navigateSinglePage(item:any){
    this.router.navigate(["/productpage",item?._id])
  }

}
