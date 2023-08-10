import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './auth/login/login.guard';
import { ShopGuard } from './shop/shop.guard';

const routes: Routes = [
  {
    path: 'shop', loadChildren: () =>
      import('./shop/shop.module').then(c => {
        // console.log(c.ShopModule)
        return c.ShopModule
      }), canActivate: [ShopGuard]
  },
  {
    path: 'admin', loadChildren: () => import('./admin-module/admin-module.module').then(m => {
      return m.AdminModuleModule
    })
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => {
      return m.AuthModule
    })
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
