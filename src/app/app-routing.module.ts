import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CartComponent } from './components/cart/cart.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PayViewComponent } from './components/pay-view/pay-view.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsComponent } from './components/products/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/guard/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'products/:id', component: ProductCardComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: '404', component: NotFoundComponent },
  {
    path: 'proceedtopay',
    component: PayViewComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
