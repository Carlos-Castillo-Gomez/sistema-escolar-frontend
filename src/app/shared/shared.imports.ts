/* Elementos de angular material */

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

/**
 * SHARED_IMPORTS
 * -------------------------------------------------------------------------
 * Colección de módulos/directivas reutilizables en
 * componentes standalone.
 *
 * Se importa así:
 * imports: [...SHARED_IMPORTS, HeaderApp, FooterApp]
 */
export const SHARED_IMPORTS = [

  /* Angular Material */
  MatButtonModule,   // Permite usar botones estilizados de Angular Material (<button mat-button>, <button mat-raised-button>)
  MatDividerModule,  // Proporciona líneas divisorias estéticas (<mat-divider>)
  MatIconModule,     // Permite renderizar íconos de Material Icons (<mat-icon>)

];
