import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles = [];
  test;
  baseUrl = 'https://mydana.herokuapp.com/api/';

  user;
  token;
  logged: Boolean = false;

  constructor(private http:Http, private router: Router) { 
    this.user = [];
    this.token = window.localStorage.getItem('token');
    if(this.token != null){
      this.logged = true;
      let header = new Headers();
      header.append('Authorization', 'Bearer ' + this.token)
      new Promise((resolve, reject) => {
        this.http.get(this.baseUrl + 'users', {headers : header}).map(res => res.json()).subscribe(data => {
          this.user = data.data;
          console.log(this.user);
          resolve(data.data);
        }, (err) => {
          reject(err)
        });
      })
    }else{
      this.logged = false;
    }
  }

  ngOnInit() {
    this.test = [];
    this.http.get(this.baseUrl + 'articles').map(res => res.json()).subscribe(items => {
      this.articles = items.data;
      console.log(this.articles);
    })
  }

  readMore(id){
    this.router.navigateByUrl('/article/'+id)
  }

  login(){
    this.router.navigateByUrl('/login');
  }

  logOut(){
    this.user = null;
    this.logged = false;
    window.localStorage.removeItem('token');
  }

  profile(id){
    this.router.navigateByUrl('/profile/'+id)
  }

}
