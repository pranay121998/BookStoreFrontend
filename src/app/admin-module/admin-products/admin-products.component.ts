import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GET_ADMIN_PRODUCTS } from 'src/app/models/serverUrls';
import { ProductsService } from 'src/app/services/products.service';



export interface IProductResponse {
  prodID: string,
  title: string,
  price: number,
  description: string,
  imageUrl: string,
  userID: string,
  createdAt: string,
  updatedAt: string
}
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  adminProducts: IProductResponse[] = [];

  constructor(private http: HttpClient,
    private productService: ProductsService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAdminProducts();
  }

  getAdminProducts() {
    this.productService.getProductsByUsers().subscribe((res: any) => {
      this.adminProducts = res.data
    })
  }

  onEdit(productId: string) {
    this.router.navigateByUrl(`admin/EditProduct?prodId=${productId}&isEdit=${1}`)
  }

  onDelete(productId: string) {
    this.productService.deleteProductByProductId(productId).subscribe((res: any) => {
      console.log(res);

      // this.adminProducts = res.data
      this.getAdminProducts();

    })
  }

}
