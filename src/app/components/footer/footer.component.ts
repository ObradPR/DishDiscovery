import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AboutUsService } from '../../services/about-us.service';
import { Observable, Subscription } from 'rxjs';
import { ISiteInfoDto } from '../../common/interfaces/about-us/site-info.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit, OnDestroy {
  siteInfo$: Observable<ISiteInfoDto> | undefined;
  newsletterForm: FormGroup = this.fb.group({});
  isLogged = false;
  subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private aboutUsService: AboutUsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.getSiteInfo();

    this.subscriptions.push(
      this.authService.getUserEmail().subscribe((email: string | null) => {
        if (email) {
          this.isLogged = true;
        } else this.isLogged = false;
      })
    );
  }

  getSiteInfo() {
    this.siteInfo$ = this.aboutUsService.getSiteInfo();
  }

  formInit() {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onAddSubscription() {
    if (this.newsletterForm.invalid) return;

    console.log('Newsletter Email Sent!');
    this.newsletterForm.reset();
  }

  onOpenAuthModal(modal: string) {
    if (modal === 'sign-in') {
      this.authService.setSignInVisibility(true);
    } else if (modal === 'sign-up') {
      this.authService.setSignUpVisibility(true);
    }
  }

  onLogout() {
    this.router.navigate(['/']);
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
