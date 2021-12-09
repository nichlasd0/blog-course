import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login('Nichlas', '123456').subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
        console.log('username or password is wrong');
      }
    );
  }
}
