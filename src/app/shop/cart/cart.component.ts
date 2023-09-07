import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { IProduct } from 'src/app/admin-module/add-product/add-product.component';
import { IApiResponse } from 'src/app/models/common.Model';
import { ShopService } from 'src/app/services/shop.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { BASEURL } from 'src/app/models/serverUrls';
export interface ICart {
  userID: string;
  prodID: string;
  quantity: number
  createdAt: string;
  updatedAt: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  amount: number;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  imageUrlPath = BASEURL;
  cart: ICart[] = [];
  quantityNo!: number;
  constructor(private shopService: ShopService) { }

  totalAmount: number = 0;

  quantity: FormControl = new FormControl('');

  qaty: any = [];

  ngOnInit(): void {
    this.getCart()
  }



  getCart() {
    this.shopService.getCart().subscribe((res: IApiResponse) => {
      this.cart = res.data;
      this.totalAmount = 0;
      for (let i = 0; i < this.cart.length; i++) {
        this.totalAmount += Number(this.cart[i].amount);
      }
    })
  }



  getQunatity(prodDetails: ICart, qtyType: string, inputId?: number) {
    switch (qtyType) {
      case 'add': {
        if (Number(prodDetails.quantity) < 20) {
          prodDetails.quantity += 1;
          this.updateCartProduct(prodDetails);
        }
        break;
      }
      case 'minus': {
        if (Number(prodDetails.quantity) > 1) {
          prodDetails.quantity -= 1;
          this.updateCartProduct(prodDetails);
        }
        break;
      }
      case 'custom': {
        let currentId = `qty${inputId}`;
        let id = document.getElementById(currentId)!;
        let x = id.getAttribute('ng-reflect-model');

        if (Number(x) > 1 && Number(x) < 20) {
          prodDetails.quantity = Number(x);

        } else if (Number(x) >= 20) {
          prodDetails.quantity = 20;
        } else {
          prodDetails.quantity = 1;
        }
        this.updateCartProduct(prodDetails);
        break;
      }
      default: {
        this.updateCartProduct(prodDetails);
        break;
      }
    }


  }

  updateCartProduct(prodDetails: ICart) {
    this.shopService.addProductToCart(prodDetails.prodID, prodDetails.quantity).subscribe((res: IApiResponse) => {

      this.getCart();
    })
  }

  deleteCartProduct(prodDetails: ICart) {
    this.shopService.deleteCart(prodDetails.prodID).subscribe((res: IApiResponse) => {
      console.log(res);
      this.getCart();
    })
  }

  checkOut() {


    loadStripe('pk_test_51JPpHoSBqqFf02Xz8k0IMwNQadDplvdh6NDU5FO8hJwns9RYq2afO9f0a3qZNn36Or9YG78LyrjS4LKHDi5RpLtQ00N5MK6krc')
      .then((stripe: any) => {
        console.log(stripe);
        this.shopService.checkout(this.cart).subscribe((res: any) => {
          console.log(res);
          this.createPaymentLink(stripe, res.data)
        })
      }).catch((err: Error) => {
        console.log(err.message);
      });


  }



  createPaymentLink(stripe: Stripe, data: any) {
    stripe.redirectToCheckout({
      sessionId: `${data.id}`
    })
  }
}


