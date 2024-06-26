import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsModule } from './modules/about-us.module';
import { AuthModule } from './modules/auth.module';
import { ErrorModule } from './modules/error.module';
import { HomeModule } from './modules/home.module';
import { RecipesModule } from './modules/recipe.module';
import { UserEngagementModule } from './modules/user-engagement.module';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ScrollToTopComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HomeModule,
    AboutUsModule,
    UserEngagementModule,
    AuthModule,
    ErrorModule,
    RecipesModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
