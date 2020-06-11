import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

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


  constructor(private data: DataService, private router: Router) {
      this.selectedMenu = this.data.order;
      this.totalCost = 0;

   }

  ngOnInit(): void {
  }

  getTotal() {
    this.totalCost = this.data.totalCost;
    return this.totalCost;
  }
  getitemCost(menuName: string)
  {
    console.log(menuName);
    console.log('data', this.data.selectedItems)

    console.log('all items', this.data.allItems )

    //console.log('menuName is in getItem cost',this.allMenu);
    //console.log('all menu is', this.data.allItems);
    const index = this.data.allItems.findIndex(
      item => menuName == item.name
    );
    console.log(index);
    if(index!=-1)
    {
      // console.log('cost in getItem cost is' + this.allMenu.cost);
      console.log(this.data.allItems[index].cost);
      this.itemCost = this.data.allItems[index].cost;
    }
    return this.itemCost;
  }
  removeFromCart(menuRemove: string)
{
    console.log('removed');
    const index = this.data.selectedItems.findIndex(
      item => item.name == menuRemove
    );
    this.data.selectedItems.splice(index, 1);
    console.log('selected items are', this.data.selectedItems);
    this.data.getBill().subscribe((result: any) => {
      this.data.totalCost = result.total;
    });

    this.data.selectedItems.quantity = 0;

    const index1 = this.data.order.findIndex(
      item => item.name == menuRemove
    );
    this.data.order[index1].quantity = 0



  }

  placedOrder()
  {
    console.log('placed order');
    this.router.navigate(['/payment']);
  }

}
