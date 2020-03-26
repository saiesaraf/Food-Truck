import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  name: string;
  cost: number;
  constructor(private data: DataService) { }

  ngOnInit(): void {
  }

  onAddMenu()
  {
    console.log('name is ' + this.name);
    console.log('cost is ' + this.cost);

    const newMenu = {
      name: this.name,
      cost: this.cost
    };
    this.data.addMenu(newMenu).subscribe(() => {
      this.data.getMenu()
      console.log('successfully added new menu');
    });
  }

}
