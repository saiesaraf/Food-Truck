import { Component, OnInit, NgModule } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  fname: string;
  email: string;
  password: string;
  registered: boolean;
  isValidForm: boolean;
  isnameValid: boolean;
  constructor(private data: DataService, private router: Router, private flashMessage: FlashMessagesService ) {
    this.registered = false;
  }

  ngOnInit(): void {}



  registerUser(form: NgForm) {
    console.log('aa' + form.value.fname);

    if (form.invalid)
    {
      return;
    }

    const newUser = {
      name: form.value.fname,
      email: form.value.email,
      password: form.value.password
    };

    this.data.registerUser(newUser).subscribe((registerddata) => {
      if (registerddata['success'])
      {
        this.registered = true;
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['login']);
      }
      else{
        this.flashMessage.show(JSON.stringify(registerddata['msg']),
        {
          cssClass: 'alert-danger',
          timeout: 5000});
        this.router.navigate(['register']);
        }
    });



  }



}
