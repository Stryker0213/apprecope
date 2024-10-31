import { Component, OnInit } from '@angular/core';
import { PreciosCombustiblesService } from '../../services/precios-combustibles.service';
import { PreciosCombustibles } from '../../models/precios-combustibles';

@Component({
  selector: 'app-precios-consumidor',
  templateUrl: './precios-consumidor.component.html',
  styleUrl: './precios-consumidor.component.css'
})
export class PreciosConsumidorComponent implements OnInit {
  public preciosConsumidor:PreciosCombustibles[];

  constructor(private apiService: PreciosCombustiblesService) { }

  ngOnInit(): void{
    this.apiService.getPreciosConsumidor().subscribe({
      next:(response)=> {
        this.preciosConsumidor = response;
        console.log(this.preciosConsumidor);
      },
      error:(error)=>{
        console.log(error); 

    }
    });
  }
  }


