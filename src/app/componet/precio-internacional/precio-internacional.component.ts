import { Component, OnInit } from '@angular/core';
import { PrecioInternacional } from '../../models/precio-internacional';
import { PrecioInternacionalService } from '../../services/precio-internacional.service';

@Component({
  selector: 'app-precio-internacional',
  templateUrl: './precio-internacional.component.html',
  styleUrls: ['./precio-internacional.component.css'],
})
export class PrecioInternacionalComponent implements OnInit {

  public precioInternacional: PrecioInternacional;
  public titulo: string;
  
  constructor(private  precioInternacionalService: PrecioInternacionalService) {
    this.titulo = 'Precio Internacional';
  }

  ngOnInit():void{
    
    this.precioInternacionalService.getPrecioInternacional().subscribe({

      
      next: (response)=> {
        this.precioInternacional = response;
        console.log(this.precioInternacional);
      },
      error:(error)=>{
        console.log(error);
      }
    }
    );

  }

}
