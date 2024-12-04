import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { of } from 'rxjs/internal/observable/of';
import { Game } from "src/app/models/game/game.model";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-previous-games',
  templateUrl: './previous-games.component.html',
  styleUrls: ['./previous-games.component.css']
})
export class PreviousGamesComponent implements OnInit {
  date: any;
  leagues$: Observable<any[]>;
  error: boolean = false;
  constructor(private fbService: FirebaseService) { } 

  previousGamesMap = new Map<string, Observable<Game[]>>();

  ngOnInit(): void {
  }

  viewGames() {
    this.leagues$ = this.fbService.getLeaguesForPreviousDays(this.date).pipe(
      tap((activeLeagues) => {
        if (activeLeagues.length == 0) {
          this.error = true;
        } else {
          this.error = false;
        }
        for (const league of activeLeagues) {
          let temp = this.getGames(league.id);
          this.previousGamesMap.set(league.id, this.getGames(league.id));
        }
      }),
      catchError((err) => {
        console.error('Error retrieving active cities', err);
        return of([]);
      })
    );
  }

  getGames(id: any): Observable<Game[]> {
    return this.fbService.getGamesForDay(this.date, id).pipe(
      catchError((err) => {
        console.error('Error retrieving families for league id:', id, err);
        return of([]);
      })
    );
  }

  hasOfficials(game: Game): boolean {
    if (game.officials === undefined) {
      return false;
    } else {
      return true;
    }
  }

  createLink(leagueCode: string, gameId: number) {
    let lowerCode = leagueCode.toLowerCase();
    if (lowerCode == "pjhl") {
      lowerCode = "pjhlon";
    }
    let url = "https://lscluster.hockeytech.com/game_reports/official-game-report.php?client_code=" + lowerCode + "&lang=en&game_id=" + gameId;

    return url;
  }


}
