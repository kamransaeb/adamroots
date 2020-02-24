import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) {
  }

  fetchProfileData() {
    return this.httpClient.get<ProfileBean>(
      `${API_URL}/test/hello-world-bean`
    );
  }

  fetchProfileDataPathVariable(name: string) {
  return this.httpClient.get<ProfileBean>(
    `${API_URL}/test/hello-world-path-variable/${name}`
  );
  }

}

export class ProfileBean {
  constructor(public username: string) {}
}
