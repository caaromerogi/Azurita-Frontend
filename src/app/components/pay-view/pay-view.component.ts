import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartResponse } from 'src/app/models/CartResponse';
import { HttpRequestsService } from 'src/app/services/http/http-requests.service';

@Component({
  selector: 'app-pay-view',
  templateUrl: './pay-view.component.html',
  styleUrls: ['./pay-view.component.css'],
})
export class PayViewComponent implements OnInit {
  constructor(
    private router: Router,
    private httpClient: HttpRequestsService
  ) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  items?: CartResponse[];
  total: number = 0;
  async getCartItems() {
    let token = window.localStorage.getItem('token') as string;
    let customerId = window.localStorage.getItem('customerId') as string;
    this.httpClient.getUserCart(token, customerId).subscribe({
      next: (cartElements) => {
        this.items = cartElements;
        this.calculateTotal();
      },
      error: (err) => console.log(err),
    });
  }

  calculateTotal(): void {
    this.total = this.items?.reduce(
      (item, value) => item + value.quantity * value.price,
      0
    ) as number;
  }
}
