import { Component, OnInit, NgModule } from '@angular/core';
import { DataService } from '../data.service';
import { AuthenticationService} from '../authentication.service';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { NgForm } from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';

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
  constructor(public data: DataService, private router: Router,
              public auth: AuthenticationService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  LoginUser(form: NgForm){
    if (form.invalid)
    {
      return;
    }
    const prevUser = {
      email: form.value.email,
      password: form.value.password
    };
    this.data.loginUser(prevUser).subscribe((loginDetails) => {
      if (loginDetails['success']){
        this.flashMessage.show('You are now logged in successfully!', {cssClass: 'alert-success', timeout: 3000});
        console.log("email is" + form.value.email);
        this.auth.storeUserData(loginDetails.token, form.value.email);
        this.loggedin = true;
        this.data.isloggedin = true;

        if ( prevUser.email == "saie1.saraf@gmail.com")
        {
          this.data.isadmin = true;
          this.isadmin = true;
        }

        if ( this.data.isloggedin === true){
        this.router.navigate(['user-profile']);
        }
        if ( this.data.isadmin === true){
          this.router.navigate(['/addmenu']);
        }
      }
      else{
        this.flashMessage.show(JSON.stringify(loginDetails['msg']),
        {
          cssClass: 'alert-danger',
          timeout: 5000});
        this.router.navigate(['register']);
        }
    });
  }
}
