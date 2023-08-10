import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IApiResponse } from 'src/app/models/common.Model';
import { AuthService, ISignUp } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild("signUpFormView", { static: false }) signUpFormView!: NgForm;

  errorMsg: string = "";
  signUpForm: FormGroup = new FormGroup({
    email: new FormControl(""),
    userPassword: new FormControl(""),
    confirmPassword: new FormControl("")
  });
  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ["", [Validators.required]],
      userPassword: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    }, {
      validators: this.ConfrimPasswordValidators("userPassword", "confirmPassword")
    })
  }


  get f() {
    return this.signUpForm.controls
  }
  signup() {
    const formValue = this.signUpForm.value
    let userData: ISignUp = {
      email: formValue.email,
      UserPassWord: formValue.userPassword,
      confirmPassword: formValue.confirmPassword
    };

    this.auth.signUp(userData).subscribe((res: IApiResponse) => {
      console.log(res);
      if (res.errorCode == true) {
        alert(res.msg)
      } else {
        this.router.navigateByUrl("auth/login");
      }
      this.signUpFormView.resetForm();
    })
  }

  ConfrimPasswordValidators(password: string, confirmPassword: string) {
    return (fromGroup: FormGroup) => {
      const pass = this.signUpForm.controls[password];
      const cPass = this.signUpForm.controls[confirmPassword];
      if (pass.value && !cPass.value) {
        cPass.setErrors({ required: true });
      } else if (pass.value !== cPass.value) {
        cPass.setErrors({ confirmPasswordError: true })
      } else {
        cPass.setErrors(null);
      }
    }


  }

}
