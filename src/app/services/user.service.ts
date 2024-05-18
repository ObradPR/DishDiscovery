import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { IUserDto } from '../common/interfaces/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private dataService: DataService) {}

  getUserById(id: number): Observable<IUserDto | undefined> {
    return this.dataService
      .get<IUserDto[]>('users.json')
      .pipe(map((users) => users.find((u) => u.user_id === id)));
  }

  getUserByEmail(email: string): Observable<IUserDto | undefined> {
    return this.dataService
      .get<IUserDto[]>('users.json')
      .pipe(map((users) => users.find((u) => u.email === email)));
  }

  getUsersBySearch(query: string): Observable<IUserDto[]> {
    query = query.toLocaleLowerCase();

    return this.dataService
      .get<IUserDto[]>('users.json')
      .pipe(
        map((users) =>
          users.filter(
            (user) =>
              user.full_name.toLocaleLowerCase().includes(query) ||
              user.email.toLocaleLowerCase().includes(query) ||
              user.username.toLocaleLowerCase().includes(query)
          )
        )
      );
  }
}
