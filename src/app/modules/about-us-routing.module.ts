import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AboutUsComponent } from '../pages/about-us/about-us.component';
import { FaqsComponent } from '../pages/about-us/faqs/faqs.component';

const routes: Routes = [
  { path: '', component: AboutUsComponent },
  { path: '', children: [{ path: 'faqs', component: FaqsComponent }] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsRoutingModule {}
