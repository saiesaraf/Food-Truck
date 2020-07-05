import { Component, OnInit } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.css']
})

export class BackgroundComponent implements OnInit {
  imageObject = [];

  constructor() { }

  ngOnInit(): void {
    this.imageObject = [{
      image: '../../assets/img/slider/slider-1.jpg',
      thumbImage: '../../assets/img/slider/slider-1.jpg',
      title: 'Delicious Blueberry PanCakes'
  }, {
      image: '../../assets/img/slider/slider-2.jpg',
      thumbImage: '../../assets/img/slider/slider-2.jpg',
      title: 'Delicious Blueberry PanCakes'
  }, {
    image: '../../assets/img/slider/slider-3.jpg',
    thumbImage: '../../assets/img/slider/slider-3.jpg',
    title: 'Delicious Blueberry PanCakes'
  }
  ,{
    image: '../../assets/img/slider/american-heritage-chocolate-Id8BO472TbY-unsplash.jpg',
    thumbImage: '../../assets/img/slider/american-heritage-chocolate-Id8BO472TbY-unsplash.jpg',
    title: 'Delicious Blueberry PanCakes'
  },
  {
    image: '../../assets/img/slider/ilya-mashkov-_qxbJUr9RqI-unsplash.jpg',
    thumbImage: '../../assets/img/slider/ilya-mashkov-_qxbJUr9RqI-unsplash.jpg',
    title: 'Delicious Blueberry PanCakes'
  }];
}
}
