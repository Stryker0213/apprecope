import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrecioInternacionalComponent } from './componet/precio-internacional/precio-internacional.component';
import { PreciosConsumidorComponent } from './componet/precios-consumidor/precios-consumidor.component';
import { PreciosPlantelComponent } from './componet/precios-plantel/precios-plantel.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'consumidor' },
  {path: 'internacional', component: PrecioInternacionalComponent},
  {path: 'consumidor', component: PreciosConsumidorComponent},
  {path: 'plantel', component: PreciosPlantelComponent},
  { path: '**', redirectTo: 'consumidor' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
