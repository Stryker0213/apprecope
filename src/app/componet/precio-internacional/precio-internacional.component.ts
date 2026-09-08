import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { finalize } from 'rxjs';
import { Material } from '../../models/material';
import { Periodo } from '../../models/periodo';
import { RecopeApiService } from '../../services/recope-api.service';

@Component({
  selector: 'app-precio-internacional',
  templateUrl: './precio-internacional.component.html',
  styleUrls: ['./precio-internacional.component.css']
})
export class PrecioInternacionalComponent implements OnInit {
  materiales: Material[] = [];
  periodos: Periodo[] = [];
  inicio = '';
  fin = '';
  cargando = true;
  error = '';

  constructor(private readonly api: RecopeApiService, @Inject(PLATFORM_ID) private readonly platformId: object) {}

  ngOnInit(): void { if (isPlatformBrowser(this.platformId)) this.cargar(); }

  cargar(): void {
    if (this.inicio && this.fin && this.inicio > this.fin) {
      this.error = 'La fecha inicial debe ser anterior a la fecha final.';
      return;
    }
    this.cargando = true;
    this.error = '';
    this.api.getPrecioInternacional(this.inicio, this.fin).pipe(finalize(() => this.cargando = false)).subscribe({
      next: (datos) => { this.materiales = datos.materiales; this.periodos = datos.periodos; },
      error: () => this.error = 'No fue posible obtener la serie internacional. Revisa el rango e intenta nuevamente.'
    });
  }

  limpiar(): void { this.inicio = ''; this.fin = ''; this.cargar(); }
  precioActual(material: Material): number { return material.precios.at(-1) ?? 0; }
  cambio(material: Material): number {
    if (material.precios.length < 2) return 0;
    return (material.precios.at(-1) ?? 0) - (material.precios.at(-2) ?? 0);
  }
  periodoTexto(periodo: Periodo): string { return `${this.fecha(periodo.desde)} – ${this.fecha(periodo.hasta)}`; }
  fecha(valor: string): string {
    if (valor.length !== 8) return valor;
    return `${valor.slice(6, 8)}/${valor.slice(4, 6)}/${valor.slice(0, 4)}`;
  }
}
