import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrecioInternacional } from '../models/precio-internacional';


@Injectable({
  providedIn: 'root'
})
export class PrecioInternacionalService {
  private Url = 'https://api.recope.go.cr/precio-internacional'; 

  constructor(private  http: HttpClient) { }

  public getPrecioInternacional(): Observable<PrecioInternacional>{
    console.log('GET' + this.Url);
    return this.http.get<PrecioInternacional>(this.Url);
  }

}
