import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OperationsService } from '../_services/operations.service';

@Component({
  selector: 'app-show-winners',
  templateUrl: './show-winners.component.html',
  styleUrls: ['./show-winners.component.css']
})
export class ShowWinnersComponent implements OnInit {

  @Input('year') year: string;
  @Output() cancelRace = new EventEmitter();

  numberOfRaces: number = 0;
  winnersObject: Array<any> = new Array();
  isReady: boolean = false;
  seasonWinnerFname: string = "";

  constructor(private operationsService: OperationsService) {
    this.year = "";
   }

  seasonWinner() {
    this.operationsService.getSeasonWinner(this.year).subscribe((data: any) => {

      if (data) {
        if (data.MRData) {
          if (data.MRData.StandingsTable) {
            if (data.MRData.StandingsTable.StandingsLists) {
              this.seasonWinnerFname = data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName;
            }
          }
        }
      }
      

    }, error => {

    });
  }
  loadRaceRounds() {
    this.operationsService.getRaceRounds(this.year).subscribe((data: any) => {
      if (data) {
        if (data.MRData) {
          this.numberOfRaces = data.MRData.total;
          for (let x = 0; x < this.numberOfRaces; x++)
          {
            this.loadRaceWinner(this.year, x.toString());
          } 
        }
      }
    }, (error: any) => {

    });
  }

  loadRaceWinner(year: string, round: string) {

    this.operationsService.getRaceWinner(year, round).subscribe((data: any) => {

      if (data) {
        if (data.MRData) {
          if (data.MRData.RaceTable) {
            if (data.MRData.RaceTable.Races) {

              if (data.MRData.RaceTable.Races.length != 0) {
                let resultObj = data.MRData.RaceTable.Races[0];

                if ( data.MRData.RaceTable.Races[0].Results[0].Driver.givenName == this.seasonWinnerFname) {
                  resultObj.isSeasonWinner = true;
                }

                this.winnersObject.push(resultObj);

                if(this.numberOfRaces - 1 === parseInt(round)) {
                  this.isReady = true;
                }
              }
            }
          }
        }
      }

    }, (error: any) => {

    });
  }


  closeRace() {
    this.cancelRace.emit(false);
  }

  ngOnInit(): void {
    this.seasonWinner();
    this.loadRaceRounds();
  }

}
