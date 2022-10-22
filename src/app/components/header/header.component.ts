import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { HttpRequestsService } from 'src/app/services/http/http-requests.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {
    token: window.localStorage.getItem('token');
  }

  token: string | null = window.localStorage.getItem('token');

  logout() {
    window.localStorage.clear();
    window.location.reload();
  }

  ngOnInit(): void {}

  ngOnChange(): void {}
}
