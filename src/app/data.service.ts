import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string;
  billurl: string;
  addurl: string;
  registerUrl: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/menu';
    this.billurl = 'http://localhost:3000/post_order';
    this.addurl = 'http://localhost:3000/menu_name';
    this.registerUrl = 'http://localhost:3000/users/register'
  }

  getMenu(){
    return this.http.get<any>(this.url)
  }

  getBill(order: any){
    return this.http.post<any>(this.billurl, order);
  }

  addMenu(menu: any){
    return this.http.post<any>(this.addurl, menu);
  }

  registerUser(user: any){
    return this.http.post<any>(this.registerUrl, user);
  }


}
