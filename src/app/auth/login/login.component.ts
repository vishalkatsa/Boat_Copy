import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../../service/http.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  _Router = inject(Router)

  constructor(private apiService:ApiService){}
  isFormSubmit:boolean = false;

  loginOBJ:any = {
    email:'',
    password:'',
  }
  loginHandler(loginFrom:NgForm){
    this.isFormSubmit = true;
    const isFromVAlid = loginFrom.form.valid;
    if (isFromVAlid) {
      // alert("ok_200" + JSON.stringify(this.loginOBJ))
      this.loginPostHandler()
    }else{
      alert("not_ok 500")
    }
  }
  loginPostHandler(){
    try {
      const loginData = this.loginOBJ;
      console.log(loginData);
      
      this.apiService.post('auth_user/loginuser',loginData).subscribe(data=>{
        const message = data?.message;
        const token = data?.token;
        const userDatamy = data?.userData;
        const userData = JSON.stringify(userDatamy);
        if (token) {
          localStorage.setItem('token',token),
          localStorage.setItem('userData',userData)
        }
        if (message === "loginSucces_200") {
          setTimeout(() => {
            this._Router.navigate(['/account/viewcart'])
          }, 2000);
        }
  
        console.log(message,token,userData)
      })
    } catch (error) {
      console.log(error)
    }
  }
}
