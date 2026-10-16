import { Component, inject } from '@angular/core';
import { Material } from '../../models/material';
import { Periodo } from '../../models/periodo';
import { PrecioInternacional } from '../../models/precio-internacional';
import { RecopeApiService } from '../../services/recope-api.service';
import { ConsultaRecope } from '../../shared/consulta-recope';

@Component({
  selector: 'app-precio-internacional',
  templateUrl: './precio-internacional.component.html',
  styleUrl: './precio-internacional.component.css'
})
export class PrecioInternacionalComponent extends ConsultaRecope<PrecioInternacional> {
  private readonly api = inject(RecopeApiService);
  protected readonly mensajeError = 'No fue posible obtener la serie internacional. Revisa el rango e intenta nuevamente.';

  materiales: Material[] = [];
  periodos: Periodo[] = [];
  inicio = '';
  fin = '';

  override cargar(): void {
    if (this.inicio && this.fin && this.inicio > this.fin) {
      this.error = 'La fecha inicial debe ser anterior a la fecha final.';
      return;
    }
    super.cargar();
  }

  limpiar(): void {
    this.inicio = '';
    this.fin = '';
    this.cargar();
  }

  precioActual(material: Material): number {
    return material.precios.at(-1) ?? 0;
  }

  cambio(material: Material): number {
    if (material.precios.length < 2) return 0;
    return (material.precios.at(-1) ?? 0) - (material.precios.at(-2) ?? 0);
  }

  periodoTexto(periodo: Periodo): string {
    return `${this.fecha(periodo.desde)} – ${this.fecha(periodo.hasta)}`;
  }

  /** Convierte AAAAMMDD en DD/MM/AAAA. */
  fecha(valor: string): string {
    if (valor.length !== 8) return valor;
    return `${valor.slice(6, 8)}/${valor.slice(4, 6)}/${valor.slice(0, 4)}`;
  }

  protected consultar() {
    return this.api.getPrecioInternacional(this.inicio, this.fin);
  }

  protected recibir(datos: PrecioInternacional): void {
    this.materiales = datos.materiales;
    this.periodos = datos.periodos;
  }
}
