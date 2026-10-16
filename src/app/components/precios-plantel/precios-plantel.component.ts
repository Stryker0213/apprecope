import { Component, inject } from '@angular/core';
import { PreciosCombustibles } from '../../models/precios-combustibles';
import { RecopeApiService } from '../../services/recope-api.service';
import { ListadoPrecios } from '../../shared/listado-precios';

@Component({
  selector: 'app-precios-plantel',
  templateUrl: './precios-plantel.component.html'
})
export class PreciosPlantelComponent extends ListadoPrecios {
  private readonly api = inject(RecopeApiService);
  protected readonly mensajeError = 'No fue posible obtener los precios de plantel. Intenta nuevamente.';

  get masBajo(): PreciosCombustibles | undefined {
    return this.extremo((a, b) => this.numero(a.preciototal) < this.numero(b.preciototal));
  }

  get masAlto(): PreciosCombustibles | undefined {
    return this.extremo((a, b) => this.numero(a.preciototal) > this.numero(b.preciototal));
  }

  protected consultar() {
    return this.api.getPreciosPlantel();
  }

  /** Primer producto que supera a todos los demás según `gana`. */
  private extremo(gana: (a: PreciosCombustibles, b: PreciosCombustibles) => boolean): PreciosCombustibles | undefined {
    return this.precios.reduce<PreciosCombustibles | undefined>(
      (mejor, item) => (!mejor || gana(item, mejor) ? item : mejor),
      undefined
    );
  }
}
