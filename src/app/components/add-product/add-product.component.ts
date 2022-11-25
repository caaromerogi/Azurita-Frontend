import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor() {}

  sizes: string[] = [];

  ngOnInit(): void {}

  view(): void {}

  pushSize(newSize: string): void {
    if (!this.sizes.includes(newSize)) {
      this.sizes.push(newSize);
    } else {
      let index = this.sizes.findIndex((value) => value === newSize);
      this.sizes.splice(index, 1);
    }
    console.log(this.sizes);
  }
}
