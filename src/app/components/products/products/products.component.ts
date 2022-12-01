import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authority } from 'src/app/models/Autorities';
import { Product } from 'src/app/models/Product';
import { HttpRequestsService } from 'src/app/services/http/http-requests.service';
import { RetrieveImgService } from 'src/app/services/retrieveImg/retrieve-img.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private router: Router,
    private httpClient: HttpRequestsService,
    private imgService: RetrieveImgService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.isLoggedAndAdmin();
  }

  imgMap: Map<string, string> = new Map();

  authorities?: Authority[];
  isAdmin: boolean = false;
  products?: Product[] = [];

  async getAllProducts() {
    this.httpClient.getAllProducts().subscribe({
      next: (productsResult) => {
        productsResult.forEach((product) => {
          this.imgMap.set(product.productId, product.imgPath);
          this.imgService
            .retrieveImg(product.imgPath)
            .then((url) => (product.imgPath = url as string))
            .catch((err) => console.error(err));
          this.products?.push(product);
        });
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

  deleteProduct(id: string, imgPath: string): void {
    let token = window.localStorage.getItem('token')!;
    this.httpClient.deleteProduct(parseInt(id), token).subscribe({
      next: (data) => {
        this.imgService
          .deleteImg(imgPath)
          .then((data) =>
            console.log('Product ' + id + ' deleted successfully')
          )
          .catch((err) => console.error(err));
        location.reload();
      },
      error: (err) => console.error(err),
    });
  }
}
