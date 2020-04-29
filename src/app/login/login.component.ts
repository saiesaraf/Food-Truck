import { Component, OnInit, NgModule } from '@angular/core';
import { DataService } from '../data.service';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loggedin: boolean;
  constructor(public data: DataService) { }

  ngOnInit(): void {
  }

  LoginUser(){
    const prevUser = {
      email: this.email,
      password: this.password
    };
    this.data.loginUser(prevUser).subscribe(() => {

      this.loggedin = true;
      this.data.isloggedin = true;
      console.log('lgg==' + this.data.isloggedin)
    });
  }
}
