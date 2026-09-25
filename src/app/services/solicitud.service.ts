import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:8082'; 

  crearSolicitud(solicitudData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/solicitudes/create`, solicitudData);
  }

  listarSolicitudes(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/solicitudes/list?page=${page}&size=${size}`);
  }

  listarMedicamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/medicamentos/list`);
  }
}