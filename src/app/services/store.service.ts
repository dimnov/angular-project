import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(private firebaseService: FirebaseService) { }

  getAllItems(): Observable<Book[]> {
    return from(this.firebaseService.getAllItems());
  }

  getUniqueCategories(): Observable<string[]> {
    return this.getAllItems().pipe(
      map((response: Array<any>) => {
        const uniqueCategories = new Set<string>();

        response.forEach(item => {
          uniqueCategories.add(item.category);
        });

        return Array.from(uniqueCategories);
      })
    );
  }

  getFirestoreData(): Observable<Book[]> {
    return from(this.firebaseService.getFirestoreData());
  }
}