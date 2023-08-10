import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log("dfssdfsdfadfssa", req);
        if (this.authService.showHeader.subscribe()) {
            const token: null | string = sessionStorage.getItem("token");
            // console.log("dsfdfsdfs", token);

            const headers = req.headers.set('Authorization', token ? token : '');
            // console.log(headers);

            req = req.clone({
                headers
            });
            return next.handle(req)
        } else {
            // console.log(req);

            return next.handle(req)
        }
    }



}