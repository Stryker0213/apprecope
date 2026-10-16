import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PreciosCombustibles } from '../../models/precios-combustibles';
import { RecopeApiService } from '../../services/recope-api.service';
import { PreciosPlantelComponent } from './precios-plantel.component';

function precio(nomprod: string, preciototal: string): PreciosCombustibles {
  return { nomprod, preciototal, id: nomprod, fecha: '', tipo: '', impuesto: '0', precsinimp: '0', fechaupd: '01/10/2026', margenpromedio: '0' };
}

describe('PreciosPlantelComponent', () => {
  const precios = [precio('DIESEL', ' 500.5 '), precio('ASFALTO', '120'), precio('BUNKER', '120'), precio('JET', '900')];

  function crear(): PreciosPlantelComponent {
    TestBed.configureTestingModule({
      providers: [{ provide: RecopeApiService, useValue: { getPreciosPlantel: () => of(precios) } }]
    });
    return TestBed.runInInjectionContext(() => new PreciosPlantelComponent());
  }

  it('carga los precios y calcula los extremos', () => {
    const componente = crear();
    componente.cargar();
    expect(componente.cargando).toBeFalse();
    expect(componente.masBajo?.nomprod).toBe('ASFALTO');
    expect(componente.masAlto?.nomprod).toBe('JET');
    expect(componente.actualizado).toBe('01/10/2026');
  });

  it('filtra por nombre sin distinguir mayúsculas', () => {
    const componente = crear();
    componente.cargar();
    componente.busqueda = '  diesel ';
    expect(componente.filtrados.map((item) => item.nomprod)).toEqual(['DIESEL']);
    expect(componente.numero(' 500.5 ')).toBe(500.5);
  });
});
