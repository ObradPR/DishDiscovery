import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription, switchMap } from 'rxjs';
import { IUserDto } from '../../common/interfaces/user/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {
  subscriptions: Subscription[] = [];
  user: IUserDto | undefined;
  loggedUserEmail: string = '';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserStats();
  }

  getUserStats() {
    this.subscriptions.push(
      this.authService
        .getUserEmail()
        .pipe(
          switchMap((email) => {
            this.loggedUserEmail = email;
            return this.userService.getUserByEmail(email);
          })
        )
        .subscribe({
          next: (data) => {
            if (data) {
              this.user = data;
            }
          },
        })
    );
  }
}
