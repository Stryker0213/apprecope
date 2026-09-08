import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { finalize } from 'rxjs';
import { PreciosCombustibles } from '../../models/precios-combustibles';
import { RecopeApiService } from '../../services/recope-api.service';

@Component({ selector: 'app-precios-plantel', templateUrl: './precios-plantel.component.html', styleUrl: './precios-plantel.component.css' })
export class PreciosPlantelComponent implements OnInit {
  precios: PreciosCombustibles[] = [];
  busqueda = '';
  cargando = true;
  error = '';

  constructor(private readonly api: RecopeApiService, @Inject(PLATFORM_ID) private readonly platformId: object) {}

  ngOnInit(): void { if (isPlatformBrowser(this.platformId)) this.cargar(); }
  get filtrados(): PreciosCombustibles[] {
    const termino = this.busqueda.trim().toLocaleLowerCase('es');
    return termino ? this.precios.filter((item) => item.nomprod.toLocaleLowerCase('es').includes(termino)) : this.precios;
  }
  get actualizado(): string { return this.precios[0]?.fechaupd ?? ''; }
  get masBajo(): PreciosCombustibles | undefined { return [...this.precios].sort((a, b) => this.numero(a.preciototal) - this.numero(b.preciototal))[0]; }
  get masAlto(): PreciosCombustibles | undefined { return [...this.precios].sort((a, b) => this.numero(b.preciototal) - this.numero(a.preciototal))[0]; }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.api.getPreciosPlantel().pipe(finalize(() => this.cargando = false)).subscribe({
      next: (precios) => this.precios = precios,
      error: () => this.error = 'No fue posible obtener los precios de plantel. Intenta nuevamente.'
    });
  }
  numero(valor: string): number { return Number.parseFloat(valor.trim()) || 0; }
}
