import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartResponse } from 'src/app/models/CartResponse';
import { Order } from 'src/app/models/Order';
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
  address: string = '';
  municipality: string = '';
  date: string = '';
  items?: CartResponse[];
  total: number = 0;
  order: Order = {
    date: '',
    municipality: '',
    customerId: '',
    address: '',
  };
  token: string = window.localStorage.getItem('token') as string;
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

  confirmOrder(): void {
    let initialDate = Date.now();
    let parseDate = formatDate(
      initialDate,
      'dd-MM-yyyy hh:mm:ss a',
      'en-US',
      '-0500'
    );

    this.order.address = this!.address;
    this.order.customerId = window.localStorage.getItem('customerId') as string;
    this.order.date = parseDate;
    this.order.municipality = this!.municipality;

    this.httpClient.createOrder(this.token, this.order!).subscribe({
      next: (data) => {
        console.log(data);
        alert('Su pedido se ha concretado exitosamente');
        this.router.navigateByUrl('/index');
      },
      error: (err) => console.error(err),
    });
  }
}
