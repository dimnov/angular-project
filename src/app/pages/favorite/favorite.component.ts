import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
})
export class FavoriteComponent implements OnInit {
  @Input() fullWidthMode = false;
  favoriteBooks: Book[] = [];
  @Output() isFavorite = new EventEmitter();
  constructor(private firebaseService: FirebaseService, private cartService: CartService) { }

  async ngOnInit(): Promise<void> {
    this.favoriteBooks = await this.firebaseService.getFavoriteBooks();
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
}