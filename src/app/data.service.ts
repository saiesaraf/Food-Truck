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
  getPaymenyUrl: string;
  selectedItems: any;
  allItems: any;
  totalCost: any;
  cost: any;
  public isloggedin: boolean;
  public isadmin: boolean;
  quantity: any[];
  placedOrder: string;
  prevOrder: string;

  // add
  order: Order[];
  herokuUrl: string;
  localUrl: string;
  constructor(private http: HttpClient) {
    this.herokuUrl = 'https://aqueous-beach-21837.herokuapp.com' ;
    this.localUrl = 'http://localhost:5000' ;

    this.herokuUrl = this.localUrl;
    this.url = this.herokuUrl + '/menuNew';
    this.billurl = this.herokuUrl + '/menuNew/post_order';
    this.addurl = this.herokuUrl + '/menuNew/menu_name';
    this.registerUrl = this.herokuUrl + '/users/register';
    this.loginUrl = this.herokuUrl + '/users/login';
    this.profileUrl = this.herokuUrl + '/users/userdetails/';
    this.getPaymenyUrl = this.herokuUrl + '/menuNew/payme';
    this.placedOrder = this.localUrl + '/orderNew/order';
    this.prevOrder = this.localUrl + '/orderNew/getOrder/';
    this.isloggedin = false;
    this.isadmin = false;
    this.selectedItems = [];
    this.cost = [];
    this.totalCost = 0;
    this.allItems = [];
    this.quantity =[];
    this.order = [];
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
    console.log('here in login' + JSON.stringify(user))
    return this.http.post<any>(this.loginUrl, user);
  }

  getUserInfo() {
    const url = this.profileUrl + this.userId
    // console.log('url=='+url+"end")
    return this.http.get<any>(this.profileUrl + this.userId);
  }

  getPayment(card: any) {
    return this.http.post<any>(this.getPaymenyUrl, card);
  }

  postOrder(orderToplace: any)
  {
    return this.http.post<any>(this.placedOrder, orderToplace);
  }
  getPrevOrders()
  {
    return this.http.get<any>(this.prevOrder + this.userId);
  }
}
