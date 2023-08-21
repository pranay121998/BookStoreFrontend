import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { PATTERN } from 'src/app/models/pattern';
import { LOGIN } from 'src/app/models/serverUrls';
import { AuthService } from 'src/app/services/auth.service';
import { MatError, MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl(''),
    password: new UntypedFormControl('')
  })
  errorMsg: string | undefined;
  constructor(private fb: UntypedFormBuilder, private http: HttpClient, private router: Router, private auth: AuthService) { }

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

      this.router.navigate(["/shop/index"])
    })
  }


}
