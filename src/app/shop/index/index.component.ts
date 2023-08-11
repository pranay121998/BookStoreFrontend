import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GET_USER_PRODUCTS } from 'src/app/models/serverUrls';
import { ProductsService } from 'src/app/services/products.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  products: any[] = []
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  public getProducts() {
    // this.shopService.getProductsService().subscribe((res: any) => {
    //   // console.log(res)
    //   this.products = res.data
    // })
  }


}
