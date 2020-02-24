import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private httpClient: HttpClient) {}

  executeWelcomeBean() {
    return this.httpClient.get<WelcomeBean>(
      `${API_URL}/test/hello-world-bean`);
  }

  executeWelcomeBeanWithParam(username: string) {
    return this.httpClient.get<WelcomeBean>(
      `${API_URL}/test/hello-world-path-variable/${username}`);
  }
}

export class WelcomeBean {
  constructor(username: string) {}
}
