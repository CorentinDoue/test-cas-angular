import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/never';
import { AuthService } from './auth.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    login() {
        this.authService.login();
        return Observable.never(); // block until reload
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (!this.authService.bearer) {
            this.login();
        }

        return next.handle(this.authService.requestAddBearer(req))
            .catch(error => {
                if (error.status === 401) {
                    if (!req.params.has('onInit')) {
                        alert('Session timeout, will restart...');
                    }
                    return this.login();
                } else {
                    return Observable.throw(error);
                }
            });
    }

}
