import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RecopeApiService } from '../../services/recope-api.service';
import { PrecioInternacionalComponent } from './precio-internacional.component';

describe('PrecioInternacionalComponent', () => {
  let api: jasmine.SpyObj<RecopeApiService>;

  function crear(): PrecioInternacionalComponent {
    api = jasmine.createSpyObj<RecopeApiService>('RecopeApiService', ['getPrecioInternacional']);
    TestBed.configureTestingModule({ providers: [{ provide: RecopeApiService, useValue: api }] });
    return TestBed.runInInjectionContext(() => new PrecioInternacionalComponent());
  }

  it('rechaza un rango invertido sin consultar el API', () => {
    const componente = crear();
    componente.inicio = '2026-10-02';
    componente.fin = '2026-10-01';
    componente.cargar();
    expect(api.getPrecioInternacional).not.toHaveBeenCalled();
    expect(componente.error).toContain('fecha inicial');
  });

  it('guarda periodos y materiales de la respuesta', () => {
    const componente = crear();
    api.getPrecioInternacional.and.returnValue(of({
      periodos: [{ desde: '20261001', hasta: '20261007' }],
      materiales: [{ id: '1', nomprod: 'WTI', precios: [70, 68.5] }]
    }));
    componente.cargar();
    expect(componente.periodoTexto(componente.periodos[0])).toBe('01/10/2026 – 07/10/2026');
    expect(componente.cambio(componente.materiales[0])).toBe(-1.5);
  });

  it('muestra el mensaje de error de la vista', () => {
    const componente = crear();
    api.getPrecioInternacional.and.returnValue(throwError(() => new Error('caído')));
    componente.cargar();
    expect(componente.cargando).toBeFalse();
    expect(componente.error).toContain('serie internacional');
  });
});
