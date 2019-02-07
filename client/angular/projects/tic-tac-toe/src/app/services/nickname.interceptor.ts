import { Injectable, Inject, InjectionToken } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { NicknameStoreService } from './nickname-store.service';
import { Observable } from 'rxjs';

export const NicknameStoreInjector = new InjectionToken('nickname.injector');

@Injectable()
export class NicknameInterceptor implements HttpInterceptor {

  // constructor

  constructor(@Inject(NicknameStoreInjector) public nicknameStore: NicknameStoreService) {    
  }
  
  // public functions

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Nickname: `${this.nicknameStore.nickname}`
      }
    });
    return next.handle(request);
  }
}
