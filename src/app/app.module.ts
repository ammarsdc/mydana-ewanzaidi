import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { CampaignComponent } from './campaign/campaign.component';

import { MomentModule } from 'angular2-moment';
import { SignupComponent } from './signup/signup.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { ProfileComponent } from './profile/profile.component';
import { DonateComponent } from './donate/donate.component';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    CampaignComponent,
    SignupComponent,
    ArticlesComponent,
    ArticleComponent,
    ProfileComponent,
    DonateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
