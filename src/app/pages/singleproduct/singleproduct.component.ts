import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../service/http.service';

@Component({
  selector: 'app-singleproduct',
  standalone: true,
  imports: [],
  templateUrl: './singleproduct.component.html',
  styleUrl: './singleproduct.component.css'
})
export class SingleproductComponent {
  constructor(private route: ActivatedRoute,private apiService: ApiService,private router:Router) {}
  singleproduct:any = {}
  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        console.log(productId);
        this.shoppingCard1_Get(productId)
      }
    });
  }
  shoppingCard1_Get(productId:any) {
    this.apiService.get(`product/getsingleproduct/${productId}`).subscribe((data) => {
      const singleproduct = data?.singleproduct;
      if (data.message === "singleproductGet_200") {
        this.singleproduct = singleproduct;
        console.log(singleproduct);
      }
    });
  };

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
}
