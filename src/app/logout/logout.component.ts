import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthenticationService,public data: DataService,
              private router: Router,
              private flashMessage: FlashMessagesService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.auth.removeUserFromStorage();
    this.authService.signOut();
    this.data.isloggedin = false;
    this.flashMessage.show('You are successfully logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['/']);
  }

}
