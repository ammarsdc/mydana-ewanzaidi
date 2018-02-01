import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {

  constructor(private route:Router) { }

  canActivate(){
    if(window.localStorage.getItem('token') != null){
      return true
    }else{
      return false
    }
  }

  getAuth(){
    
  }

}
