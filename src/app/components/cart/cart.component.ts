import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/CartItem';
import { CartResponse } from 'src/app/models/CartResponse';
import { HttpRequestsService } from 'src/app/services/http/http-requests.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private route: Router, private httpClient: HttpRequestsService) {}

  items?: CartResponse[];
  total: number = 0;
  ngOnInit(): void {
    this.getCartItems();
  }

  token: string = window.localStorage.getItem('token') as string;
  async getCartItems() {
    let token = window.localStorage.getItem('token') as string;
    let customerId = window.localStorage.getItem('customerId') as string;
    this.httpClient.getUserCart(token, customerId).subscribe({
      next: (cartElements) => {
        this.items = cartElements;
        this.calculateTotal();
        console.log(this.items);
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

  deleteItem(productId: string, size: string) {
    this.httpClient.deleteItemFromCart(this.token, productId, size).subscribe({
      next: (data) => {
        this.items = this.items?.filter(
          (item) => item.productId !== productId || item.size !== size
        );
        this.calculateTotal();
      },
      error: (err) => console.log(err),
    });
  }

  buy(): void {
    console.log(this.items);
  }
}
