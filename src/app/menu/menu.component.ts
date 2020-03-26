import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
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

  constructor(private data: DataService) {
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
      for (let i = 0; i < this.allItems.length; i++) {
        this.quantity.push(0);
      }
    });
  }

  onClick() {
    this.clickMessage = 'You clicked me';
  }
}
