import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { CartService } from 'src/app/services/cart.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SearchService } from 'src/app/services/search.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  @Output() columnsCountChange = new EventEmitter<number>();

  cols = 4;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  books: Book[] = [];
  category: string | undefined;
  booksSubscription: Subscription | undefined;
  searchQuery: string = '';

  constructor(
    private storeService: StoreService,
    private cartService: CartService,
    private firebaseService: FirebaseService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.getBooks();
    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.submitForm();
    });
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getBooks();
  }

  async getBooks(): Promise<void> {
    let booksObservable: Observable<Book[]> = this.storeService.getFirestoreData();

    if (this.category) {
      booksObservable = booksObservable.pipe(
        map((books: Book[]) => books.filter(book => book.category === this.category))
      );
    }

    this.booksSubscription = booksObservable.subscribe({
      next: (books: Book[]) => {
        this.books = books;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
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

  ngOnDestroy(): void {
    this.booksSubscription?.unsubscribe();
  }

  resetCategoryFilter(): void {
    this.category = undefined;
    this.getBooks();
  }

  handleShowCategory(category: string): void {
    this.category = category;
    this.getBooks();
  }

  async submitForm(): Promise<void> {
    if (this.searchQuery.trim() === '') {
      return;
    }

    try {
      const searchResults = await this.firebaseService.submitForm(this.searchQuery);
      this.books = searchResults;
    } catch (error) {
      console.error('Error searching books: ', error);
    }
  }
}
