import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { IApiResponse } from "../models/common.Model";
import { LOGIN, SIGN_UP } from "../models/serverUrls";
@Injectable({
    providedIn: "root"
})

export class AuthService {

    private isLog = new BehaviorSubject<boolean>(false)


    constructor(private router: Router, private http: HttpClient) {
        const token = sessionStorage.getItem('token');
        if (token) {
            this.isLog.next(true)
        } else {
            this.isLog.next(false)
        }
    }

    public get active() {
        return this.showHeader.subscribe((res: boolean) => { return res });
    }

    public get isLogedIn() {//not used
        const token = sessionStorage.getItem('token');
        // if (token) {
        //     this.isLog.next(true)
        // } else {
        //     this.isLog.next(false)
        // }
        return token == "" || token == null ? false : true;
    }

    public get showHeader(): Observable<boolean> {
        // const token = sessionStorage.getItem('token');
        // if (token) {
        //     this.isLog.next(true)
        // } else {
        //     this.isLog.next(false)
        // }
        return this.isLog.asObservable();
    }

    signUp(value: ISignUp) {
        return this.http.post<IApiResponse>(SIGN_UP, value);
    }

    login(value: any) {

        return this.http.post(LOGIN, value).pipe(tap((res: any) => {
            debugger
            this.setToken(res.data.token, res.data.token_type)
            // this.setToken(res.data, "Bearer")
            let t = res.data.expiresIn;
            let date = new Date().getUTCDate() - new Date(t).getUTCDate();
            console.log(date, new Date().getUTCDate(), new Date(t).getUTCDate(), t);

            this.autoLogout(date * 3600 * 1000);
            this.isLog.next(true);

        }));
    }
    logOut() {
        sessionStorage.clear()
        this.isLog.next(false)
        this.router.navigate(['/auth/login'], { replaceUrl: true })
    }
    autoLogout(expireTime: number) {
        debugger
        setTimeout(() => {
            this.logOut();
        }, expireTime);
    }
    private setToken(token: string, type: string) {
        sessionStorage.setItem("token", type + " " + token)
    }

}
export interface ISignUp {
    email: string;
    UserPassWord: string;
    confirmPassword: string;
}