import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authority } from 'src/app/models/Autorities';
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

  authorities?: Authority[];
  isAdmin: boolean = false;
  products?: Product[];
  ngOnInit(): void {
    this.getAllProducts();
    this.isLoggedAndAdmin();
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

  isLoggedAndAdmin(): void {
    if (window.localStorage.getItem('authorities')) {
      this.authorities = JSON.parse(
        window.localStorage.getItem('authorities')!
      );
      this.authorities?.forEach((item) => {
        if (item.authority === 'ROLE_ADMIN') {
          this.isAdmin = true;
        }
      });
    }
  }

  deleteProduct(id: string): void {
    let token = window.localStorage.getItem('token')!;
    this.httpClient.deleteProduct(parseInt(id), token).subscribe({
      next: (data) => {
        location.reload();
      },
      error: (err) => console.error(err),
    });
  }
}
