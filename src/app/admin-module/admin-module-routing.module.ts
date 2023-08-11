import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';

const routes: Routes = [
    { path: "AddProduct", component: AddProductComponent },
    { path: "EditProduct", component: AddProductComponent },
    { path: 'AdminProducts', component: AdminProductsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
