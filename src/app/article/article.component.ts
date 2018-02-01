import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  baseUrl = 'https://mydana.herokuapp.com/api/';
  article;

  user;
  token;
  logged: Boolean = false;

  constructor(private http:Http, private router:Router, private route: ActivatedRoute) { 
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
    this.article = [];
    let id = this.route.snapshot.params['id'];
    this.http.get(this.baseUrl + 'article/' + id).map(res => res.json()).subscribe(items => {
      this.article = items.data;
      console.log(this.article);
    })
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
