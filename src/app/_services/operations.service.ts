import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http: HttpClient) { }

  getListOfSeasons(): Observable<any> {

    return this.http.get("http://ergast.com/api/f1/seasons.json?offset=55").pipe(
      map ( data => {
        return data;
      })
    );
  }

  getRaceWinner(year: string, round: string) {
    return this.http.get("http://ergast.com/api/f1/" + year + "/" + round + "/results.json?limit=1").pipe(
      map ( data => {
        return data;
      })
    );
  }

  getSeasonWinner(year: string) {

    return this.http.get("https://ergast.com/api/f1/" + year + "/driverStandings.json?limit=1").pipe(
      map ( data => {
        return data;
      })
    );
  }
  getRaceRounds(year: string) {
    
    return this.http.get("http://ergast.com/api/f1/" + year + ".json").pipe(
      map ( data => {
        return data;
      })
    );
    
  }
}
