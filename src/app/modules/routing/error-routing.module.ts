import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../../pages/errors/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'not-found', pathMatch: 'full' },
  {
    path: '',
    children: [{ path: 'not-found', component: NotFoundComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorRoutingModule {}
