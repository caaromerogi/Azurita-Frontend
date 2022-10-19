import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Error } from 'src/app/models/Error';
import { Message } from 'src/app/models/Message';
import { NewUser } from 'src/app/models/NewUser';
import { HttpRequestsService } from 'src/app/services/http/http-requests.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: string = '';
  lastname: string = '';
  email: string = '';
  dni: string = '';
  password: string = '';
  confirmPassword: string = '';
  newUser: NewUser = {
    name: '',
    lastName: '',
    email: '',
    dni: '',
    password: '',
  };

  constructor(
    private route: Router,
    private httpService: HttpRequestsService
  ) {}

  ngOnInit(): void {}

  signUp(): void {
    this.newUser.name = this.name;
    this.newUser.lastName = this.lastname;
    this.newUser.dni = this.dni;
    this.newUser.email = this.email;
    this.newUser.password = this.password;

    this.httpService.signUpMethod(this.newUser).subscribe({
      next: (msg) => {
        alert(msg.message);
        this.route.navigateByUrl('/index');
      },
      error: (err: Error) => {
        alert(err.error.message);
      },
    });
  }
}
