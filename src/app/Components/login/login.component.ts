import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/Models/LoginRequest';
import { AuthService } from 'src/app/Services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest : LoginRequest =new LoginRequest();
  username:string = '';
  password:string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {

    this.authService.login(this.loginRequest).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/transaction']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
