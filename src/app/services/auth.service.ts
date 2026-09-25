import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  
  private API_URL = 'http://localhost:8081/auth'; 

  login(credentials: any): Observable<string> {
    return this.http.post(`${this.API_URL}/login`, credentials, { responseType: 'text' })
      .pipe(
        tap(token => {
          localStorage.setItem('token_nueva_eps', token);
        })
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData);
  }

  getToken(): string | null {
    return localStorage.getItem('token_nueva_eps');
  }

  logout(): void {
    localStorage.removeItem('token_nueva_eps');
  }

  getUsuarioId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const decoded: any = jwtDecode(token);
      return decoded.idUsuario ? Number(decoded.idUsuario) : null;
    } catch (error) {
      console.error('Error al decodificar el token', error);
      return null;
    }
  }
}