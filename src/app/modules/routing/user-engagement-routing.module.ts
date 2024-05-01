import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContactComponent } from '../../pages/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    children: [{ path: 'contact', component: ContactComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserEngagementRoutingModule {}
