import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'al-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'awesome-list';

  constructor(private usersService: UsersService,
              private authService: AuthService) {}

  ngOnInit() {
    this.tryAutoLogin();
  }

  private tryAutoLogin() {
    // check stored identification token presence
    const token = localStorage.getItem('token');
    if (!token) { return; }

    // check stored token validity
    const expirationDate = +localStorage.getItem('expirationDate');
    const now = new Date().getTime();
    if (now >= expirationDate) {
      return;
    }

    // user connexion with stored data connexion
    const userId = localStorage.getItem('userId');
    this.usersService.get(userId, token).subscribe(user => {
      this.authService.autoLogin(user);
    });
  }
}
