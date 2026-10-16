import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrecioInternacionalComponent } from './components/precio-internacional/precio-internacional.component';
import { PreciosConsumidorComponent } from './components/precios-consumidor/precios-consumidor.component';
import { PreciosPlantelComponent } from './components/precios-plantel/precios-plantel.component';

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
