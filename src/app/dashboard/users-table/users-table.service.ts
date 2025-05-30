import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { Observable, catchError, of } from 'rxjs';
import { User } from '../../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class UsersTableService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Versión que retorna Observable para suscribirse desde el componente
  getUsers(): Observable<User[]> {
    const token = this.authService.getToken();

    if (!token) {
      console.warn('No se encontró token. Abortando petición.');
      return of([]); // Retorna un observable vacío
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<User[]>(this.baseUrl, { headers }).pipe(
      catchError((err) => {
        console.error('Error al obtener usuarios:', err);
        return of([]); // Retorna un array vacío en caso de error
      })
    );
  }

  // Versión alternativa que retorna Promise
  async fetchUsers(): Promise<User[]> {
    try {
      const token = this.authService.getToken();
      if (!token) {
        console.warn('No se encontró token. Abortando petición.');
        return [];
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      return (
        (await this.http.get<User[]>(this.baseUrl, { headers }).toPromise()) ??
        []
      );
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
      return [];
    }
  }

  // Método para eliminar un usuario
  deleteUser(id: number): Observable<void> {
    const token = this.authService.getToken();

    if (!token) {
      console.warn('No se encontró token. Abortando petición de eliminación.');
      return of();
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers }).pipe(
      catchError((err) => {
        console.error('Error al eliminar usuario:', err);
        return of();
      })
    );
  }

  addUser(user: User): Observable<User> {
    const token = this.authService.getToken();
    if (!token) {
      console.warn('No token. Abortando creación de usuario.');
      return of();
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post<User>(this.baseUrl, user, { headers }).pipe(
      catchError((err) => {
        console.error('Error al agregar usuario:', err);
        return of();
      })
    );
  }

  // Actualizar usuario
  updateUser(id: number, user: User): Observable<User> {
    const token = this.authService.getToken();
    if (!token) {
      console.warn('No token. Abortando actualización.');
      return of();
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.put<User>(`${this.baseUrl}/${id}`, user, { headers }).pipe(
      catchError((err) => {
        console.error('Error al actualizar usuario:', err);
        return of();
      })
    );
  }
}
