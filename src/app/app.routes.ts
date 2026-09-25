import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // 🌟 RUTAS SEPARADAS E INDEPENDIENTES PARA LAS SOLICITUDES 🌟
  { 
    path: 'solicitudes/consultar', 
    loadComponent: () => import('./solicitudes/consultar-solicitud/consultar-solicitud.component').then(c => c.ConsultarSolicitudComponent) 
  },
  { 
    path: 'solicitudes/crear', 
    loadComponent: () => import('./solicitudes/crear-solicitud/crear-solicitud.component').then(c => c.CrearSolicitudComponent) 
  },

  { path: '**', redirectTo: 'login' }
];