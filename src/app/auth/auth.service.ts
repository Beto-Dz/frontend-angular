import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../interfaces/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
          }
        })
      );
  }

  logout(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.post(`${this.baseUrl}/auth/logout`, {}, { headers }).subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('Logout successful');
        this.router.navigate(['/auth']);
      },
      error: (err) => {
        console.error('Logout failed', err);
      },
    });
  }

  isLoggedIn(): boolean {
    return (
      isPlatformBrowser(this.platformId) && !!localStorage.getItem('token')
    );
  }

  getUser() {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
