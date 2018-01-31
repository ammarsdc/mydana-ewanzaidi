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

  constructor(private http:Http, private router: Router) { }

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

}
