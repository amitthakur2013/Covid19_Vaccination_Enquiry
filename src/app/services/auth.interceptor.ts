import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { finalize } from "rxjs/operators";
import { LoaderService } from './loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(private loaderService: LoaderService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    let token=sessionStorage.getItem('token');
    if(token!=null){

    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : '*/*',
        'Authorization': `Bearer ${token}`
      },
    });
    
    }

    return next.handle(req).pipe(
            finalize(() => this.loaderService.hide())
        );
  }
}