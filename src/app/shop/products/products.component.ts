import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  constructor(private shopService: ShopService, private cookieService: CookieService) {

  }

  ngOnInit(): void {
    this.getProducts()
    console.log("fdsfds", this.cookieService.getCookie("connect.sid"));

  }
  getCookies() {
    document.cookie
  }
  public getProducts() {
    this.shopService.getProductsService().subscribe((res: any) => {
      console.log(res)
      this.products = res.data
    })
  }
}
