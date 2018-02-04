import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers} from '@angular/http';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {

  logged : Boolean = false;
  success : Boolean = false;
  login : Boolean = false;
  user;
  donate_id;
  token;
  baseUrl = 'https://mydana.herokuapp.com/api/';
  slider;
  output;


  constructor(private router:Router, private http:Http, private route:ActivatedRoute) { 
    this.user = [];
    this.donate_id = this.route.snapshot.params['id'];
    this.token = window.localStorage.getItem('token');
    if(this.token != null){
      this.logged = true;
      let header = new Headers();
      header.append('Authorization', 'Bearer ' + this.token)
      new Promise((resolve, reject) => {
        this.http.get(this.baseUrl + 'users', {headers : header}).map(res => res.json()).subscribe(data => {
          this.user = data.data;
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
  }

  homepage(){
    this.router.navigateByUrl('/')
  }

  loginpage(){
    this.router.navigateByUrl('/login')
  }

  derma(){
    if(this.logged == true){
      this.success = !this.success;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(function () {
      this.success = false;
    }.bind(this), 5000);
      this.login = false;
    }else{
      this.login = !this.login;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    setTimeout(function () {
      this.login = false;
    }.bind(this), 5000);
      this.success = false;
    }
  }

}
