import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public currentUser: any

  constructor(public data: DataService, auth: AuthenticationService) {
    this.data.userId = localStorage.getItem('user');
    console.log('localstorage data' + this.data.userId);
    this.data.getUserInfo().subscribe((currentUserResponse: any) => {
       console.log(JSON.stringify(currentUserResponse));
       this.currentUser = currentUserResponse;
    });
  }
    ngOnInit(): void {
  };
}
