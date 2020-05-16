import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  fname: string;
  cost: number;
  description: string;
  image1: string;
  constructor(private data: DataService) { }

  ngOnInit(): void {

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }

  onAddMenu(form: NgForm)
  {
    console.log('name is ' + form.value.fname);
    console.log('cost is ' + form.value.cost);
    console.log('description is ' + form.value.description);
    console.log('image is ' + form.value.image1);
    if (form.invalid)
    {
      return;
    }
    const newMenu = {
      name: form.value.fname,
      cost: form.value.cost,
      description: form.value.description,
      image: form.value.image1
    };
    this.data.addMenu(newMenu).subscribe(() => {
      this.data.getMenu();
      console.log('successfully added new menu');
    });
  }

}
