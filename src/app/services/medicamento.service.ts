import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {
  private http = inject(HttpClient);
  
  private API_URL = 'http://localhost:8082/medicamentos'; 

  listarMedicamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/list`);
  }
}