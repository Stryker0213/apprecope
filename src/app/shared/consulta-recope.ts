import { isPlatformBrowser } from '@angular/common';
import { Directive, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { Observable, finalize } from 'rxjs';

/**
 * Estado común de las vistas que consultan el API de RECOPE.
 * La consulta inicial solo se hace en el navegador para no bloquear el prerender SSR.
 */
@Directive()
export abstract class ConsultaRecope<T> implements OnInit {
  cargando = true;
  error = '';

  private readonly platformId = inject(PLATFORM_ID);

  protected abstract readonly mensajeError: string;
  protected abstract consultar(): Observable<T>;
  protected abstract recibir(datos: T): void;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.consultar().pipe(finalize(() => this.cargando = false)).subscribe({
      next: (datos) => this.recibir(datos),
      error: () => this.error = this.mensajeError
    });
  }
}
