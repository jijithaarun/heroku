import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegistrationService } from "../registration.service";
import { RegistrationForm } from "../registration-form";
import { State } from "../State";
import { Country } from "../Country";
import * as firebase from "firebase";
import { formatDate } from "@angular/common";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  companyForm: FormGroup;
  verificationForm: FormGroup;
  registration: RegistrationForm = new RegistrationForm();
  logo: File = null;

  step = 0;

  countries: Country[];
  states: State[];
  values: string;
  arr = [];

  //for storing and display image
  public imagePath;
  imgURL: any;
  public message: string;

  country: Country;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegistrationService,
    private toastr:ToastrService
  ) {
   
  }

  ngOnInit(): void {
    this.createForm();
    this.countries = this.registerService.getCountries();
    let values = JSON.stringify(this.countries);
    console.log("countries" + this.countries);
    this.onSelect(this.country.id);
  }

  createForm(){
     this.registerForm = this.formBuilder.group({
      name: [''],
      gender: [''],
      country: [''],
      state: [''],
      phone: [],
      companyForm: this.formBuilder.group({
        logo: [''],
        companyname: [''],
        email: [''],
        job: [''],
        year: [''],
        isactive: [''],
      }),
    });
  }

  onSubmit() {  
    

    console.log("form vslue" ,this.registerForm);

    const formData = new FormData();
    formData.append("register", JSON.stringify(this.registration));
    formData.append("logo", this.logo, this.logo.name);

    this.registerService.addRegistration(formData).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.toastr.success("Registration completed");
    this.router.navigateByUrl('/login');
    
  }

  onSelect(countryid) {
    this.states = this.registerService
      .getStates()
      .filter((item) => item.countryid == countryid);
    console.log("states", this.states);
  }

  preview(files) {
    if (files.length === 0) return;

    var filType = files[0].type;
    if (filType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  nextLevel() {
    this.step++;
  }
  
}
