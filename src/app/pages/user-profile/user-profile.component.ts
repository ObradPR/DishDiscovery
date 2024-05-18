import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription, switchMap } from 'rxjs';
import { IUserDto } from '../../common/interfaces/user/user.interface';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  user: IUserDto | undefined;
  searchedUserId: string | null = null;
  isOwnProfile: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.paramMap.subscribe({
        next: (params) => {
          this.searchedUserId = params.get('id');
          this.isOwnProfile = !this.searchedUserId;

          if (this.isOwnProfile) {
            this.getUserStats();
          } else {
            if (this.searchedUserId) {
              this.userService
                .getUserById(+this.searchedUserId)
                .pipe(
                  switchMap((data) => {
                    this.user = data;
                    return this.authService.getUserEmail();
                  })
                )
                .subscribe({
                  next: (email) => {
                    if (email) {
                      this.isOwnProfile =
                        email === this.user?.email ? true : false;
                    }
                  },
                });
            }
          }
        },
      })
    );
  }

  getUserStats() {
    this.subscriptions.push(
      this.authService
        .getUserEmail()
        .pipe(
          switchMap((email) => {
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
