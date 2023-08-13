import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from '../../services/authentication.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Book } from 'src/app/models/book.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isSearchBarVisible = false;
  @Input() searchQuery: string = '';
  books: Book[] = [];

  constructor(public cartService: CartService, public authService: AuthenticationService,
    private firebaseService: FirebaseService, private searchService: SearchService) { }

  toggleSearchBar() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }
  submitForm(searchQuery: string) {
    this.searchService.updateSearchQuery(searchQuery);
    this.searchQuery = '';
  }
}
