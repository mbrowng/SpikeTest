import {Component, Input} from '@angular/core';
import { FirebaseService } from '../services/firebase-service';
import {MapPoint} from '../shared/models/map-point.model';

@Component({
  selector: 'app-map-point-form',
  templateUrl: './map-point-form.component.html',
  styleUrls: ['./map-point-form.component.scss']
})
export class MapPointFormComponent {
  myResults:any[] = [];

  constructor (private firebaseService: FirebaseService) {
  }

  /**
   * Obtener Data
   */
  getData(){
    this.firebaseService.getData().subscribe(results => {
      console.log(results);
      this.myResults.push(results);
      console.log(this.myResults);
    });
  }
}
