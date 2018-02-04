import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IndexComponent} from './index/index.component';
import { LoginComponent } from './login/login.component';
import { CampaignComponent } from './campaign/campaign.component';
import { SignupComponent } from './signup/signup.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { ProfileComponent } from './profile/profile.component';
import { DonateComponent } from './donate/donate.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {path:'',component:IndexComponent, pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'campaign/:id', component:CampaignComponent},
  {path:'signup', component:SignupComponent},
  {path:'articles',component:ArticlesComponent},
  {path:'article/:id',component:ArticleComponent},
  {path:'profile/:id', component:ProfileComponent},
  {path:'donate/:id', component:DonateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
