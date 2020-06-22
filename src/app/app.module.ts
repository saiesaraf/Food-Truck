import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MenuComponent } from './menu/menu.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { RouterModule, RouterOutlet, Routes} from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MDBBootstrapModule, IconsModule } from 'angular-bootstrap-md';
import { FlashMessagesModule, FlashMessagesComponent } from 'angular2-flash-messages';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainHomeComponent } from './main-home/main-home.component';
import {MatCardModule} from '@angular/material/card';
import { DataService } from './data.service';
import { LogoutComponent } from './logout/logout.component';
import { OwlModule } from 'ngx-owl-carousel';
import { AddCartComponent } from './add-cart/add-cart.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { BackgroundComponent } from './background/background.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminComponent } from './admin/admin.component';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { SocialLoginModule } from 'angularx-social-login';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('440531690672-3cmbjc8jhpd86eil1ms0iioqvls0sf3r.apps.googleusercontent.com')
  },
  {
   id: FacebookLoginProvider.PROVIDER_ID,
  provider: new FacebookLoginProvider('867958547027849')
  },
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("78iqy5cu2e1fgr")
  // }
]);

const routes: Routes = [
  { path: 'menu', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user-profile', component: UserProfileComponent},
  { path: 'addmenu', component: AddMenuComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'main', component: BackgroundComponent},
  {path: 'admin', component: AdminComponent}
];

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AddMenuComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    MainHomeComponent,
    LogoutComponent,
    AddCartComponent,
    BackgroundComponent,
    PaymentComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    SocialLoginModule,
    // MDBBootstrapModule.forRoot(),
    MatToolbarModule,
    IconsModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(routes),
    OwlModule,
    MatGridListModule,
    Ng2SearchPipeModule

  ],
  providers: [
    DataService,
    {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
