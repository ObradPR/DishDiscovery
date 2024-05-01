import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private userToken = 'user-email';

  constructor() {}

  // USER ACCOUNT
  setUserInLS(email: string) {
    localStorage.setItem(this.userToken, email);
  }
  getUserFromLS(): string | null {
    return localStorage.getItem(this.userToken);
  }
  removeUserFromLS() {
    localStorage.removeItem(this.userToken);
  }
}
