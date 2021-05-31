import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  constructor(private http: HttpClient) { }

  getAllStates(): Observable<any> {
    return this.http.get('https://cdn-api.co-vin.in/api/v2/admin/location/states');
  }

  getAllDistricts(stateId:number): Observable<any> {
    return this.http.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`);
  }

  getVaccinationCentersByDistrict(date:string,dist_id:number): Observable<any> {
    return this.http.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${dist_id}&date=${date}`);
  }

  getVaccinationCentersByPincode(date:string,pin:number): Observable<any> {
    return this.http.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`);
  }

  getOtp(mob:any): Observable<any> {
    return this.http.post(`https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`, mob);
  }

  confirmOtp(data:any): Observable<any> {
    return this.http.post(`https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP`, data);
  }

  certdownload(id:any): Observable<any> {
  	let headers = new HttpHeaders();
  	headers = headers.set('Accept', 'application/pdf');
    return this.http.get(`https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=${id}`,{ headers: headers, responseType: 'blob' });
  }
}
