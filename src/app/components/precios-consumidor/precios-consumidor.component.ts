import { Component, inject } from '@angular/core';
import { PreciosCombustibles } from '../../models/precios-combustibles';
import { RecopeApiService } from '../../services/recope-api.service';
import { ListadoPrecios } from '../../shared/listado-precios';

const PRODUCTOS_DESTACADOS = ['GASOLINA SUPER', 'GASOLINA PLUS', 'DIESEL'];

@Component({
  selector: 'app-precios-consumidor',
  templateUrl: './precios-consumidor.component.html'
})
export class PreciosConsumidorComponent extends ListadoPrecios {
  private readonly api = inject(RecopeApiService);
  protected readonly mensajeError = 'No fue posible obtener los precios de RECOPE. Intenta nuevamente.';

  get destacados(): PreciosCombustibles[] {
    return PRODUCTOS_DESTACADOS
      .map((nombre) => this.precios.find((item) => item.nomprod.includes(nombre)))
      .filter((item): item is PreciosCombustibles => Boolean(item));
  }

  protected consultar() {
    return this.api.getPreciosConsumidor();
  }
}
