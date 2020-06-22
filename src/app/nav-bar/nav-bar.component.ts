import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isloggedin: boolean;
  constructor(
    public data: DataService,
    public router: Router,
    public route: ActivatedRoute
  ) {}
  name: string
  ngOnInit(): void {

  }
}
