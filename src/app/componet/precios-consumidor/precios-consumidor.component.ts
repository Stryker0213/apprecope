import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { finalize } from 'rxjs';
import { PreciosCombustibles } from '../../models/precios-combustibles';
import { RecopeApiService } from '../../services/recope-api.service';

@Component({
  selector: 'app-precios-consumidor',
  templateUrl: './precios-consumidor.component.html',
  styleUrl: './precios-consumidor.component.css'
})
export class PreciosConsumidorComponent implements OnInit {
  precios: PreciosCombustibles[] = [];
  busqueda = '';
  cargando = true;
  error = '';

  constructor(
    private readonly api: RecopeApiService,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) this.cargar();
  }

  get destacados(): PreciosCombustibles[] {
    const nombres = ['GASOLINA SUPER', 'GASOLINA PLUS', 'DIESEL'];
    return nombres
      .map((nombre) => this.precios.find((item) => item.nomprod.includes(nombre)))
      .filter((item): item is PreciosCombustibles => Boolean(item));
  }

  get filtrados(): PreciosCombustibles[] {
    const termino = this.busqueda.trim().toLocaleLowerCase('es');
    return termino
      ? this.precios.filter((item) => item.nomprod.toLocaleLowerCase('es').includes(termino))
      : this.precios;
  }

  get actualizado(): string {
    return this.precios[0]?.fechaupd ?? '';
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.api.getPreciosConsumidor().pipe(finalize(() => this.cargando = false)).subscribe({
      next: (precios) => this.precios = precios,
      error: () => this.error = 'No fue posible obtener los precios de RECOPE. Intenta nuevamente.'
    });
  }

  numero(valor: string): number {
    return Number.parseFloat(valor.trim()) || 0;
  }
}
