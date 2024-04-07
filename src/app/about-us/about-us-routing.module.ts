import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us.component';
import { NgModule } from '@angular/core';
import { FaqsComponent } from './faqs/faqs.component';

const routes: Routes = [
  { path: '', component: AboutUsComponent },
  { path: '', children: [{ path: 'faqs', component: FaqsComponent }] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsRoutingModule {}
