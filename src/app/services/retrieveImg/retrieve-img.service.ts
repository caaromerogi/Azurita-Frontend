import { Injectable } from '@angular/core';
import {
  Storage,
  ref,
  listAll,
  getDownloadURL,
  list,
  deleteObject,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class RetrieveImgService {
  constructor(private storage: Storage) {}

  async retrieveImg(imgPath: string) {
    const imgRef = ref(this.storage, `images/${imgPath}`);

    let imgDownloadPath = await getDownloadURL(imgRef)
      .then((url) => {
        return url;
      })
      .catch((err) => console.error(err));
    return imgDownloadPath;
  }

  async deleteImg(imgPath: string) {
    const imgRef = ref(this.storage, `images/${imgPath}`);
    deleteObject(imgRef)
      .then(() => {})
      .catch((err) => console.error(err));
  }
}
