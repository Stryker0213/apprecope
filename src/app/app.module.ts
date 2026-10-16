import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrecioInternacionalComponent } from './components/precio-internacional/precio-internacional.component';
import { PreciosConsumidorComponent } from './components/precios-consumidor/precios-consumidor.component';
import { PreciosPlantelComponent } from './components/precios-plantel/precios-plantel.component';
import { EstadoConsultaComponent } from './shared/estado-consulta/estado-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    PrecioInternacionalComponent,
    PreciosConsumidorComponent,
    PreciosPlantelComponent,
    EstadoConsultaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
