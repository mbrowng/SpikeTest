import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GeocodingComponent} from './geocoding/geocoding.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {NominatimService} from './services/nominatim-service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MapComponent} from './map/map.component';
import {MapPointFormComponent} from './map-point-form/map-point-form.component';
import {ResultsListComponent} from './results-list/results-list.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment'; 
import { FirebaseService } from './services/firebase-service';

@NgModule({
  declarations: [
    AppComponent,
    GeocodingComponent,
    MapComponent,
    MapPointFormComponent,
    ResultsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LeafletModule,
    FormsModule,        
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule                 
  ],
  providers: [
    NominatimService,
    FirebaseService
  ],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
