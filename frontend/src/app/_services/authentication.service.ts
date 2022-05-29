import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user.model';
import { TokenStorageService } from './token-storage.service';

const hostURL = `http://localhost:3007`;
const baseUrl = `${hostURL}/api/user`;

const headerDict = {
  'Access-Control-Allow-Origin': '*',
};
const requestOptions = {
  headers: new HttpHeaders(headerDict),
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public test :boolean = false;

  constructor(private http: HttpClient,private tokenStorageService :TokenStorageService ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    
    return this.http
      .post<any>(`${baseUrl}/login`, { email, password }, requestOptions)
      .pipe(
        map((user) => {
          if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify({usert:user.user, toekn:user.token}));
            this.currentUserSubject.next(user);
           
          }
          this.test=true;
          return user;
         
        })
      );
      
  }

  

  logout() {
    localStorage.removeItem('token');
    this.tokenStorageService.removeUser();
    //this.currentUserSubject.next(null);
  }

  register(user: User) {
    return this.http.post(`${baseUrl}/register`, user, requestOptions);
  }
  
  loggedIn()
  {
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
