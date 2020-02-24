import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { AuthData } from 'src/app/service/auth/auth-data.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  // userLoggedIn = false;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = this.createFormGroupWithBuilder(this.formBuilder);
  }

  onSubmit() {
    const authData: AuthData = Object.assign({}, this.loginForm.value);
    console.log(authData);
    // this.authService.login(result);

    this.authService
      //  .executeBasicAuthenticationService(this.username, this.password)
      .executeJWTAuthenticationService(authData)
      .subscribe(
        data => {
          console.log("data is :" + data.username);
          console.log("data is :" + data.accessToken);
          this.authService.authChange.next(true);

          // this.basicAuthenticationService.setSessionStorage(this.username);
          // this.userLoggedIn = true;
          const params = this.route.snapshot.queryParams;
          // data.redirectURL
          console.log("params :" + params["redirectURL"]);
          if (params["redirectURL"]) {
            this.router
              .navigateByUrl(params["redirectURL"])
              .catch(() => this.router.navigate(["welcome", data.username]));
          } else {
            this.router.navigate(["welcome", data.username]);
          }
        },
        error => {
          console.log("error in login component :" + error);
          this.authService.authChange.next(false);

          // this.userLoggedIn = false;
        }
      );
  }

  createFormGroupWithBuilder(formBuilder: FormBuilder) {
    return formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }
}
