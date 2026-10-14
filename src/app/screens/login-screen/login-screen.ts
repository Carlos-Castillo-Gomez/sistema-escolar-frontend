import { Component, inject, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { NgClass } from '../../../../node_modules/@angular/common/common_module.d';
import { Router } from 'express';

@Component({
  selector: 'app-login-screen',
  imports: [
    ...SHARED_IMPORTS,
    NgClass
],
  templateUrl: './login-screen.html',
  styleUrl: './login-screen.scss',
})
export class LoginScreen implements OnInit {

  /* Inyeccion de dependencias   */

  /* public router = inject(Router); */

  /* Se definen las variables globales que se utilizaran en el componente */
  public username: string = '';
  public password: string = '';
  public load: boolean = false;
  public errors: any = {};
  public typeInput: string = 'password';

  constructor() { }

  ngOnInit(): void {/* Esta funcion renderiza por primera vez */


  }

  public login() {

  }

  public showPassword() {
  }

  public registrar() {

  }

  public olvidecontraseña() {
  }
}
