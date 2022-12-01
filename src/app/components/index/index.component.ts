import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { HttpRequestsService } from 'src/app/services/http/http-requests.service';
import { RetrieveImgService } from 'src/app/services/retrieveImg/retrieve-img.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  constructor(
    private router: Router,
    private httpClient: HttpRequestsService,
    private imgService: RetrieveImgService
  ) {}

  products: Product[] = [];
  productsToShow: Product[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  async getAllProducts() {
    this.httpClient.getAllProducts().subscribe({
      next: (productsResult) => {
        productsResult.forEach((product) => {
          {
            this.imgService
              .retrieveImg(product.imgPath)
              .then((url) => (product.imgPath = url as string))
              .catch((err) => console.error(err));
            this.products?.push(product);
          }
        });
        this.showProductsIndex();
      },
      error: (err) => console.log(err),
    });
  }

  showProductsIndex() {
    if (this.products.length < 4) {
      this.productsToShow = this.products;
    }
    if (this.products.length >= 4) {
      let randomProduct1 = Math.floor(Math.random() * this.products.length);
      let randomProduct2 = Math.floor(Math.random() * this.products.length);
      let randomProduct3 = Math.floor(Math.random() * this.products.length);

      while (
        randomProduct2 == randomProduct1 ||
        randomProduct2 == randomProduct3
      ) {
        randomProduct2 = Math.floor(Math.random() * this.products.length);
      }

      while (
        randomProduct3 == randomProduct2 ||
        randomProduct3 == randomProduct1
      ) {
        randomProduct3 = Math.floor(Math.random() * this.products.length);
      }

      this.productsToShow.push(this.products[randomProduct1]);
      this.productsToShow.push(this.products[randomProduct2]);
      this.productsToShow.push(this.products[randomProduct3]);
    }
  }

  goToProductDetails(id: string) {
    this.router.navigateByUrl(`products/${id}`);
  }
}
