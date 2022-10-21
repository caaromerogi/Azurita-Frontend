import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { HttpRequestsService } from 'src/app/services/http/http-requests.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private router: Router,
    private httpClient: HttpRequestsService
  ) {}

  products?: Product[];
  ngOnInit(): void {
    this.getAllProducts();
  }

  async getAllProducts() {
    this.httpClient.getAllProducts().subscribe({
      next: (productsResult) => {
        this.products = productsResult;
      },
      error: (err) => console.log(err),
    });
  }

  goToProductDetails(id: string) {
    this.router.navigateByUrl(`products/${id}`);
  }
}
