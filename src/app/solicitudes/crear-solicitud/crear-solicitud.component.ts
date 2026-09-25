import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SolicitudService } from '../../services/solicitud.service';
import { MedicamentoService } from '../../services/medicamento.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crear-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './crear-solicitud.component.html'
})
export class CrearSolicitudComponent implements OnInit {
  private fb = inject(FormBuilder);
  private solicitudService = inject(SolicitudService);
  private medicamentoService = inject(MedicamentoService); 
  private authService = inject(AuthService);
  private router = inject(Router);

  medicamentos: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  esNoPos: boolean = false; 

  solicitudForm: FormGroup = this.fb.group({
    idUsuario: [''],
    idMedicamento: ['', [Validators.required]],
    cantidad: ['', [Validators.required, Validators.min(1)]],
    numeroOrden: [''],
    direccion: [''],
    telefono: [''],
    correoElectronico: ['']
  });

  ngOnInit(): void {
    this.medicamentoService.listarMedicamentos().subscribe({
      next: (data) => this.medicamentos = data,
      error: (err) => console.error('Error al traer catálogo de medicamentos', err)
    });

    this.solicitudForm.get('idMedicamento')?.valueChanges.subscribe(idSeleccionado => {
      this.evaluarTipoMedicamento(Number(idSeleccionado));
    });
  }

  private evaluarTipoMedicamento(id: any): void {
    const idNumerico = Number(id); 
    
    const medSeleccionado = this.medicamentos.find(m => m.idMedicamento === idNumerico);
    
    if (medSeleccionado) {
      this.esNoPos = !medSeleccionado.esPos; 
      this.actualizarValidadoresCondicionales();
    } else {
      this.esNoPos = false;
    }
  }

  private actualizarValidadoresCondicionales(): void {
    const camposExtras = ['numeroOrden', 'direccion', 'telefono', 'correoElectronico'];

    camposExtras.forEach(campoName => {
      const control = this.solicitudForm.get(campoName);
      if (control) {
        if (this.esNoPos) {
          control.setValidators(campoName === 'correoElectronico' 
            ? [Validators.required, Validators.email] 
            : [Validators.required]);
        } else {
          control.clearValidators();
          control.setValue('');
        }
        control.updateValueAndValidity();
      }
    });
  }

  onSubmit(): void {
    if (this.solicitudForm.invalid) return;

    const idLogueado = this.authService.getUsuarioId();

    if (!idLogueado) {
      this.errorMessage = 'Sesión inválida o expirada. Por favor ingresa de nuevo.';
      return;
    }

    this.solicitudForm.patchValue({ idUsuario: idLogueado });

    this.solicitudService.crearSolicitud(this.solicitudForm.value).subscribe({
      next: () => {
        this.successMessage = '¡Solicitud registrada con éxito en la Nueva EPS!';
        setTimeout(() => this.router.navigate(['/solicitudes/consultar']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al procesar la solicitud.';
      }
    });
  }
}