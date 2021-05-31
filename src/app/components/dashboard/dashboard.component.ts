import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import {VaccineService} from '../../services/vaccine.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  stateList=[];
  districtList=[];
  centerList=[];
  filtercenterList=[];

  searchParam=0;

  isEditable=true;

  eighteen_plus=false;
  fortyfive_plus=false;
  avl_status=false;

  constructor(private vaccineService:VaccineService,
  private _formBuilder: FormBuilder,
  private router:Router
  ) { 

  	this.firstFormGroup = this._formBuilder.group({
      state: ['', Validators.required],
      district: ['',Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      pincode: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]]
    });

    this.thirdFormGroup = this._formBuilder.group({
      date: [new Date(),Validators.required]
    });
  }


  ngOnInit(): void {
  	
    this.callStates();

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

  callStates(){
  this.vaccineService.getAllStates().subscribe(data => {
  this.stateList=data.states;
  //console.log(this.stateList);
  }, error => console.log(error));
  }

  callDistricts(){
  this.vaccineService.getAllDistricts(parseInt(this.firstFormGroup.value.state)).subscribe(data => {
  	this.districtList=data.districts;
  	//console.log(data);
  }, error => console.log(error));
  }

  searchByPin(stepper:any){
  //console.log("I am from pincode!");
  if(this.secondFormGroup.value.pincode && !this.secondFormGroupControl.pincode.invalid){
  this.searchParam=1;
  stepper.next();
  //console.log(this.secondFormGroup.value.pincode)
  }
 
  }

  searchByDistrict(stepper:any){
	  if(this.firstFormGroup.value.state && this.firstFormGroup.value.district){
	  	this.searchParam=2;
	  	stepper.next();
	  	//console.log(this.firstFormGroup.value.state,this.firstFormGroup.value.district);
	  } 
  }

  parseDate(d:any) {
  	var todayTime = d;
	var month = todayTime.getMonth()+1;
	var day = todayTime.getDate();
	var year = todayTime.getFullYear();
	return day + "-" + month + "-" + year;
  }

  finalSubmit(stepper:any) {
  if(this.thirdFormGroup.value.date){
  	var dt=this.parseDate(this.thirdFormGroup.value.date);
  	if(this.searchParam === 1){

  		//console.log("Through Pin Code");
  		this.vaccineService.getVaccinationCentersByPincode(dt,this.secondFormGroup.value.pincode).subscribe(data => {
  			this.centerList=data.sessions;
  			this.filtercenterList=data.sessions;
  			//console.log(this.centerList);
  		}, error => console.log(error));

  	} else if(this.searchParam === 2){

  		//console.log("Through District");
  		this.vaccineService.getVaccinationCentersByDistrict(dt,this.firstFormGroup.value.district).subscribe(data => {
  			this.centerList=data.sessions;
  			this.filtercenterList=data.sessions;
  			//console.log(this.centerList);
  		}, error => console.log(error));

  	}
  	//console.log(this.thirdFormGroup.value.date);
  	//this.isEditable=false;
  	stepper.next();
  	}
  }

  resetForm(stepper:any){
	  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
	    this.router.navigate(['/dashboard']);
	  }); 
  }

  dis1=false;
  dis2=false;

  filterCriteria() {
 
  } 

   

}
