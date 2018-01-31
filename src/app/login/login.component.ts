import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login.model';
import {NgForm} from '@angular/forms';
import {Http, Headers} from '@angular/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  baseUrl = 'https://mydana.herokuapp.com/api/';
  token;
  logged: Boolean;

  constructor(private http:Http, private router: Router) { 
  }

  ngOnInit() {
  }

  login(formData){
    let email = formData.value.email;
    let password = formData.value.password;

    let header = new Headers();
    header.append('Content-Type', 'application/json');

    new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + 'login', {email, password}, {headers : header}).subscribe(res => {
        let data = res.json();
        this.token = data.token;
        window.localStorage.setItem('token', this.token);
        resolve(data);
        resolve(res.json());
        resolve(this.router.navigateByUrl('/'))
      }, (err) => {
        reject(err);
      })
    })
  }

  signup(){
    this.router.navigateByUrl('/signup');
  }

  

}
