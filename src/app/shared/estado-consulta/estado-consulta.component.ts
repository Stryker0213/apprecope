import { Component, EventEmitter, Input, Output } from '@angular/core';

/** Panel de carga o de error mientras no hay datos que mostrar. */
@Component({
  selector: 'app-estado-consulta',
  templateUrl: './estado-consulta.component.html',
  styles: ':host { display: block; }'
})
export class EstadoConsultaComponent {
  @Input() titulo = '';
  @Input() error = '';
  @Output() reintentar = new EventEmitter<void>();
}
