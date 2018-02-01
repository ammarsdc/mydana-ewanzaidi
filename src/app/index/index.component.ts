import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  campaigns = [];
  baseUrl = 'https://mydana.herokuapp.com/api/';
  data;
  token;
  logged : Boolean;
  user;

  constructor(private http:Http, private router:Router) { 
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

  ngOnInit(): void {
    this.http.get('https://mydana.herokuapp.com/api/campaigns').map(res => res.json()).subscribe(res => {
      this.data = res.data;
      let calc;
      var oneDay = 24*60*60*1000;
      this.data.forEach(elements => {
        var first = new Date(elements.campaign_start_date);
        var sec = new Date(elements.campaign_end_date);
        calc = (elements.fund_amount / elements.total_amount) * 100;
        elements.percent = Math.round(calc);
        elements.days = Math.round(Math.abs((sec.getTime() - first.getTime()) / (oneDay)));
        elements.mystyle = {'width' : `${elements.percent}%`};
        this.campaigns.push(elements)
      })
      console.log(this.campaigns);
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

  showCampaign(id){
    this.router.navigateByUrl('/campaign/'+id);
  }

}
