import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserService } from '../../../services/user.service';

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
    private localStorageService: LocalStorageService,
    private userService: UserService
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

    // If user exists
    this.userService.getUserByEmail(this.signInForm.value.email).subscribe({
      next: (data) => {
        if (data) {
          this.localStorageService.setUserInLS(this.signInForm.value.email);
          this.authService.setUserFromLS();

          console.log('Successfully sign in!');
          this.onClosingModal();
          this.signInForm.reset();
        } else {
          return;
        }
      },
    });
  }

  onSwitchToRegModal() {
    this.authService.onToggleAuthModals();
  }
}
