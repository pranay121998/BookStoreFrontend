import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/admin-module/add-product/add-product.component';
import { IApiResponse } from 'src/app/models/common.Model';
import { BASEURL } from 'src/app/models/serverUrls';
import { CookieService } from 'src/app/services/cookie.service';
import { ProductsService } from 'src/app/services/products.service';
import { ShopService } from 'src/app/services/shop.service';
export interface IProducts {
  createdAt: string;
  description: string;
  imageUrl: string;
  price: number;
  prodID: string;
  title: string;
  updatedAt: string;
  userID: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  imageUrlPath = BASEURL;
  constructor(private shopService: ShopService,
    private cookieService: CookieService,
    private productService: ProductsService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getProducts()
    console.log("fdsfds", this.cookieService.getCookie("connect.sid"));

  }
  getCookies() {
    document.cookie
  }
  public getProducts() {
    this.productService.getProductsByUsers().subscribe((res: any) => {
      console.log(res)
      this.products = res.data
    })
  }


  addToCart(prodDetails: IProducts) {
    debugger;
    this.shopService.addProductToCart(prodDetails.prodID, 1).subscribe((res: IApiResponse) => {
      console.log(res);
      this.router.navigateByUrl("/shop/cart")

    })
  }
}
