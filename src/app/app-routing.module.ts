import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    children: [
      {
        path: 'about-us',
        loadChildren: () =>
          import('./modules/about-us.module').then((m) => m.AboutUsModule),
      },
      {
        path: 'ue',
        loadChildren: () =>
          import('./modules/user-engagement.module').then(
            (m) => m.UserEngagementModule
          ),
      },
    ],
  },
  // {
  //   path: 'not-found',
  //   component: NotFoundComponent
  // },
  // {
  //   path: '**',
  //   component: NotFoundComponent
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
