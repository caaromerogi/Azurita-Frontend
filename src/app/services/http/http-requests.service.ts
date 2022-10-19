import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser } from 'src/app/models/NewUser';
import { Message } from 'src/app/models/Message';
import { Login } from 'src/app/models/Login';
import { Jwt } from 'src/app/models/Jwt';
import { Product } from 'src/app/models/Product';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  constructor(private httpClient: HttpClient) {}

  host: string = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  signUpMethod(command: NewUser): Observable<Message> {
    return this.httpClient.post<Message>(
      this.host + '/auth/customerRegister',
      command,
      this.httpOptions
    );
  }

  loginMethod(command: Login): Observable<Jwt> {
    return this.httpClient.post<Jwt>(
      this.host + '/auth/login',
      command,
      this.httpOptions
    );
  }

  getAllProducts(): Observable<Product> {
    return this.httpClient.get<Product>(this.host + '/get/getAllProducts');
  }
}
