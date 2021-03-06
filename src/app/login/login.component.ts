import { Component, OnInit, NgModule, NgZone } from '@angular/core';
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loggedin: boolean;
  isadmin: boolean;
  user: SocialUser;
  showPassword: false;
  constructor(
    public data: DataService,
    private router: Router,
    public auth: AuthenticationService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      this.user = user;
      console.log('aaa' + user + this.data.isloggedin);
    });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
      console.log(x);
      this.data.userId = x.email;
      this.auth.storeUserUse(x.email);
      this.data.isloggedin = true;
      this.flashMessage.show('You are now logged in successfully!', {
        cssClass: 'alert-success',
        timeout: 3000
      });
      this.router.navigate(['/payment']);
    });
  }
  /*signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
      console.log(x);
      this.auth.storeUserData('dummy', x.email);
      this.data.userId = x.email;
      this.auth.storeUserData(localStorage.user, x.email);
      this.data.isloggedin = true;
      this.flashMessage.show('You are now logged in successfully!', {
        cssClass: 'alert-success',
        timeout: 3000
      });
       this.router.navigate(['/payment']);
    });
  }*/
  LoginUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const prevUser = {
      email: form.value.email,
      password: form.value.password
    };
    this.data.loginUser(prevUser).subscribe(loginDetails => {
      if (loginDetails['success']) {
        this.flashMessage.show('You are now logged in successfully!', {
          cssClass: 'alert-success',
          timeout: 3000
        });
        console.log('email is' + form.value.email);
        this.auth.storeUserData(loginDetails.token, form.value.email);
        this.auth.storeUserData(loginDetails.user, form.value.email);
        this.loggedin = true;
        this.data.isloggedin = true;
        this.data.userId = loginDetails.user;
        this.router.navigate(['/payment']);
        if (prevUser.email == 'saie1.saraf@gmail.com') {
          this.data.isadmin = true;
          this.isadmin = true;
        }
        if (this.data.isadmin === true) {
          this.router.navigate(['/addmenu']);
        }
      } else {
        this.flashMessage.show(JSON.stringify(loginDetails['msg']), {
          cssClass: 'alert-danger',
          timeout: 5000
        });
        this.router.navigate(['register']);
      }
    });
  }

  signUp()
  {
    this.router.navigate(['/register']);
  }
}
