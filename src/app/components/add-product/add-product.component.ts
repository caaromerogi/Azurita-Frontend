import { Component, OnInit } from '@angular/core';
import { Storage, ref } from '@angular/fire/storage';
import { StorageReference, uploadBytes } from 'firebase/storage';
import { NewProduct } from 'src/app/models/NewProduct';
import { HttpRequestsService } from 'src/app/services/http/http-requests.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(
    private storage: Storage,
    private httpClient: HttpRequestsService
  ) {}

  ngOnInit(): void {}

  name?: string;

  price?: number;

  sizes: string[] = [];

  url: string = 'assets/images/empty.png';

  file?: File;

  imgRef?: StorageReference;

  token: string = localStorage.getItem('token') as string;

  pushSize(newSize: string): void {
    if (!this.sizes.includes(newSize)) {
      this.sizes.push(newSize);
    } else {
      let index = this.sizes.findIndex((value) => value === newSize);
      this.sizes.splice(index, 1);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      this.file = event.target.files[0];
      this.imgRef = ref(this.storage, `images/${this.file!.name}`);
    }
  }

  createNewProduct() {
    const product: NewProduct = {
      imgPath: '',
      name: '',
      price: 0,
      sizes: [],
    };

    console.log(this.file!.name);
    product.imgPath = this.file!.name;
    product.name = this.name as string;
    product.price = this.price as number;
    product.sizes = this.sizes;

    uploadBytes(this.imgRef!, this.file!)
      .then((response) => {
        console.log(response);
        this.httpClient.createProduct(product, this.token).subscribe({
          next: (data) => {
            alert('Producto añadido satisfactoriamente');
            location.reload();
          },
          error: (err) => console.error('error en la creacion' + err),
        });
      })
      .catch((err) => console.error('error en el almacenamiento' + err));
  }
}
