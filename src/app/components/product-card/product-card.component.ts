import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { Error } from 'src/app/models/Error';
import { HttpRequestsService } from 'src/app/services/http/http-requests.service';
import { CartItem } from 'src/app/models/CartItem';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpRequestsService,
    private router: Router
  ) {}

  productId = this.activatedRoute.snapshot.paramMap.get('id') as string;
  product?: Product;
  item: CartItem = {
    productId: '',
    size: '',
    customerId: window.localStorage.getItem('customerId') as string,
    quantity: 1,
  };

  ngOnInit(): void {
    this.getProductById();
  }

  selectedSize: string = '';
  quantity: number = 1;

  async getProductById() {
    this.httpClient.getProductById(this.productId).subscribe({
      next: (item) => {
        this.product = item;
      },
      error: (err: Error) => {
        console.error(err);
        this.router.navigateByUrl('404');
      },
    });
  }

  sendItemToCart() {
    let token = window.localStorage.getItem('token') as string;
    let customerId = window.localStorage.getItem('customerId') as string;
    console.log(token);
    console.log(customerId);

    this.item.customerId = customerId;
    this.item.productId = this.productId;
    this.item.size = this.selectedSize;
    this.item.quantity = this.quantity;

    console.log(this.item);

    this.httpClient.addItemToCart(this.item, token).subscribe({
      next: (item) => console.log(item),
      error: (err) => {
        console.log(err);
        alert('Ocurrió un error');
      },
    });
  }
}
