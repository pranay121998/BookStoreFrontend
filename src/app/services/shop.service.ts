import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse } from '../models/common.Model';
import { ADD_TO_CART, CHECKOUT, DELETE_FROM_CART, GET_CART, GET_ORDERS, GET_USER_PRODUCTS } from '../models/serverUrls';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  addProductToCart(productId: string, quantity: number) {
    return this.http.post<IApiResponse>(ADD_TO_CART, { prodId: productId, quantity: quantity });
  }

  getCart() {
    return this.http.get<IApiResponse>(GET_CART);
  }

  deleteCart(productId: string) {
    // return this.http.delete(DELETE_ADMIN_PRODUCTS + "?ProdId=" + productId)
    return this.http.post<IApiResponse>(DELETE_FROM_CART + "/" + productId, null);
  }

  checkout(cartItems: any) {
    return this.http.post(CHECKOUT, cartItems);
  }

  getOrders() {
    return this.http.get<IApiResponse>(GET_ORDERS);
  }


}
