import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PrecioInternacional } from '../models/precio-internacional';
import { PreciosCombustibles } from '../models/precios-combustibles';

@Injectable({ providedIn: 'root' })
export class RecopeApiService {
  private readonly baseUrl = '/api/recope';

  constructor(private readonly http: HttpClient) {}

  getPreciosConsumidor(): Observable<PreciosCombustibles[]> {
    return this.http.get<PreciosCombustibles[]>(`${this.baseUrl}/ventas/precio/consumidor`);
  }

  getPreciosPlantel(): Observable<PreciosCombustibles[]> {
    return this.http.get<PreciosCombustibles[]>(`${this.baseUrl}/ventas/precio/plantel`);
  }

  getPrecioInternacional(inicio?: string, fin?: string): Observable<PrecioInternacional> {
    let params = new HttpParams();
    if (inicio) params = params.set('inicio', inicio.replaceAll('-', ''));
    if (fin) params = params.set('fin', fin.replaceAll('-', ''));
    return this.http.get<PrecioInternacional>(`${this.baseUrl}/precio-internacional`, { params });
  }
}
