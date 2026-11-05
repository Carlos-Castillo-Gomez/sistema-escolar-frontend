import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { ErrorsService } from './tools/errors-service';
import { ValidatorService } from './tools/validator-service';

@Injectable({
  providedIn: 'root',
})
export class MaestrosService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private validatorService = inject(ValidatorService);
  private errorService = inject(ErrorsService);

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getSessionToken();
    return token
      ? new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
      : new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  // Lista base de materias para los checkboxes
  public getMaterias(): any[] {
    return [
      { id: 1, nombre: 'Aplicaciones Web' },
      { id: 2, nombre: 'Programación 1' },
      { id: 3, nombre: 'Bases de datos' },
      { id: 4, nombre: 'Tecnologías Web' },
      { id: 5, nombre: 'Minería de datos' },
      { id: 6, nombre: 'Desarrollo móvil' },
      { id: 7, nombre: 'Estructuras de datos' },
      { id: 8, nombre: 'Administración de redes' },
      { id: 9, nombre: 'Ingeniería de Software' },
      { id: 10, nombre: 'Administración de S.O.' },
    ];
  }

  public esquemaMaestro(): any {
    return {
      id: 0,
      rol: 'maestro',
      clave_maestro: '', // ID de trabajador
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmar_password: '',
      fecha_nacimiento: null,
      telefono: '',
      rfc: '',
      cubiculo: '',
      area_investigacion: '',
      materias_json: [], // Aquí se guardarán las materias seleccionadas
    };
  }

  public validarMaestro(data: any, editar: boolean) {
    const error: any = {};

    // ID de trabajador
    if (!this.validatorService.required(data['clave_maestro'])) {
      error['clave_maestro'] = this.errorService.required;
    }

    // Nombre y Apellidos
    if (!this.validatorService.required(data['first_name'])) {
      error['first_name'] = this.errorService.required;
    }

    if (!this.validatorService.required(data['last_name'])) {
      error['last_name'] = this.errorService.required;
    }

    // Correo Electrónico
    if (!this.validatorService.required(data['email'])) {
      error['email'] = this.errorService.required;
    } else if (!this.validatorService.max(data['email'], 40)) {
      error['email'] = this.errorService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    // Contraseñas (si no es edición)
    if (!editar) {
      if (!this.validatorService.required(data['password'])) {
        error['password'] = this.errorService.required;
      }

      if (!this.validatorService.required(data['confirmar_password'])) {
        error['confirmar_password'] = this.errorService.required;
      }
    }

    // Fecha de nacimiento
    if (!this.validatorService.required(data['fecha_nacimiento'])) {
      error['fecha_nacimiento'] = this.errorService.required;
    }

    // Teléfono
    if (!this.validatorService.required(data['telefono'])) {
      error['telefono'] = this.errorService.required;
    }

    // RFC (Mínimo 12 y Máximo 13 caracteres)
    if (!this.validatorService.required(data['rfc'])) {
      error['rfc'] = this.errorService.required;
    } else if (!this.validatorService.min(data['rfc'], 12)) {
      error['rfc'] = this.errorService.min(12);
    } else if (!this.validatorService.max(data['rfc'], 13)) {
      error['rfc'] = this.errorService.max(13);
    }

    // Cubículo
    if (!this.validatorService.required(data['cubiculo'])) {
      error['cubiculo'] = this.errorService.required;
    }

    // Área de Investigación
    if (!this.validatorService.required(data['area_investigacion'])) {
      error['area_investigacion'] = this.errorService.required;
    }

    // Materias (Al menos una seleccionada)
    if (!data['materias_json'] || data['materias_json'].length === 0) {
      error['materias_json'] = 'Por favor selecciona al menos una materia a impartir';
    }

    return error;
  }
}
