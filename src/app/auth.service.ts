import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpBackend, HttpRequest, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class AuthService {
    bearer: string;

    constructor(private http: HttpBackend) {
        const m = window.location.href.match(/(.*)[&?]ticket=([^&?]*)$/);
        if (m) {
            const [_, ourUrl, ticket] = m;
            console.log('got ticket from url ' + ticket);

            this.ticket2bearer(ticket, ourUrl).finally(() => {
                // remove from url:
                history.replaceState({}, null, ourUrl);
            }).subscribe(bearer => {
                this.bearer = bearer;
                console.log('got bearer from login ' + this.bearer);
                sessionStorage['bearer'] = this.bearer;
            });
        } else if (sessionStorage['bearer']) {
            this.bearer = sessionStorage['bearer'];
            console.log('got bearer from sessionStorage ' + this.bearer);
        } else {
            this.login();
        }
    }

    ticket2bearer(ticket, service) {
        const url = `http://test-api.emse.fr/public/index.php/login?service=` +
        `${encodeURIComponent(service)}&ticket=${encodeURIComponent(ticket)}`;
        // const url = `backend/login.php?service=${encodeURIComponent(service)}&ticket=${encodeURIComponent(ticket)}`;
        // return this.http.handle(new HttpRequest('POST',
        //   url,
        //   {service: encodeURIComponent(service), ticket: encodeURIComponent(ticket)}
        //   )
        return this.http.handle(new HttpRequest('GET', url)
        ).mergeMap(resp => (
            resp instanceof HttpResponse && resp.body && [resp.body['bearer']] || []
        ));
    }

    login() {
        window.location.href = `http://${environment.cas_login_url}?service=${encodeURIComponent(window.location.href)}`;
    }

    requestAddBearer(req) {
        return req.clone({ setHeaders: { 'Authorization': `Bearer ${this.bearer}` } });
    }
}
