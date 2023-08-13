import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  //making errorMessage for later to be shown if there is error
  errorMessage!: string | null;

  constructor(private authService: AuthenticationService, private router: Router) { }

  async registerUser(form: NgForm) {
    if (form.valid) {
      try {
        // getting the email and the password
        const email = form.value.email;
        const password = form.value.password;

        // We are giving the data from the form to the AuthenticationService and navigation if it's ok
        await this.authService.register(email, password);
        localStorage.setItem('isAuthenticated', 'true');
        this.router.navigateByUrl('/');
      } catch (error: any) {
        //Getting the error to show it to the user
        this.errorMessage = this.getErrorMessage(error);
      }
    }
  }

  //function to show there is error with the email or password (if the first validation is not working for some reason)
  getErrorMessage(error: any): string {
    if (error.code === 'auth/invalid-email') {
      return 'There is error with your email, please try again.';
    } else if (error.code === 'auth/weak-password') {
      return 'The password is too weak. It should be at least 6 characters long.';
    } else if (error.code === 'auth/email-already-in-use') {
      return 'This email has already been registered.';
    } else {
      return 'An error occurred during registration. Please try again later.';
    }
  }
}
