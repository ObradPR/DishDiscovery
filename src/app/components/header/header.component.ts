import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged = false;
  subscriptions: Subscription[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.getUserEmail().subscribe((email: string | null) => {
        if (email) {
          this.isLogged = true;
        } else this.isLogged = false;
      })
    );
  }

  onOpenAuthModal(modal: string) {
    if (modal === 'sign-in') {
      this.authService.setSignInVisibility(true);
    } else if (modal === 'sign-up') {
      this.authService.setSignUpVisibility(true);
    }
  }

  onLogout(): void {
    this.router.navigate(['/']);
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
