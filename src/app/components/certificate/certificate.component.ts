import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import {VaccineService} from '../../services/vaccine.service';
import * as CryptoJS from 'crypto-js';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private vaccineService:VaccineService,
  private _formBuilder: FormBuilder,
  private router:Router,
  private sanitizer: DomSanitizer
  ) {
	this.firstFormGroup = this._formBuilder.group({
      mobNo: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]]
    });

    this.secondFormGroup = this._formBuilder.group({
      otp: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]]
    });

    this.thirdFormGroup = this._formBuilder.group({
      refId: ['',Validators.required]
    });
   }

  ngOnInit(): void {
  }

   get secondFormGroupControl() {
    return this.secondFormGroup.controls;
  }

  get firstFormGroupControl() {
    return this.firstFormGroup.controls;
  }

  get thirdFormGroupControl() {
    return this.thirdFormGroup.controls;
  }

  showCnfOtp=false;
  txnId:any;
  encryptOtp:any;

  getOtp(){
  if(this.firstFormGroup.value.mobNo && !this.firstFormGroupControl.mobNo.invalid){
  	//console.log(this.firstFormGroup.value.mobNo);
  	var mob={
  	mobile:this.firstFormGroup.value.mobNo
  	}
  	this.vaccineService.getOtp(mob).subscribe((data) => {
  		//console.log(data);
  		this.txnId=data.txnId;
  		this.showCnfOtp=true;
  	},error =>{ console.log(error); Swal.fire('Oops...', error['error'], 'error')});

  	
  }
  
  }

  showRefId=false;

  confirmOtp(){
  	if(this.secondFormGroup.value.otp && !this.secondFormGroupControl.otp.invalid){
  	//console.log(this.secondFormGroup.value.otp);
  	var data={
  		otp:CryptoJS.SHA256(this.secondFormGroup.value.otp).toString(CryptoJS.enc.Hex),
  		txnId:this.txnId
  	}
  	this.vaccineService.confirmOtp(data).subscribe(data => {
  	sessionStorage.setItem('token',data.token);
  	this.showRefId=true;
  	//console.log(data);
  	},error => {console.log(error);Swal.fire('Oops...', error['error'].error, 'error')});
  	//console.log(data);
  	
  }
  }

  hr:any;
  toggle_down=false;

  downloadCert(){
  	if(this.thirdFormGroup.value.refId && !this.thirdFormGroupControl.refId.invalid){
  	//console.log(this.thirdFormGroup.value.refId);

  	this.vaccineService.certdownload(this.thirdFormGroup.value.refId.trim()).subscribe(data=>{
  	//console.log(data);
  	this.hr=this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
  	Swal.fire('Done!', "Certificate Ready!", 'success');
  	this.toggle_down=true;

  	},error => {console.log(error);Swal.fire('Oops...', error['error'].error, 'error')});
  	
  	}
  }

  resetForm(){
	  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
	    this.router.navigate(['/certificate']);
	  }); 
  }

}
