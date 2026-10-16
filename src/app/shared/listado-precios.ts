import { Directive } from '@angular/core';
import { PreciosCombustibles } from '../models/precios-combustibles';
import { ConsultaRecope } from './consulta-recope';

/** Listado de precios vigentes con búsqueda por nombre de producto. */
@Directive()
export abstract class ListadoPrecios extends ConsultaRecope<PreciosCombustibles[]> {
  precios: PreciosCombustibles[] = [];
  busqueda = '';

  get filtrados(): PreciosCombustibles[] {
    const termino = this.busqueda.trim().toLocaleLowerCase('es');
    return termino
      ? this.precios.filter((item) => item.nomprod.toLocaleLowerCase('es').includes(termino))
      : this.precios;
  }

  get actualizado(): string {
    return this.precios[0]?.fechaupd ?? '';
  }

  /** La fuente entrega los montos como texto con espacios. */
  numero(valor: string): number {
    return Number.parseFloat(valor.trim()) || 0;
  }

  protected recibir(precios: PreciosCombustibles[]): void {
    this.precios = precios;
  }
}
