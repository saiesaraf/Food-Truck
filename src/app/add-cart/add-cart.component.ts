import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'angularx-social-login';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {
  selectedMenu: any;
  totalCost: number;
  allMenu: any;
  itemCost: number;

  constructor(
    public data: DataService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    public auth: AuthenticationService
  ) {
    this.selectedMenu = this.data.order;
    this.totalCost = 0;
  }

  ngOnInit(): void {}

  getTotal() {
    this.totalCost = this.data.totalCost;
    return this.totalCost;
  }
  getitemCost(menuName: string) {
    const index = this.data.allItems.findIndex(item => menuName == item.name);
    console.log(index);
    if (index != -1) {
      this.itemCost = this.data.allItems[index].cost;
    }
    return this.itemCost;
  }
  removeFromCart(menuRemove: string) {
    console.log('removed');
    const index = this.data.selectedItems.findIndex(
      item => item.name == menuRemove
    );
    this.data.selectedItems.splice(index, 1);
    //console.log('selected items are', this.data.selectedItems);
    this.data.getBill().subscribe((result: any) => {
      this.data.totalCost = result.total;
    });

    this.data.selectedItems.quantity = 0;

    const index1 = this.data.order.findIndex(item => item.name == menuRemove);
    this.data.order[index1].quantity = 0;
  }

  placedOrderLogin() {
    this.router.navigate(['/login']);
  }

  placedOrder(){
  this.router.navigate(['/payment']);
  }

  orderFood(){
    console.log('placed order');
    this.router.navigate(['/menu']);
  }
}
