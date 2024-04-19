import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:4000/api';
  private userProductPrice: number = 0;


  private userProductPriceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  userProductPrice$: Observable<number> = this.userProductPriceSubject.asObservable();

  constructor(private http: HttpClient,) { }

  getUserProductPrice(): Observable<number> {
    return this.userProductPrice$;
  }

  pluseHandler(item: any) {
    let quantitymy = item.quantity++;
    let pulsePrice = item?.productId?.price * (quantitymy + 1);

    try {
      this.patch('addtocard/updateproductquantity', { quantity: (quantitymy + 1), _id: item._id }).subscribe((data) => {
        if (data.message === "updatedquantity_201") {
          // alert("updated quantity")
        }
      });
    } catch (error) {
      console.log(error);
    }
    this.calculateUserProductPrice()
  }
  minusHandler(item: any) {
    let quantitymy = item.quantity--;
    let minusPrice = item?.productId?.price * (quantitymy - 1) ;
  
    
    try {
      this.patch('addtocard/updateproductquantity', { quantity:(quantitymy - 1),_id:item._id}).subscribe((data) => {
        
        
        if (data.message === "updatedquantity_201") {
          // alert("updated quantity")
        }
      });
    } catch (error) {
      console.log(error);
    }
    this.calculateUserProductPrice()
  }
 
  calculateUserProductPrice() {
    const userData: any = localStorage.getItem('userData');
    const data: any = JSON.parse(userData);
    const userId: any = data?._id;

    this.get('addtocard/getaddtocardproduct', userId).subscribe((data) => {     
      let ProductPrice = data.userProduct.map((product: any) => {
        return product?.price;
      });
      
      this.userProductPrice = ProductPrice.reduce((acc: any, currval: any) => {
        return acc + currval;
      }, 0);
      
      this.userProductPriceSubject.next(this.userProductPrice);

      console.log(this.userProductPrice);
    });
  }
 

  // GET request
  get(endpoint: string, id?: string): Observable<any> {
    const url = id ? `${this.baseUrl}/${endpoint}/${id}` : `${this.baseUrl}/${endpoint}`;
    return this.http.get(url);
  }

  // POST request
  post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, data);
  }

  // DELETE request
  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`);
  }

  // PATCH request
  patch(endpoint: string, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${endpoint}`, data);
  }
}
