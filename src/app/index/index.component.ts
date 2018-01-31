import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
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
  percent;
  days;
  mystyle;
  data;

  constructor(private http:Http, private router:Router) { }

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
        elements.mystyle = {'width' : `${elements.days}px`};
        this.campaigns.push(elements)
      })
      console.log(this.campaigns);
    })
  }

  login(){
    this.router.navigateByUrl('/login');
  }

}
