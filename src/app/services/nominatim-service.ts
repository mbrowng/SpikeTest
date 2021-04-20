import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NominatimResponse} from '../shared/models/nominatim-response.model';
import {map, takeUntil} from 'rxjs/operators';
import {BASE_NOMINATIM_URL, DEFAULT_VIEW_BOX} from '../app.constants';
import { GraphhopperResponse } from '../shared/models/graphhopper-response.model';

@Injectable()
export class NominatimService {

  searchResults: NominatimResponse[];
  searchResultsSecond: NominatimResponse[];

  constructor (private http: HttpClient) {
  }

  /**
   * Calcula distancia entre dos puntos en kms desde API de graphhopper
   * @param lat1 latitud destino 1
   * @param lon1 longitud destino 1
   * @param lat2 latitud destino 2
   * @param lon2 longitud destino 2
   */
  distanceKmsLookup (lat1:any, lon1:any, lat2:any, lon2:any) : Observable<any> {
    let key = 'a9ab15ea-30aa-47ef-9c83-54ae60ab38ed';
    let url = `https://graphhopper.com/api/1/route?key=${key}&instructions=0&calc_points=0&point=${lat1}%2C${lon1}&point=${lat2}%2C${lon2}`;

    return this.http.get(url);
  }

  /**
   * Buscador de dirección
   * @param req direccion a buscar
   */
  addressLookup (req?: any): Observable<NominatimResponse[]> {
    let url = `https://nominatim.openstreetmap.org/search?q=${req}&format=json&addressdetails=1`;

    return this.http
      .get(url).pipe(
        map((data: any[]) => data.map((item: any) => new NominatimResponse(
          item.lat,
          item.lon,
          item.display_name
          ))
        )
      )
  }
}