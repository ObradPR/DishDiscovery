import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AboutUsComponent } from '../pages/about-us/about-us.component';
import { FaqsComponent } from '../pages/about-us/faqs/faqs.component';
import { LegalInformationComponent } from '../pages/about-us';

const routes: Routes = [
  { path: '', component: AboutUsComponent },
  {
    path: '',
    children: [
      { path: 'faqs', component: FaqsComponent },
      { path: 'legal-information', component: LegalInformationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsRoutingModule {}
