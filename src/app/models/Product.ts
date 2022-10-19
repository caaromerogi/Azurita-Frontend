import { Size } from './Size';

export type Product = {
  productId: string;
  price: string;
  imgPath: string;
  name: string;
  sizes: Size[];
};
