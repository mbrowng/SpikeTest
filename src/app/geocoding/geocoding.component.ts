import {Component, EventEmitter, Output} from '@angular/core';
import { FirebaseService } from '../services/firebase-service';
import {NominatimService} from '../services/nominatim-service';
import {NominatimResponse} from '../shared/models/nominatim-response.model';

@Component({
  selector: 'app-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.scss']
})
export class GeocodingComponent {

  @Output() onSearch = new EventEmitter();
  searchResults: NominatimResponse[];
  searchResultsSecond: NominatimResponse[];

  result1: any;
  result2: any;
  totalDistance:any;
  address1: any;
  address2: any;
  message: string;

  constructor (private nominatimService: NominatimService, private firebaseService: FirebaseService) {
  }

  /**
   * Buscador primera direccion
   * @param address Direccion
   */
  addressLookup (address: string) {
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
    this.onSearch.emit(this.searchResults);
  }

  /**
   * Buscador segunda dirección
   * @param address direccion
   */
  addressLookupSecond (address: string) {
    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResultsSecond = results;
      });
    } else {
      this.searchResultsSecond = [];
    }
    this.onSearch.emit(this.searchResultsSecond);
  }

  /**
   * Funcion Buscar Wicked User
   * @param add1 direccion 1
   * @param add2 direccion 2
   */
  wickedUser(add1:any, add2:any){
    this.nominatimService.addressLookup(add1).subscribe(results => {
      this.searchResultsSecond = results;
      this.nominatimService.addressLookup(add2).subscribe(results => {
        this.searchResults = results;
        this.nominatimService.distanceKmsLookup(this.searchResultsSecond[0].latitude,this.searchResultsSecond[0].longitude,this.searchResults[0].latitude,this.searchResults[0].longitude).subscribe(results => {
          if( results.paths[0].distance != 0){
            this.totalDistance = results.paths[0].distance/1000;
            this.firebaseService.createEntryNew("10:10",add1, add2,this.totalDistance);
          }
        } );
      });
    });

    if(this.searchResultsSecond != null && this.searchResults != null){
      this.nominatimService.distanceKmsLookup(this.searchResultsSecond[0].latitude,this.searchResultsSecond[0].longitude,this.searchResults[0].latitude,this.searchResults[0].longitude).subscribe(results => {
        this.totalDistance = results.paths[0].distance;
      } );
    }
  }

  /**
   * Funcion busqueda
   */
  calculate (){
    //Cuando el usuario no hizo enter al ingresar las direcciones a evaluar
    if(this.address2 != null && this.address1 != null){
      this.wickedUser(this.address1, this.address2);
    } else {
      this.totalDistance = "Ingrese ambas direcciones para calcular distancia";
    }
  }
}
