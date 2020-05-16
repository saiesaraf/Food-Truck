import { Component, OnInit, NgModule } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  allItems: any[];
  totalCost: number;
  quantity: number[];
  selectedMenu: any[];
  clickMessage = '';
  imageFromService: string;
  imageToShow: any;
  routerLink: any;

  constructor(public data: DataService, private router: Router) {
    this.totalCost = 0;
    this.quantity = [];
    this.selectedMenu = [];
  }

  ngOnInit(): void {
    this.showMenu();
  }

  getTotalBill() {
    for (let i = 0; i < this.allItems.length; i++) {
      console.log('here' + this.quantity[i]);
      if (this.quantity[i] != 0) {
        const newObj = {
          name: this.allItems[i].name,
          quantity: this.quantity[i]
        };
        const index = this.selectedMenu.findIndex(
          item => item.name == this.allItems[i].name
        );
        if (index == -1) {
          this.selectedMenu.push(newObj);
        } else {
          this.selectedMenu[index] = newObj;
        }
      }
    }
    this.data.getBill(this.selectedMenu).subscribe((result: any) => {
      this.totalCost = result.total;
    });
  }
  showMenu() {
    this.data.getMenu().subscribe((menu: any) => {
      this.allItems = menu;
      this.imageFromService = menu.image;
      console.log(JSON.stringify(this.allItems));
      for (let i = 0; i < this.allItems.length; i++) {
        this.quantity.push(0);
      }
    });
  }

  onClick() {
    this.clickMessage = 'You clicked me';
    this.router.navigate(['/addmenu']);
  }
}
