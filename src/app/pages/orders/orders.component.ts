import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../service/http.service';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, NgFor, MatIconModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  userId: any;
  CustmerAllOrder: any[] = []
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const localData: string | null = localStorage.getItem('userData');
    if (localData) {
      let user = JSON.parse(localData);
      this.userId = user?._id;
      console.log(this.userId);

      // Call the API only after setting userId
      try {
        this.apiService.get(`order/getordercustomer/${this.userId}`).subscribe((data) => {
          if (data?.message === "Getgetorder_201") {
            let allOrder = data.allOrder;
            // let datamy = allOrder.filter((item: any) => {
            //   return item.cancelStatus === false
            // })
            this.CustmerAllOrder = allOrder;
            console.log(allOrder);

          }
        });
      } catch (error) {
        console.log(error);

      }
    }
  }

  handleCancel(item: any) {
    let cancelStatus = true;
    let orderId = item?._id;
    if (orderId) {
      try {
        this.apiService.patch(`order/updateorder`, { cancelStatus, orderId }).subscribe((data) => {
          if (data?.message === "order_200_updated") {
            this.getUserData();
          }
        });
      } catch (error) {
        console.log(error);

      }
    }

  }
}
