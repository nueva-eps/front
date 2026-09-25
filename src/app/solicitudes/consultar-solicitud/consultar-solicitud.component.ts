import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'app-consultar-solicitud',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'consultar-solicitud.component.html'
})
export class ConsultarSolicitudComponent implements OnInit {
  private solicitudService = inject(SolicitudService);
  private cdr = inject(ChangeDetectorRef);

  solicitudes: any[] | null = null;
  errorMessage: string = '';
  paginaActual: number = 0;
  totalPaginas: number = 0;
  tamanoPagina: number = 3; 

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.solicitudService.listarSolicitudes(this.paginaActual, this.tamanoPagina).subscribe({
      next: (response) => {
        this.solicitudes = response.content; 
        this.totalPaginas = response.totalPages;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = 'No se pudieron cargar las solicitudes.';
        this.cdr.detectChanges();
      }
    });
  }

  paginaSiguiente(): void {
    if (this.paginaActual < this.totalPaginas - 1) {
      this.paginaActual++;
      this.cargarSolicitudes(); 
    }
  }

  paginaAnterior(): void {
    if (this.paginaActual > 0) {
      this.paginaActual--;
      this.cargarSolicitudes();
    }
  }
}