import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsModule } from './modules/about-us.module';
import { AuthModule } from './modules/auth.module';
import { HomeModule } from './modules/home.module';
import { UserEngagementModule } from './modules/user-engagement.module';
import { ErrorModule } from './modules/error.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HomeModule,
    AboutUsModule,
    ButtonModule,
    UserEngagementModule,
    AuthModule,
    ErrorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
