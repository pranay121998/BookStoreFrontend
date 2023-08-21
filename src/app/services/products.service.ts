import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../admin-module/add-product/add-product.component';
import { IApiResponse } from '../models/common.Model';
import { ADD_PRODUCT, DELETE_ADMIN_PRODUCTS, GET_PRODUCTS_BY_PRODUCTID, GET_USER_PRODUCTS } from '../models/serverUrls';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getProductsByUsers() {
    return this.http.get(GET_USER_PRODUCTS)
  }

  public getProductsByProductId(productId: string) {
    return this.http.get<IApiResponse>(`${GET_PRODUCTS_BY_PRODUCTID}${productId}`);
  }

  public saveProductDetails(productData: FormData) {
    return this.http.post(ADD_PRODUCT, productData);
  }

  public getImageFromServer(url: string) {
    return this.http.get(url, { responseType: "blob" });
  }

  public deleteProductByProductId(productId: string) {
    return this.http.delete(DELETE_ADMIN_PRODUCTS + "?ProdId=" + productId)

  }
}
