import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../_services/operations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  seasonsObject: any;
  raceMode: boolean = false;
  year: string = "";

  constructor(private operationsService: OperationsService) { }

  // Load the seasons
  loadFOneSeasons() {

    this.operationsService.getListOfSeasons().subscribe((data: any) => {
      
        if (data) 
        {
          if (data.MRData) 
          {
            if (data.MRData.SeasonTable)
            {
              if (data.MRData.SeasonTable.Seasons) {
                this.seasonsObject = data.MRData.SeasonTable.Seasons;

                console.log("seasonsObject ", this.seasonsObject);
              }            
            }
          }
        }

        
    }, error => {});

  }

  selectYear(year: string) {
    this.raceMode = true;
    this.year = year;
  }

  cancelRaceMode(event: any) {
    this.raceMode = event;
  }

  ngOnInit(): void {

    this.loadFOneSeasons();
  }

}
