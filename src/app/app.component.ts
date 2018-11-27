import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inconnu';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser() {
      this.http.get<any>('http://test-api.emse.fr/public/index.php/user').subscribe(user => {
        this.title = user.id;
      });
  }
}
