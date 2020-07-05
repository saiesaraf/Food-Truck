import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public currentUser: any;
  public prevOrdersReturned: any;

  constructor(
    public data: DataService,
    auth: AuthenticationService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) {
    this.data.userId = localStorage.getItem('user');
    console.log('localstorage data' + this.data.userId);
    this.data.getUserInfo().subscribe((currentUserResponse: any) => {
      console.log(JSON.stringify(currentUserResponse));
      this.currentUser = currentUserResponse;
    });
  }

  ngOnInit(): void {
    {
      console.log(this.data.userId);
      this.data.getPrevOrders().subscribe((userPrevOrders: any) => {
        this.prevOrdersReturned = userPrevOrders;
        console.log('prev ==' , this.prevOrdersReturned);
      });
    }
  }
}
