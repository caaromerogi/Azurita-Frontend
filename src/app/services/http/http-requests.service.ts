import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewUser } from 'src/app/models/NewUser';
import { Message } from 'src/app/models/Message';

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
}
