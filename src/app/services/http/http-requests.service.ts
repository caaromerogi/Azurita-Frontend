import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser } from 'src/app/models/NewUser';
import { Message } from 'src/app/models/Message';
import { Login } from 'src/app/models/Login';
import { Jwt } from 'src/app/models/Jwt';
import { Product } from 'src/app/models/Product';
import { CartItem } from 'src/app/models/CartItem';
import { CartResponse } from 'src/app/models/CartResponse';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestsService {
  constructor(private httpClient: HttpClient) {}

  host: string = 'http://localhost:8080';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  authHeader: HttpHeaders = this.httpOptions.headers.append(
    'Authorization',
    'Bearer ' + window.localStorage.getItem('token')
  );

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

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.host + '/get/getAllProducts');
  }

  getProductById(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(
      this.host + `/get/findByProductId/${productId}`
    );
  }

  addItemToCart(command: CartItem, token: string): Observable<CartItem> {
    return this.httpClient.post<CartItem>(
      this.host + '/user/addItemToCart',
      command,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }

  getUserCart(token: string, customerId: string): Observable<CartResponse[]> {
    return this.httpClient.get<CartResponse[]>(
      this.host + `/user/getCartDetailsByCustomer/${customerId}`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }
}
