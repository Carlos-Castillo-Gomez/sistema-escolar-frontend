import { Component, inject, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { MaestrosService } from '../../services/maestros-service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-registro-maestros',
  standalone: true,
  imports: [...SHARED_IMPORTS, MatDatepickerModule, MatCheckboxModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './registro-maestros.html',
  styleUrl: './registro-maestros.scss',
})
export class RegistroMaestros implements OnInit {
  @Input() rol: string = '';
  @Input() datos_user: any = {};

  private location = inject(Location);
  private maestrosService = inject(MaestrosService);

  public maestro: any = {};
  public errors: any = {};
  public editar: boolean = false;
  public idUser: number = 0;

  public materias: any[] = []; // Lista de materias

  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  constructor() {}

  ngOnInit(): void {
    this.maestro = this.maestrosService.esquemaMaestro();
    this.materias = this.maestrosService.getMaterias();
    console.log('Datos del maestro:', this.maestro);
  }

  public regresar(): void {
    this.location.back();
  }

  public showPassword(): void {
    if (this.inputType_1 === 'password') {
      this.inputType_1 = 'text';
      this.hide_1 = true;
    } else {
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public showPwdConfirmar(): void {
    if (this.inputType_2 === 'password') {
      this.inputType_2 = 'text';
      this.hide_2 = true;
    } else {
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  // Manejo de la selección múltiple de materias[cite: 10]
  public checkboxChange(event: any, nombreMateria: string): void {
    if (event.checked) {
      this.maestro.materias_json.push(nombreMateria);
    } else {
      const index = this.maestro.materias_json.indexOf(nombreMateria);
      if (index > -1) {
        this.maestro.materias_json.splice(index, 1);
      }
    }
  }

  public isMateriaSelected(nombreMateria: string): boolean {
    return this.maestro.materias_json && this.maestro.materias_json.includes(nombreMateria);
  }

  public registrar(): void {
    this.errors = {};
    this.errors = this.maestrosService.validarMaestro(this.maestro, this.editar);

    console.log('Errores de validación:', this.errors);

    if (Object.keys(this.errors).length > 0) {
      return;
    }

    // TODO: Implementar lógica de envío a backend
  }

  public actualizar(): void {}

  public soloLetras(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);

    if (
      !(charCode >= 65 && charCode <= 90) &&
      !(charCode >= 97 && charCode <= 122) &&
      charCode !== 32
    ) {
      event.preventDefault();
    }
  }
}
