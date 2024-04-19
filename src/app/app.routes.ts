import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { protectGardGuard } from './auth/protect-gard.guard';
import { LoginComponent } from './auth/login/login.component';
import { ShoppingCardComponent } from './pages/shopping-card/shopping-card.component';
import { AccountComponent } from './account/account/account.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderpaymentComponent } from './pages/orderpayment/orderpayment.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SingleproductComponent } from './pages/singleproduct/singleproduct.component';

export const routes: Routes = [ 
    { path: "", component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "productpage/:id", component: SingleproductComponent },
    {
        path: "account", component: AccountComponent, canActivate: [protectGardGuard], children: [
            { path: "viewcart", component: ShoppingCardComponent },
            { path: "profile", component: ProfileComponent },
            { path: "order", component: OrdersComponent },

        ]
    },
  

];
