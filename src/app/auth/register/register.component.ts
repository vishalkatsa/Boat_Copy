import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../../service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  _Router = inject(Router);
  constructor(private apiService: ApiService) {}
  isFormSubmited: boolean = false;

  registerOBJ: any = {
    firstname: "",
    lastname:"",
    number:"",
    email:"",
    password:"",
  };
  RegisterHandler(registerForm:NgForm){
    this.isFormSubmited = true
    const isFormValid = registerForm.form.valid;
 
    
    if (isFormValid) {
      this.registerData()
      console.log(isFormValid);
    }
  }
  registerData(){
    const formData = this.registerOBJ;
    this.apiService.post('auth_user/createuser', formData).subscribe(data => {
      console.log(data.message);
      
      if (data.message === "userCreated_200") {
        this._Router.navigate(['/'])
      }else if (data === "user_already_201") {
        
      }
    });
  }
}
