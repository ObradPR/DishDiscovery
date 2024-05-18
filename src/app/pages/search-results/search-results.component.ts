import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, forkJoin, of, switchMap } from 'rxjs';
import { IUserDto } from '../../common/interfaces/user/user.interface';
import { IRecipeDto } from '../../common/interfaces/recipe/recipe.interface';
import { UserService } from '../../services/user.service';
import { RecipeService } from '../../services/recipe.service';

type TUniversalSearchArray = (IUserDto | IRecipeDto)[];

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  thingsArr: TUniversalSearchArray = [];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.params
        .pipe(
          switchMap((data) => {
            return this.searchAllThings(data['query']);
          })
        )
        .subscribe({
          next: (data) => {
            this.thingsArr = data;
          },
        })
    );
  }

  searchAllThings(query: string): Observable<TUniversalSearchArray> {
    return forkJoin({
      recipes: this.recipeService.getRecipesBySearch(query),
      users: this.userService.getUsersBySearch(query),
    }).pipe(
      switchMap((results) => {
        const arr: TUniversalSearchArray = [];

        arr.push(...results.recipes, ...results.users);

        return of(arr);
      })
    );
  }

  isRecipe(item: IUserDto | IRecipeDto): item is IRecipeDto{
    return (item as IRecipeDto).ingredients !== undefined;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
