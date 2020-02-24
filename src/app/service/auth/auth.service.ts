import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AUTH_TOKEN, AUTH_USER, API_URL } from '../../app.constants';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: string;
  public authChange = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  executeJWTAuthenticationService(authData: AuthData) {
    return this.http
      .post<any>(`${API_URL}/auth/login`, {
        email: authData.email,
        password: authData.password
      })
      .pipe(
        map(data => {
          console.log("data.username is :" + data.username);
          console.log("data.accessToken is :" + data.accessToken);

          sessionStorage.setItem(AUTH_USER, data.username);
         // this.user = data.username;
          sessionStorage.setItem(AUTH_TOKEN, `Bearer ${data.accessToken}`);
          return data;
        })
      );
  }

  isUserLoggedIn() {
    this.user = sessionStorage.getItem(AUTH_USER);
    return !(this.user === null);
  }

  getLoggedInUser() {
    return this.user;
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTH_USER);
  }

  getAuthenticatedToken() {
    if (this.isUserLoggedIn()) {
      return sessionStorage.getItem(AUTH_TOKEN);
    }
  }

  logout() {
    sessionStorage.removeItem(AUTH_USER);
    sessionStorage.removeItem(AUTH_TOKEN);
    this.user = null;
  }
}

export class AuthenticationBean {
  constructor(public message: string) {}
}
