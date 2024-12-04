import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { of } from 'rxjs/internal/observable/of';
import { Game } from "src/app/models/game/game.model";
import { map } from 'rxjs/operators';
import { Official } from "src/app/models/official/official.model";

const sortGameDate = (a: Game, b: Game) => {
  return (a.date.toDate() <= b.date.toDate()) ? 1 : -1;
}

@Component({
  selector: 'app-official-page',
  templateUrl: './official-page.component.html',
  styleUrls: ['./official-page.component.css']
})
export class OfficialPageComponent implements OnInit {
  officialId: string = "";
  refPhoto: string = "";
  official$: Observable<Official | undefined>;
  workedGamesMap = new Map<string, Observable<Game[]>>();
  numOfGames = new Map<string, number>();
  workedLeagues$: Observable<any[]>;

  constructor(private route: ActivatedRoute, private fbService: FirebaseService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.officialId = params.get('id') || "";
      this.updateOfficialData(this.officialId);
    });
  }

  updateOfficialData(officialId: string) {
    this.official$ = this.fbService.getOfficial(officialId.replace(/\s/g, ""));
    this.setRefPhoto(officialId);
    this.loadWorkedLeagues(officialId);
  }

  loadWorkedLeagues(officialId: string) {
    this.workedLeagues$ = this.fbService.getOfficialsLeagues(officialId.replace(/\s/g, "")).pipe(
      tap((workedLeagues) => {
        this.workedGamesMap.clear(); // Clear previous data
        for (const league of workedLeagues) {
          this.workedGamesMap.set(league.id, this.workedGames(league.id, officialId.replace(/\s/g, "")).pipe(
            map(data => data.sort(sortGameDate))));
        }
        this.numOfGames.clear(); // Clear previous data
        this.workedGamesMap.forEach((value, key) => {
          value.subscribe(data => {
            this.numOfGames.set(key, data.length);
          });
        });
      }),
      catchError((err) => {
        console.error('Error retrieving leagues', err);
        return of([]);
      })
    );
  }

  workedGames(id: any, official: string): Observable<Game[]> {
    return this.fbService.getLeagueGamesForOfficial(official, id).pipe(
      catchError((err) => {
        console.error('Error retrieving games for league id:', id, err);
        return of([]);
      })
    );
  }

  setRefPhoto(officialId: string) {
    if (!officialId) {
      this.refPhoto = "https://whosreffing-assets.s3.amazonaws.com/officials/default.png";
    } else {
      this.refPhoto = "https://whosreffing-assets.s3.amazonaws.com/officials/" + officialId + ".png";
    }
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

  setDefaultPic() {
    this.refPhoto = "https://whosreffing-assets.s3.amazonaws.com/officials/default.png";
  }

}
