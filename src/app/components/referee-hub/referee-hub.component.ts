import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Game } from "src/app/models/game/game.model";
import { Official } from "src/app/models/official/official.model";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-referee-hub',
  templateUrl: './referee-hub.component.html',
  styleUrls: ['./referee-hub.component.css']
})

export class RefereeHubComponent implements OnInit {
  term:string;
  showSearch: boolean = false;
  numOfRefs: number = 20;
  numOfRefsDisplay: number = 20;
  constructor(private fbService: FirebaseService) { 
  }

  allRefs: Observable<Official[]> = this.fbService.getAllOfficials();

  topRefs: Official[] = this.fbService.getTopOfficials(20);

  ngOnInit(): void {

  }

  clearSerach() {
    this.term = "";
    this.showSearch = false;
  }

  getOfficials() {
    this.topRefs = this.fbService.getTopOfficials(this.numOfRefs);
    this.numOfRefsDisplay = this.numOfRefs;
  }
}
