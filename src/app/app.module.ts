import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndexComponent } from './components/index/index.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './components/products/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PayViewComponent } from './components/pay-view/pay-view.component';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { AddProductComponent } from './components/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    AboutUsComponent,
    ProductsComponent,
    ProductCardComponent,
    NotFoundComponent,
    PayViewComponent,
    AddProductComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
