import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Error } from 'src/app/models/Error';
import { Login } from 'src/app/models/Login';
import { HttpRequestsService } from 'src/app/services/http/http-requests.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  loginUser: Login = {
    email: '',
    password: '',
  };
  constructor(
    private router: Router,
    private httpClient: HttpRequestsService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.loginUser.email = this.email;
    this.loginUser.password = this.password;

    this.httpClient.loginMethod(this.loginUser).subscribe({
      next: (tokenBody) => {
        console.log(tokenBody);
        window.localStorage.setItem('token', tokenBody.token);
        this.router.navigateByUrl('/index');
      },
      error: (err: Error) => {
        alert(err.error.message);
      },
    });
  }
}
