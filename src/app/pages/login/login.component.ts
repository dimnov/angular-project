import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/profile.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  errorMessage!: string | null;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    // Check if the user is already logged in using local storage
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      const user: User = JSON.parse(userJSON);
      // Navigate to the profile page or another suitable page
      this.router.navigateByUrl('/profile');
    }
  }

  async loginUser(form: NgForm) {
    //Check if the form is valid and then pass the data to the function "login" in authentication.service
    if (form.valid) {
      try {
        const email = form.value.email;
        const password = form.value.password;

        // Perform the login logic using the authentication service
        await this.authService.login(email, password);
        localStorage.setItem('isAuthenticated', 'true');
        this.router.navigateByUrl('/favorite');
      } catch (error: any) {
        this.errorMessage = this.getErrorMessage(error);
      }
    }
    //END: Check if the form is valid and then pass the data to the function "login" in authentication.service
  }

  //Function that will show the error if there is one
  getErrorMessage(error: any): string {
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      return 'Your email or password is incorrect.';
    } else {
      return 'An error occurred during login. Please try again later.';
    }
  }
}