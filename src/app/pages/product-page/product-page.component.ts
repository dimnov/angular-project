import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { StoreService } from 'src/app/services/store.service';
import { CartService } from 'src/app/services/cart.service';

import { getFirestore, getDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../environments/environment';

initializeApp(environment.firebaseConfig);

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  book: Book | undefined;

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private cartService: CartService,
  ) { }

  db = getFirestore();
  colRef = collection(this.db, 'books');
  books: any[] = [];
  isFav: boolean = false;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const bookId = params['id'];
      this.storeService.getFirestoreData().subscribe((books: Book[]) => {
        this.book = books.find(book => book.id === bookId);
      });
    });
  }

  onAddToCart(book: Book): void {
    this.cartService.addToCart({
      product: book.image,
      name: book.name,
      price: book.price,
      quantity: 1,
      id: book.id,
    });
  }

  addToFavorites(bookId: string) {
    const bookDocRef = doc(this.db, 'books', bookId);

    // Fetch the current isFavorite value from the Firestore document
    const isFavoritePromise = getDoc(bookDocRef).then(doc => doc.get('isFavorite'));

    // Update the isFavorite property based on the current value
    isFavoritePromise.then(isFavorite => {
      const updatedIsFavorite = !isFavorite;

      updateDoc(bookDocRef, { isFavorite: updatedIsFavorite })
        .then(() => {
          // Update the local book object's isFavorite property
          if (this.book) {
            this.book.isFavorite = updatedIsFavorite;
          }
        })
        .catch(error => {
          console.error("Error updating 'isFavorite' property:", error);
        });
    });

    this.isFav = !this.isFav
  }

  isFavorite() {
    return (this.isFav = !this.isFav);
  }
}
