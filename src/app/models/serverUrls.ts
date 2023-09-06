import { HttpHeaders } from "@angular/common/http";

export const BASEURL = "http://192.168.100.29:8080/";
const API = "http://192.168.100.29:8080/api/";
//"http://localhost:3000";


export const http_options = {
    headers: new HttpHeaders({
        "withCredentials": "true"
        // "Cookie":
    }),
};

export const SIGN_UP = API + "Auth/SignUp";

export const LOGIN = API + "Auth/SignIn";//'/auth/login';

export const ADD_PRODUCT = API + "Admin/SaveProduct";//'/admin/add-product';

export const GET_PRODUCTS = API + "Admin/GetProduts";

export const GET_USER_PRODUCTS = API + "Admin/GetProductsByUser";//'/shop/products';

export const GET_PRODUCTS_BY_PRODUCTID = API + "Admin/GetProductsByProductId?prodId=";

export const GET_ADMIN_PRODUCTS = API + "Admin/GetProducts";

export const DELETE_ADMIN_PRODUCTS = API + 'Admin/DeleteProduct';


//shop api

export const ADD_TO_CART = API + 'Shop/AddToCart';

export const DELETE_FROM_CART = API + 'Shop/DeleteFromCart';

export const GET_CART = API + 'Shop/GetCart';

export const CHECKOUT = API + "Shop/CheckOut";

export const GET_ORDERS = `${API}Shop/GetOrders`;