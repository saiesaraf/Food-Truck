import { Component, OnInit, NgModule } from '@angular/core';
import { DataService } from '../data.service';


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

  constructor(private data: DataService) {
    this.registered = false
  }

  ngOnInit(): void {}

  registerUser() {
    const newUser = {
      name: this.fname,
      email: this.email,
      password: this.password
    };
    this.data.registerUser(newUser).subscribe(() => {
      this.registered = true;
    });
  }
}
