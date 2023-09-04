import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IApiResponse } from 'src/app/models/common.Model';
import { GET_USER_PRODUCTS } from 'src/app/models/serverUrls';
import { ProductsService } from 'src/app/services/products.service';
import { ShopService } from 'src/app/services/shop.service';
import { IProducts } from '../products/products.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  products: any[] = []
  constructor(private productService: ProductsService,
    private shopService: ShopService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProducts()
  }

  public getProducts() {
    this.productService.getProducts().subscribe((res: any) => {
      // console.log(res)
      this.products = res.data
    })
  }

  addToCart(prodDetails: IProducts) {
    debugger;
    console.log(prodDetails)
    this.shopService.addProductToCart(prodDetails.prodID, 1).subscribe((res: IApiResponse) => {
      console.log(res);
      this.router.navigateByUrl("/shop/cart");

    })
  }
}
