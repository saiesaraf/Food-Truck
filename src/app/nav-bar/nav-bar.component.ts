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
  cartquantity: number;
  constructor(
    public data: DataService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.cartquantity = 0;
  }
  name: string;
  ngOnInit(): void {
    for (let i = 0; i < this.data.allItems.length; i++) {
      if (this.data.order[i].quantity > 0) {
        console.log(this.data.order[i].quantity);
        this.cartquantity = this.cartquantity + 1;
      }
    }
  }
  getCartQuantity() {
    this.cartquantity = 0;
    for (let i = 0; i < this.data.allItems.length; i++) {
      if (this.data.order[i].quantity > 0) {
        console.log(this.data.order[i].quantity);
        this.cartquantity = this.cartquantity + 1;
      }
    }
    return this.cartquantity;
  }
}
