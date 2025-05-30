import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  standalone: false,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authservice: AuthService) {}

  logout() {
    this.authservice.logout();
  }
}
