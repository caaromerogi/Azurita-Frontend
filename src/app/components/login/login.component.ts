import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
  Router,
} from '@angular/router';
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
    private route: ActivatedRoute,
    private httpClient: HttpRequestsService
  ) {}

  params: Params = this.route.snapshot.queryParams;

  ngOnInit(): void {}

  login(): void {
    this.loginUser.email = this.email;
    this.loginUser.password = this.password;

    this.httpClient.loginMethod(this.loginUser).subscribe({
      next: (tokenBody) => {
        window.localStorage.setItem('token', tokenBody.token);
        window.localStorage.setItem('customerId', tokenBody.customerId);
        window.localStorage.setItem(
          'authorities',
          JSON.stringify(tokenBody.authorities)
        );

        console.log(this.params);

        if (this.params['redirectURL']) {
          this.router
            .navigateByUrl(this.params['redirectURL'])
            .catch(() => this.router.navigate(['index']))
            .then(() => window.location.reload());
        } else {
          this.router.navigate(['index']).then(() => window.location.reload());
        }
      },
      error: (err: Error) => {
        alert(err.error.message);
      },
    });
  }
}
