import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GET_USER_PRODUCTS } from '../models/serverUrls';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }




}
