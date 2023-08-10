import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { PATTERN } from 'src/app/models/pattern';
import { LOGIN } from 'src/app/models/serverUrls';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  errorMsg: string | undefined;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(PATTERN.EMAIL)]],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.loginForm.controls
  }

  login() {
    console.log(this.loginForm)
    this.errorMsg = ''
    if (this.loginForm.invalid) {
      this.errorMsg = 'Please fill details correctly.'
      return;
    }
    let loginRequest = {
      "email": this.loginForm.value.email,
      "userpassWord": this.loginForm.value.password
    }
    this.auth.login(loginRequest).subscribe((res: any) => {
      // this.setToken(res.data.token, res.data.token_type)
      console.log(res)
      let t = res.data.expiresIn.split(".")[0];
      let date = new Date().getUTCDate() - new Date(t).getUTCDate();

      this.auth.autoLogout(date * 60 * 60 * 1000);
      this.router.navigate(["/shop/index"])
    })
  }


}
