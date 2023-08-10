import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GET_ADMIN_PRODUCTS } from 'src/app/models/serverUrls';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  adminProducts: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(GET_ADMIN_PRODUCTS).subscribe((res: any) => {
      this.adminProducts = res.data
    })
  }

}
