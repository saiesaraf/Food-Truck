import { Component, OnInit, NgModule } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Order } from '../order';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgForm } from '@angular/forms';

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
  term: string;
  menuname: string;
  afterSearch: any[];
  constructor(public data: DataService, private router: Router) {
    this.data.quantity = [];
    this.selectedMenu = [];
    this.afterSearch = [];
  }

  ngOnInit(): void {
    this.showMenu();
  }

  getTotalBill() {
    for (let i = 0; i < this.data.allItems.length; i++) {
      if (this.data.order[i].quantity > 0) {
        const newObj = {
          name: this.data.allItems[i].name,
          quantity: this.data.order[i].quantity
        };
        const index = this.data.selectedItems.findIndex(
          item => item.name === this.data.allItems[i].name
        );

        if (index === -1) {
          this.data.selectedItems.push(newObj);
        } else {
          this.data.selectedItems[index] = newObj;
        }
        //console.log('selected imtes', this.data.selectedItems)
      }
      else{
         const index = this.data.selectedItems.findIndex(
          item => item.name === this.data.allItems[i].name
          );
          if(index!=-1) {
            this.data.selectedItems.splice(index,1);
          }
      }
    }
    this.data.getBill().subscribe((result: any) => {
      // console.log(result.total);
      this.data.totalCost = result.total;
      //console.log('from dataservice' + this.data.totalCost);
    });
  }

  showMenu() {
    this.data.getMenu().subscribe((menu: any) => {
      this.data.allItems = menu;
      this.imageFromService = menu.image;

      // console.log(JSON.stringify(this.data.allItems));
      for (let i = 0; i < this.data.allItems.length; i++) {
//        this.quantity.push(0);
        this.data.quantity.push(0);
        const currOrder: Order = {
          name: this.data.allItems[i].name,
          cost: this.data.allItems[i].cost,
          quantity: 0,
          description: this.data.allItems[i].description
        }
        this.data.order.push(currOrder);

      }
    });
  }

  onClick() {
    this.clickMessage = 'You clicked me';
    this.router.navigate(['/addmenu']);
  }

  selectedMenu1(form: NgForm)
  {
    console.log('I am here');
    console.log('You selected' + form.value.menuname);
    this.afterSearch = [];
    const toSearch = form.value.menuname.toLowerCase();
    for (let i = 0; i < this.data.allItems.length; i++)
    {
      const dataName = this.data.allItems[i].name.toLowerCase();
      // tslint:disable-next-line: no-shadowed-variable
      if ( dataName.startsWith(toSearch))
      {
        console.log('We could find' + dataName);
        this.afterSearch.push(this.data.allItems[i]);
        break;
      }
      else{
        console.log('Menu is not available');
      }
    }
    form.resetForm();
  }

  backtoMenu(){
    this.afterSearch.length = 0;
  }
}
