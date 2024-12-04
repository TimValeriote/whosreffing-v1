import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Game } from "src/app/models/game/game.model";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { of } from 'rxjs/internal/observable/of';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private fbService: FirebaseService) { }

  activeGamesMap = new Map<string, Observable<Game[]>>();

  noGames: boolean = false;

  isDesktop: boolean = true;

  chlString: string = "CHL";

  showBubbleMap = new Map<string, boolean>();

  public screenWidth: any;

  activeLeagues$: Observable<any[]> = this.fbService.getActiveLeagues().pipe(
    tap((activeLeagues) => {
      if (activeLeagues.length == 0) {
        this.noGames = true;
      }
      for (const league of activeLeagues) {
        let temp = this.activeGames(league.id);
        this.activeGamesMap.set(league.id, this.activeGames(league.id));
        if (this.isDesktop == false) {
          this.showBubbleMap.set(league.id, true);
        } else {
          this.showBubbleMap.set(league.id, false);
        }
      }
    }),
    catchError((err) => {
      console.error('Error retrieving active cities', err);
      return of([]);
    })
  );

  activeGames(id: any): Observable<Game[]> {
    return this.fbService.getGamesForLeague(id).pipe(
      catchError((err) => {
        console.error('Error retrieving families for league id:', id, err);
        return of([]);
      })
    );
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 770) {
      this.isDesktop = false;
    }
    //this.fbService.getOfficialsFromStorage();
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
    let url = "";
    if (lowerCode == "pjhl") {
      lowerCode = "pjhlon";
      url = "https://lscluster.hockeytech.com/game_reports/official-game-report.php?client_code=" + lowerCode + "&lang=en&game_id=" + gameId;
    } else if (lowerCode == "bchlbc") {
      url = "https://lscluster.hockeytech.com/game_reports/official-game-report.php?client_code=bchl&lang=en&game_id=" + gameId;
    } else if (lowerCode == "bchlab") {
      url = "https://lscluster.hockeytech.com/game_reports/official-game-report.php?client_code=bchl&lang=en&game_id=" + gameId;
    } else {
      url = "https://lscluster.hockeytech.com/game_reports/official-game-report.php?client_code=" + lowerCode + "&lang=en&game_id=" + gameId;
    }

    return url;
  }

  showPlayoffGameNumber(leagueCode: string) {
    let lowerCode = leagueCode.toLowerCase();
    if (lowerCode == "pjhl") {
      return false;
    } else if (lowerCode == "oua") {
      return false;
    } else if (lowerCode == "whl") {
      return false;
    } else if (lowerCode == "lhjmq") {
      return false;
    } else if (lowerCode == "ojhl") {
      return false;
    } else if (lowerCode == "bchl") {
      return false;
    } else if (lowerCode == "bchlab") {
      return false;
    } else if (lowerCode == "bchlbc") {
      return false;
    } else if (lowerCode == "pwhl") {
      return false;
    }
    return true;
  }

  checkForBubble(leagueId: any) {
    let showBubble = this.showBubbleMap.get(leagueId);
    if (showBubble) {
      return true;
    } else {
      return false;
    }
  }

  updateBubbleMap(leagueId: any) {
    let old = this.showBubbleMap.get(leagueId);
    old = !old;
    this.showBubbleMap.set(leagueId, old);
  }



  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth = window.innerWidth;
  }
}
