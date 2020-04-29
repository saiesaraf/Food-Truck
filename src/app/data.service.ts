import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string;
  billurl: string;
  addurl: string;
  registerUrl: string;
  loginUrl: string;
  public isloggedin: boolean;
  constructor(private http: HttpClient) {
    console.log('i am in constructor')
    this.url = 'http://localhost:3000/menuNew';
    this.billurl = 'http://localhost:3000/menuNew/post_order';
    this.addurl = 'http://localhost:3000/menuNew/menu_name';
    this.registerUrl = 'http://localhost:3000/users/register';
    this.loginUrl = 'http://localhost:3000/users/login';
    this.isloggedin = false;
  }

  getMenu() {
    return this.http.get<any>(this.url);
  }

  getBill(order: any) {
    return this.http.post<any>(this.billurl, order);
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
}
