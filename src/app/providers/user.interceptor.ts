import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let token = localStorage.getItem("userToken")
    if(token){
      request = request.clone({
        headers: request.headers.set(`Authorization`, `Bearer ${token}`)
      })
    }
    return next.handle(request);
  }
}
