import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrecioInternacionalComponent } from './componet/precio-internacional/precio-internacional.component';
import { PreciosConsumidorComponent } from './componet/precios-consumidor/precios-consumidor.component';
import { PreciosPlantelComponent } from './componet/precios-plantel/precios-plantel.component';

@NgModule({
  declarations: [
    AppComponent,
    PrecioInternacionalComponent,
    PreciosConsumidorComponent,
    PreciosPlantelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
