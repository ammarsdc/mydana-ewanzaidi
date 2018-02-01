import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;
  baseUrl = 'https://mydana.herokuapp.com/api/';

  constructor(private http:Http, private router:ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.user = [];
    let id = this.router.snapshot.params['id'];
    this.http.get(this.baseUrl + 'user/' +id ).map(res => res.json()).subscribe(items => {
      this.user = items.data;
      console.log(this.user);
    })
  }

  logOut(){
    window.localStorage.clear();
    this.route.navigateByUrl('/');
  }

  homepage(){
    this.route.navigateByUrl('/')
  }

}
