import { HttpHeaders } from "@angular/common/http";

const api = "http://192.168.100.29:8080/api/";//"http://localhost:3000";


// export const http_options = {
//     headers: new HttpHeaders({
//         "withCredentials": "true"
//         // "Cookie":
//     }),  
// };

export const SIGN_UP = api + "Auth/SignUp";

export const LOGIN = api + "Auth/SignIn";//'/auth/login';

export const ADD_PRODUCT = api + "Admin/SaveProduct";//'/admin/add-product';

export const GET_PRODUCTS = api + "Admin/GetProducts";//'/shop/products';

export const GET_ADMIN_PRODUCTS = api + "Admin/GetProducts";
