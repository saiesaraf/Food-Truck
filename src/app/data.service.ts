import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string;
  billurl: string;
  addurl: string;
  registerUrl: string;
  loginUrl: string;
  profileUrl: string;
  userId: string;
  selectedItems: any;
  allItems: any;
  totalCost: any;
  cost: any;
  public isloggedin: boolean;
  quantity: any[];

  // add
  order: Order[]

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/menuNew';
    this.billurl = 'http://localhost:3000/menuNew/post_order';
    this.addurl = 'http://localhost:3000/menuNew/menu_name';
    this.registerUrl = 'http://localhost:3000/users/register';
    this.loginUrl = 'http://localhost:3000/users/login';
    this.profileUrl = 'http://localhost:3000/users/userdetails/';
    this.isloggedin = false;
    this.selectedItems = [];
    this.cost = [];
    this.totalCost = 0;
    this.allItems = [];
    this.quantity =[];
    this.order = []
  }

  getMenu() {
    return this.http.get<any>(this.url);
  }

  getBill() {
    // console.log('selected items', this.selectedItems)
    return this.http.post<any>(this.billurl,  this.selectedItems);
  }

  addMenu(menu: any) {
    return this.http.post<any>(this.addurl, menu);
  }

  registerUser(user: any) {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this.loginUrl, user);
  }

  getUserInfo() {
    const url = this.profileUrl + this.userId
    // console.log('url=='+url+"end")
    return this.http.get<any>(this.profileUrl + this.userId);
  }
}
