import { Component, OnInit } from '@angular/core';
import { PrecioPantelService } from '../../services/precio-pantel.service';
import { PreciosCombustibles } from '../../models/precios-combustibles';

@Component({
  selector: 'app-precios-plantel',
  templateUrl: './precios-plantel.component.html',
  styleUrl: './precios-plantel.component.css'
})
export class PreciosPlantelComponent implements OnInit {
public preciosPlantel:PreciosCombustibles[];
constructor(private apiPlantel: PrecioPantelService) { }

ngOnInit(): void{
  this.apiPlantel.getPreciosPlantel().subscribe({
    next: (response) => {
      this.preciosPlantel = response;
      console.log(this.preciosPlantel);
    },
    error: (error) => {
      console.error(error);
    }
  });
}
}
