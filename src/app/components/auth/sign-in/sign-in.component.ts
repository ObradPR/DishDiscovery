import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.signInForm = this.fb.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['Test12345@', [Validators.required]],
    });
  }

  onClosingModal(): void {
    this.authService.setSignInVisibility(false);
  }

  onSignIn() {
    if (this.signInForm.invalid) return;

    console.log('Successfully sign in!');
    this.localStorageService.setUserInLS(this.signInForm.value.email);
    this.authService.setUserFromLS();

    this.onClosingModal();
    this.signInForm.reset();
  }

  onSwitchToRegModal() {
    this.authService.onToggleAuthModals();
  }
}
