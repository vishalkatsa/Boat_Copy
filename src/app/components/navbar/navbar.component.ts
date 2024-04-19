import { Component, OnInit, inject } from '@angular/core';
import { ContextService } from '../../context.service';
import { MatIconModule } from '@angular/material/icon';
import { ShoppingCartItemsComponent } from '../../pages/shopping-cart-items/shopping-cart-items.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, RouterLink, ShoppingCartItemsComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  toggle: boolean = false;


  _Router = inject(Router)
  
  // constructor(private contextService: ContextService) { }

  // ngOnInit(): void {
  //   this.contextService.currntvalue.subscribe(data => {
  //     this.toggle = data;
  //   });
  // }
  togglePerson:any = undefined;
  onclickPerson(){
    const token: any = localStorage.getItem('token');
    
    if (token) {
      this.togglePerson = true;
      if (this.togglePerson) {
        this._Router.navigate(['/account/order'])
      }
    } else{
      this.togglePerson =false
    }
    
  };

  onClick() {
    this.toggle = this.toggle;
  }
}
