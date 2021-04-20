import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseModel } from 'src/app/shared/models/firebase.model';

@Injectable()
export class FirebaseService {
    entry:any;
    current = new Date();
    timestamp = this.current.getTime();
    dataTotal = Array<any>();
    constructor(private firestore: AngularFirestore) { }

    /**
     * Obtenemos la data desde Firebase
     */
    getData() {
        return this.firestore.collection("spike").valueChanges();        
    }

    createEntryNew(time: any, add1: any, add2:any, dist:any){
        return this.firestore.collection('spike').add({    
            time: this.timestamp,
            dest1: add1,
            dest2: add2,
            dist: dist});
    } 
    // no se usará en este proyecto
    /*updateEntry(fireb: FirebaseModel){
        delete fireb.time;
        this.firestore.doc('spike/' + fireb.time).update(fireb);
    }

    deleteEntry(fireb: FirebaseModel){
        this.firestore.doc('spike/' + fireb).delete();
    }*/
}


