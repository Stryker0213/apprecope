import{HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PreciosCombustibles } from '../models/precios-combustibles';

@Injectable({
  providedIn: 'root'
})
export class PrecioPantelService {

  urlPrecioPlantel: string = 'https://api.recope.go.cr/ventas/precio/plantel';


  constructor(private http: HttpClient) { }

  public getPreciosPlantel() :Observable<PreciosCombustibles[]>{
    return this.http.get<PreciosCombustibles[]>(this.urlPrecioPlantel);
  }

}
