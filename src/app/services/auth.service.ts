import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private localStorageService: LocalStorageService) {}

  // REGEX
  private nameRegex =
    /^[A-ZČĆŽĐŠ][a-zA-ZČĆŽĐŠčćžđš]*('[a-zA-ZČĆŽĐŠčćžđš]*)?(\s[a-zA-ZČĆŽĐŠčćžđš]*)?$/;
  private usernameRegex = /^[a-zA-Z0-9_-]{5,20}$/;
  private phoneRegex = /^[0-9]{6,15}$/;
  private passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

  getNameRegex(): RegExp {
    return this.nameRegex;
  }
  getUsernameRegex(): RegExp {
    return this.usernameRegex;
  }
  getPhoneRegex(): RegExp {
    return this.phoneRegex;
  }
  getPasswordRegex(): RegExp {
    return this.passwordRegex;
  }

  // LOGIC
  private isVisibleSignUp: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isVisibleSignIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  getSignUpVisibility(): Observable<boolean> {
    return this.isVisibleSignUp.asObservable();
  }
  setSignUpVisibility(status: boolean) {
    this.isVisibleSignUp.next(status);
  }
  getSignInVisibility(): Observable<boolean> {
    return this.isVisibleSignIn.asObservable();
  }
  setSignInVisibility(status: boolean) {
    this.isVisibleSignIn.next(status);
  }

  onToggleAuthModals(): void {
    this.getSignInVisibility()
      .pipe(take(1))
      .subscribe((status: boolean) => {
        this.setSignInVisibility(!status);
        this.setSignUpVisibility(status);
      });
  }

  // USERDATA
  private userEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setUserFromLS(): void | null {
    const email = this.localStorageService.getUserFromLS();

    if (email) {
      this.userEmail.next(email);
    }

    return null;
  }

  getUserEmail(): Observable<string> {
    return this.userEmail.asObservable();
  }

  logout() {
    this.localStorageService.removeUserFromLS();
    this.userEmail.next('');
  }

  isLoggedIn(): boolean {
    const email = this.localStorageService.getUserFromLS();

    return email !== '' && email !== null;
  }
}
