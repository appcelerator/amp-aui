import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class UsersService {
  users : User[] = []
  noLoginUser = new User('not signin','','','')
  currentUser = this.noLoginUser
  createMode = false
  createModeFrom = "/signin"
  //@Output() onUserEndCreateMode = new EventEmitter<void>();
  @Output() onUserLogout = new EventEmitter<void>();

  constructor(private router : Router, private http : Http) {
    this.users.push(new User('freignat', 'freignat@axway.com', '', ''))
    this.users.push(new User('bquenin', 'bquenin@axway.com', '', ''))
  }

  loadUsers() {
  /*
    this.http.get("http://...?auth=token").subcribe(
      (error) => console.log(error),
      (response : Response) => {
        const data = response.json()
      }
    )
  */
  }

  createModeOn(from : string) {
    this.createMode = true
    this.createModeFrom = from
    this.router.navigate(["/signup"])
  }

  createModeOff() {
    this.createMode = false
    this.router.navigate([this.createModeFrom])
    this.createModeFrom = "/signin"
  }

  logout() {
    this.currentUser = this.noLoginUser
    this.router.navigate(["/signin"])
  }

  login(user : User) {
    this.currentUser = user
    //const headers = new Headers({'Content-Type' ,'application/json'})
    //obs = this.http.post("http://...", user, {headers: headers})
  }

  signup(user : User) {
    this.users.push(user)
    //this.onUserEndCreateMode.emit();
    this.createModeOff()
  }

  isAuthenticated() {
    if (this.currentUser === this.noLoginUser) {
      return false
    }
    return true
  }

}


/*
this.usersService.storeServers(this.servers) {
  .subcribe(
    (response) => console.log(response)
    (error) => console.log(error)
  )
}
*/
