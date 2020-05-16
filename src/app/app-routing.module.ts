import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';


/*const routes: Routes = [
  { path: 'main-home', component: MainHomeComponent},
  { path: 'login', component : LoginComponent },
  { path: 'Register', component : RegisterComponent},
  { path: 'home', component : HomeComponent },
];*/

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
