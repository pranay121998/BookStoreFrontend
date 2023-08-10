import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_PRODUCTS } from '../models/serverUrls';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  public getProductsService() {
    return this.http.get(GET_PRODUCTS)
  }
}
