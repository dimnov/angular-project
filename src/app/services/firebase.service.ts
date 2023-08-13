import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { Book } from 'src/app/models/book.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private db = getFirestore(initializeApp(environment.firebaseConfig));

  async getFavoriteBooks(): Promise<Book[]> {
    const booksRef = collection(this.db, 'books');
    const favoriteBooksQuery = query(booksRef, where('isFavorite', '==', true));
    const querySnapshot = await getDocs(favoriteBooksQuery);
    const favoriteBooks: Book[] = [];

    querySnapshot.forEach((doc) => {
      const bookData = doc.data() as Book;
      bookData.id = doc.id;
      favoriteBooks.push(bookData);
    });
    return favoriteBooks;
  }

  async getAllItems(): Promise<Book[]> {
    const booksRef = collection(this.db, 'books');
    const querySnapshot = await getDocs(booksRef);
    const allItems: Book[] = [];

    querySnapshot.forEach((doc) => {
      const itemData = doc.data() as Book;
      itemData.id = doc.id;
      allItems.push(itemData);
    });

    return allItems;
  }

  async getFirestoreData(): Promise<Book[]> {
    const booksRef = collection(this.db, 'books');
    const querySnapshot = await getDocs(booksRef);
    const allBooks: Book[] = [];

    querySnapshot.forEach((doc) => {
      const bookData = doc.data() as Book;
      bookData.id = doc.id;
      allBooks.push(bookData);
    });

    return allBooks;
  }

  async updateFavoriteStatus(bookId: string, isFavorite: boolean): Promise<void> {
    const bookDocRef = doc(this.db, 'books', bookId);

    await updateDoc(bookDocRef, { isFavorite });
  }

  async submitForm(searchQuery: string): Promise<Book[]> {
    if (searchQuery.trim() === '') {
      return [];
    }

    const booksRef = collection(this.db, 'books');
    const searchedBooksQuery = query(booksRef, where('name', '==', searchQuery));

    const querySnapshot = await getDocs(searchedBooksQuery);
    const searchResults: Book[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Book;
      searchResults.push(data);
    });

    return searchResults;
  }
}