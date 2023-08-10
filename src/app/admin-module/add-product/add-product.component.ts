import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ADD_PRODUCT } from 'src/app/models/serverUrls';
export interface IProduct {
  Title: string;
  Price: number,
  Description: string,
  Images: string,
  ProdID: string
}


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productData: IProduct = {
    Title: '',
    Price: 0,
    Description: '',
    Images: '',
    ProdID: ''
  };

  productForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    imageUrl: new FormControl(''),
    price: new FormControl(''),
    desc: new FormControl('')
  });

  errorMsg: string | undefined;
  url: any | undefined | null;
  baseUrl!: File;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      imageUrl: ['', [Validators.required, , Validators.minLength(8)]],
      price: ['', Validators.required],
      desc: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  get f() {
    return this.productForm.controls
  }
  onUploadFile(event: any) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(event.target.files[0])
      this.productForm.patchValue({ imageUrl: event.target.files[0].name })
      // this.productForm.controls["imageUrl"].setValue(event.target.files[0])
      this.baseUrl = event.target.files[0]


      // fileReader.onload = (e: any) => {
      //   this.productForm.patchValue({ imageUrl: event.target.files[0].name })
      //   // this.productForm.controls["imageUrl"].setValue(event.target.files[0])
      //   // if(this.productData != undefined){
      //   this.baseUrl = e.target.files[0]

      //   // }
      //   console.log(this.baseUrl);

      // }
    }

  }
  public onAddProduct(): void | any {
    console.log(this.productForm)
    this.errorMsg = ''
    if (this.productForm.invalid) {
      this.errorMsg = 'Please fill all details.'
      return false;
    }
    this.productData.Title = this.productForm.value.title;
    this.productData.Description = this.productForm.value.desc;
    this.productData.Price = this.productForm.value.price;
    this.productData.Images = this.baseUrl.name;
    //this.productData.imageUrl = this.baseUrl//this.productForm.value.imageUrl
    console.log(this.productData, this.baseUrl);
    const formData = new FormData();
    formData.append("ProductImage", this.baseUrl);
    formData.append("JsonData", JSON.stringify(this.productData));
    // formData.append("title", this.productData.title)
    // formData.append("desc", this.productData.desc)
    // formData.append("price", this.productData.price.toString());
    console.log(formData)
    this.http.post(ADD_PRODUCT, formData).subscribe((res: any) => {
      console.log(res);
      if (res.successcode !== "0") {
        this.router.navigate(['/admin/AdminProducts'])
      }
    })

  }
}
