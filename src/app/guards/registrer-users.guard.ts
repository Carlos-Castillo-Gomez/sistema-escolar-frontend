import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

// La ruta pública solo debe coincidir cuando no hay una sesión iniciada.
export const publicRegisterMatch: CanMatchFn = () => {
  const authService = inject(AuthService);
  return !authService.getSessionToken()?.trim();
};

// Controla quién puede acceder al formulario de registro de usuarios.
export const registerGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si no existe token, se trata de un visitante realizando un registro público.
  const token = authService.getSessionToken();

  if (!token?.trim()) {
    return true;
  }

  // Un usuario autenticado debe tener un rol autorizado para registrar cuentas.
  const userRole = authService.getUserRole();

  if (userRole === 'administrador' || userRole === 'maestro') {
    return true;
  }

  /*
   * Los alumnos y los roles desconocidos no pueden registrar usuarios.
   * Devolvemos un UrlTree para que Angular realice la redirección directamente.
   */
  return router.createUrlTree(['/home']);
};
