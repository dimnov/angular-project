import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });
  public cartItemsQuantitySubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private _snackBar: MatSnackBar) { }

  get cartItemsQuantity(): BehaviorSubject<number> {
    return this.cartItemsQuantitySubject;
  }

  private updateCartItemsQuantity() {
    const totalQuantity = this.cart.value.items.reduce((total, item) => total + item.quantity, 0);
    this.cartItemsQuantitySubject.next(totalQuantity);
  }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    // if the item is found it push it to the "items" and add +1 to the cart badge
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    //a message is been shown (snackBar) and it's on the screen for 3 seconds
    this.cart.next({ items: items });
    this.updateCartItemsQuantity();
    this._snackBar.open('1 item added to cart.', 'Okay', { duration: 3000 });
  }

  removeQuantity(item: CartItem): void {
    let itemForRemove: CartItem | undefined;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;

        if (_item.quantity === 0) {
          itemForRemove = _item;
        }
      }
      return _item;
    });

    if (itemForRemove) {
      filteredItems = this.removeFromCart(itemForRemove, false);
    }

    this.cart.next({ items: filteredItems });
    this.updateCartItemsQuantity();
    this._snackBar.open('1 item was removed from the cart.', 'Okay', { duration: 3000 });
  }

  getTotal(items: CartItem[]): number {
    return items.map((item) => item.price * item.quantity).reduce((prev, curr) => prev + curr, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this.cartItemsQuantitySubject.next(0);
    this._snackBar.open('Cart is cleared.', 'Okay', { duration: 3000 });
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter((_item) => _item.id !== item.id);

    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item was removed from the cart.', 'Okay', { duration: 3000 });
    }
    return filteredItems;
  }
}
