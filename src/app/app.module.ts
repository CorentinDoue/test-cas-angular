import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { RequestInterceptorService } from './request-interceptor.service';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
