import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  connect(username: string, password: string) {
    localStorage.setItem('currentUser', '');
  }

}
