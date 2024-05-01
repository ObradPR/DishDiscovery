import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  isVisibleSignUp = false;
  isVisibleSignIn = false;
  subscriptions: Subscription[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getAuthModalsStatus();

    if (this.authService.isLoggedIn()) {
      this.authService.setUserFromLS();
    }
  }

  getAuthModalsStatus() {
    this.subscriptions.push(
      this.authService
        .getSignInVisibility()
        .subscribe((status) => (this.isVisibleSignIn = status)),
      this.authService
        .getSignUpVisibility()
        .subscribe((status) => (this.isVisibleSignUp = status))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
