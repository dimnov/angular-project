import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { Book } from 'src/app/models/book.model';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() book: Book | undefined;
  @Output() addToCart = new EventEmitter();

  constructor(public firebaseService: FirebaseService) { }

  async ngOnInit(): Promise<void> {
    this.favoriteBooks = await this.firebaseService.getFavoriteBooks();
  }

  db = getFirestore();
  colRef = collection(this.db, 'books');
  favoriteBooks: Book[] = [];
  @Input() isFavorite = false;
  isFav: boolean = false;

  onAddToCart(): void {
    this.addToCart.emit(this.book);
  }

  async addToFavorites(bookId: string) {
    this.isFavorite = !this.isFavorite;
    const bookDocRef = doc(this.db, 'books', bookId);
    const isFavoritePromise = getDoc(bookDocRef).then(doc => doc.get('isFavorite'));

    isFavoritePromise.then(isFavorite => {
      const updatedIsFavorite = !isFavorite;

      updateDoc(bookDocRef, { isFavorite: updatedIsFavorite })
        .then(() => {
          if (this.book) {
            this.book.isFavorite = updatedIsFavorite;
          }
        })
        .catch(error => {
          console.error("Error updating 'isFavorite' property:", error);
        });
    });

    this.favoriteBooks = await this.firebaseService.getFavoriteBooks();
  }

  isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}