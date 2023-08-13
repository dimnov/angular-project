import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserCredential } from '@firebase/auth-types';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAuthStateInitialized = false;

  public isAuthenticated(): boolean {
    return this.authenticatedSubject.value;
  }

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.initAuthState();
  }

  private async initAuthState(): Promise<void> {
    this.auth.onAuthStateChanged(user => {
      const isAuthenticated = !!user;
      this.authenticatedSubject.next(isAuthenticated);
      localStorage.setItem('isAuthenticated', isAuthenticated.toString());

      if (!this.isAuthStateInitialized) {
        this.isAuthStateInitialized = true;
      }
    });
  }

  async login(email: string, password: string) {
    try {
      const userCredential: UserCredential = await this.auth.signInWithEmailAndPassword(email, password);
      if (userCredential) {
        this.authenticatedSubject.next(true);
      }
    } catch (error) {
      throw error;
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const userCredential: UserCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      if (userCredential.user) {
        this.authenticatedSubject.next(true);
        this.router.navigateByUrl('/profile');
      }
    } catch (err) {
      throw err;
    }
  }

  async logout() {
    try {
      await this.auth.signOut();
      this.authenticatedSubject.next(false);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
