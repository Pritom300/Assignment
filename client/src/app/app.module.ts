import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component'; 
import { ProductService } from './services/product.service';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { ProductupdateComponent } from './productupdate/productupdate.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { ProductdeleteComponent } from './productdelete/productdelete.component';

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProductsComponent,
    ProductdetailsComponent,
    ProductupdateComponent,
    ProductaddComponent,
    ProductdeleteComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
    

  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
