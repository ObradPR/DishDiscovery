import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.signUpForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.pattern(this.authService.getNameRegex()),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.pattern(this.authService.getNameRegex()),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(this.authService.getUsernameRegex()),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(this.authService.getPhoneRegex()),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(this.authService.getPasswordRegex()),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.retypePasswordCheck.bind(this)],
      ],
    });
  }

  retypePasswordCheck(control: FormControl): null | { [key: string]: boolean } {
    const passControl = control.root.get('password');
    const passValue = passControl ? passControl.value : null;
    const retypePassValue = control.value;
    if (retypePassValue === passValue) {
      return null;
    } else {
      return { notSamePasswrod: true };
    }
  }

  onClosingModal(): void {
    this.authService.setSignUpVisibility(false);
  }

  onSignUp() {
    if (this.signUpForm.invalid) return;

    console.log('Successfully sign up!');
    this.signUpForm.reset();
  }

  onSwitchToRegModal() {
    this.authService.onToggleAuthModals();
  }
}
