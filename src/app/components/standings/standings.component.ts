import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Official } from "src/app/models/official/official.model";
import { Standings } from "src/app/models/standings/standings.model";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  standings: Standings[] = [];

  loading: boolean = true;

  selectedLeague: string = '';
  selectedOfficials: Official[] = [];
  constructor(private fbService: FirebaseService) { }

  ngOnInit(): void {
    let standings = this.fbService.getStandingsLeagues();
    const subscription = standings.subscribe({
      next: (standingsLeagues) => {
        for (const league of standingsLeagues) {
          let leagueName = league.leagueName;
          let officials: Official[] = [];
          let leagueStandings = this.fbService.getStandingsLeaguesOfficials(league.leagueName);
          const subscription2 = leagueStandings.subscribe({
          next: (officialsFromFB) => {
            for (const ref of officialsFromFB) {
              let newRef = new Official(ref);
              officials.push(newRef);
            }

            officials.sort((a, b) => b.total_games - a.total_games);

            let standing = new Standings();
            standing.league_name = leagueName;
            standing.officials = officials;
            if (officials.length > 0) {
              this.standings.push(standing);
            }

            this.loading = false;
          },
          error: (error) => {
            // Handle errors here
            console.error(error);
          },
          complete: () => {
            // This function will be called when the Observable completes
            console.log('Observable completed');
          },
        });
        }
      },
      error: (error) => {
        // Handle errors here
        console.error(error);
      },
      complete: () => {
        // This function will be called when the Observable completes
        console.log('Observable completed');
      },
    });
  }

}
