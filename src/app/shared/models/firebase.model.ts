export class FirebaseModel {
    time: string;
    dest1: string;
    dest2: string;
    dist: string;

    /**
     * 
     * @param time 
     * @param dest1 
     * @param dest2 
     * @param dist 
     */
    constructor(time:any, dest1: any, dest2: any, dist:any){
        this.time = time;
        this.dest1 = dest1;
        this.dest2 = dest2;
        this.dist = dist;
    }
}
