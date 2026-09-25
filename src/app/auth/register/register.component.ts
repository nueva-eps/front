import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  successMessage: string = '';
  errorMessage: string = '';

  registerForm: FormGroup = this.fb.group({
    numeroDocumento: ['', [Validators.required]],
    primerNombre: ['', [Validators.required]],
    segundoNombre: [''], // Opcional
    primerApellido: ['', [Validators.required]],
    segundoApellido: [''], // Opcional
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    idTipoDocumento: [1, [Validators.required]] 
  });

  onRegister(): void {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'Usuario registrado con éxito. Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar el usuario';
      }
    });
  }
}