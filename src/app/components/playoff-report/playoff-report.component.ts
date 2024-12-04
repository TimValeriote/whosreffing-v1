import { Component, OnInit } from '@angular/core';
import { Bias } from "src/app/models/bias/bias.model";
import { BaseRefInfo } from "src/app/models/base-ref-info.model";

@Component({
  selector: 'app-playoff-report',
  templateUrl: './playoff-report.component.html',
  styleUrls: ['./playoff-report.component.css']
})
export class PlayoffReportComponent implements OnInit {
  players: Bias[] = [];
  allRefs: BaseRefInfo[] = [];

  gojhlVisible: boolean = false;
  pjhlVisible: boolean = false;
  ojhlVisible: boolean = false;
  ohlVisible: boolean = false;

  sortByHPercentage: boolean = false;
  sortByVPercentage: boolean = false;
  sortByTotal: boolean = false;

  sortByGameCount: boolean = false;

  officialsTableVisible: boolean = false;
  biasTableVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.players = this.parseCSV();
    this.allRefs = this.parseRefCSV();
  }

  toggleDiv(divId: string) {
            if (divId === 'gojhl') {
                this.gojhlVisible = !this.gojhlVisible;
                this.pjhlVisible = false;
                this.ojhlVisible = false;
                this.ohlVisible = false;
            } else if (divId === 'pjhl') {
                this.pjhlVisible = !this.pjhlVisible;
                this.gojhlVisible = false;
                this.ojhlVisible = false;
                this.ohlVisible = false;
            } else if (divId === 'ojhl') {
                this.ojhlVisible = !this.ojhlVisible;
                this.gojhlVisible = false;
                this.pjhlVisible = false;
                this.ohlVisible = false;
            } else if (divId === 'ohl') {
                this.ohlVisible = !this.ohlVisible;
                this.gojhlVisible = false;
                this.pjhlVisible = false;
                this.ojhlVisible = false;
            }
        }

  toggleStatsDiv(table: string) {
    if (table === 'officialsTable') {
      this.officialsTableVisible = !this.officialsTableVisible;
    } else if (table === 'biasTable') {
      this.biasTableVisible = !this.biasTableVisible;
    }
  }

  createLink(leagueCode: string, gameId: number) {
    let lowerCode = leagueCode.toLowerCase();
    let url = "";
    if (lowerCode == "pjhl") {
      lowerCode = "pjhlon";
      url = "https://lscluster.hockeytech.com/game_reports/official-game-report.php?client_code=" + lowerCode + "&lang=en&game_id=" + gameId;
    } else {
      url = "https://lscluster.hockeytech.com/game_reports/official-game-report.php?client_code=" + lowerCode + "&lang=en&game_id=" + gameId;
    }

    return url;
  }

  parseCSV(): Bias[] {
      const csvData: string = `
          name,total,"H PPs","V PPs","H %","V %"
          "Blake Beer",296,133,163,0.449,0.551
          "Cameron Fynney",166,75,91,0.452,0.548
          "Chad Ingalls",181,83,98,0.459,0.541
          "Andrew Willmetts",323,149,174,0.461,0.539
          "Sean Kimmerly",281,130,151,0.463,0.537
          "Hillary Brennan",214,100,114,0.467,0.533
          "Matt Boulby",225,106,119,0.471,0.529
          "Pat Myers",316,149,167,0.472,0.528
          "Nicholas Bet",285,135,150,0.474,0.526
          "David Elford",175,83,92,0.474,0.526
          "Tyson Stewart",293,140,153,0.478,0.522
          "Alex Ross",242,116,126,0.479,0.521
          "Scott Ferguson",307,148,159,0.482,0.518
          "Danny Emerson",278,136,142,0.489,0.511
          "Jack Hennigan",261,129,132,0.494,0.506
          "Matt Scott",187,93,94,0.497,0.503
          "Mike Cairns",353,176,177,0.499,0.501
          "Sean Reid",278,139,139,0.500,0.500
          "Joe Monette",368,186,182,0.505,0.495
          "Dave Lewis",289,146,143,0.505,0.495
          "Chris Chapman",174,88,86,0.506,0.494
          "Ben Wilson",185,94,91,0.508,0.492
          "Darcy Burchell",292,149,143,0.510,0.490
          "Aaron Neely",355,181,174,0.510,0.490
          "Ryan Hutchison",221,113,108,0.511,0.489
          "Lacey Senuk",274,140,134,0.511,0.489
          "Ryan Harrison",344,176,168,0.512,0.488
          "Jason Faist",339,175,164,0.516,0.484
          "Jesse Wilmot",158,82,76,0.519,0.481
          "Brendan Kane",348,181,167,0.520,0.480
          "Connor Mallon",150,78,72,0.520,0.480
          "Damian Figueira",203,106,97,0.522,0.478
          "Mac Nichol",306,160,146,0.523,0.477
          "Ryan Jenken",214,112,102,0.523,0.477
          "Brent Coulombe",110,58,52,0.527,0.473
          "Mitchell Hardy",175,93,82,0.531,0.469
          "Alex Lepkowski",87,47,40,0.540,0.460
          "Ryan Elbers",376,205,171,0.545,0.455
          "Kevin McArthur",88,48,40,0.545,0.455
          "Drew Jackson",340,186,154,0.547,0.453
      `;

      const lines: string[] = csvData.trim().split('\n');
      const headers: string[] = lines[0].split(',');
      const playerStats: Bias[] = [];

      for (let i = 1; i < lines.length; i++) {
          const currentLine: string[] = lines[i].split(',');

          const name: string = currentLine[0].replace(/"/g, '');
          const total: number = parseInt(currentLine[1]);
          const horizontalPPs: number = parseInt(currentLine[2]);
          const verticalPPs: number = parseInt(currentLine[3]);
          const horizontalPercentage: number = parseFloat(currentLine[4]);
          const verticalPercentage: number = parseFloat(currentLine[5]);

          const biasStat = new Bias();
          biasStat.name = name;
          biasStat.total = total;
          biasStat.horizontalPPs = horizontalPPs;
          biasStat.verticalPPs = verticalPPs;
          biasStat.horizontalPercentage = horizontalPercentage;
          biasStat.verticalPercentage = verticalPercentage;

          playerStats.push(biasStat);
      }

      return playerStats;
  }

  toggleSortByTotal() {
    this.sortByTotal = !this.sortByTotal;
    this.sortByHPercentage = false; // Reset other sorts
    this.sortByVPercentage = false;
    if (this.sortByTotal) {
      this.players.sort((a, b) => a.total - b.total);
    } else {
      this.players.reverse();
    }
  }

  toggleSortByHPercentage() {
    this.sortByHPercentage = !this.sortByHPercentage;
    this.sortByTotal = false; // Reset other sorts
    this.sortByVPercentage = false;
    if (this.sortByHPercentage) {
      this.players.sort((a, b) => a.horizontalPercentage - b.horizontalPercentage);
    } else {
      this.players.reverse();
    }
  }

  toggleSortByVPercentage() {
    this.sortByVPercentage = !this.sortByVPercentage;
    this.sortByTotal = false; // Reset other sorts
    this.sortByHPercentage = false;
    if (this.sortByVPercentage) {
      this.players.sort((a, b) => a.verticalPercentage - b.verticalPercentage);
    } else {
      this.players.reverse();
    }
  }

  toggleSortByRefCount() {
    this.sortByGameCount = !this.sortByGameCount;
    if (this.sortByGameCount) {
      this.allRefs.sort((a, b) => a.games_worked - b.games_worked);
    } else {
      this.allRefs.reverse();
    }
  }

  parseRefCSV(): BaseRefInfo[] {
      const csvData: string = `
          name,games_worked
          "Ryan Elbers",51
          "Joe Monette",49
          "Drew Jackson",49
          "Aaron Neely",49
          "Mike Cairns",48
          "Ryan Harrison",46
          "Andre Grougrou",46
          "Blake Beer",45
          "Sean Reid",44
          "Brendan Kane",44
          "Adam Burnett",43
          "Tyson Stewart",42
          "Mac Nichol",42
          "Tristan Peacock",41
          "Pat Myers",41
          "Dustin McCrank",41
          "Scott Lawson",40
          "Jason Faist",40
          "Alex Ross",40
          "Lacey Senuk",39
          "Andrew Willmetts",39
          "Scott Ferguson",38
          "Jordan Hurtubise",37
          "Darcy Burchell",36
          "Will Dykeman",36
          "Nick Arcan",36
          "Adam Harris",36
          "Jack Hennigan",36
          "Brad Horan",36
          "Justin Noble",35
          "Kurtis Pare",34
          "Brian Birkhoff",34
          "Danny Emerson",34
          "Nicholas Bet",34
          "Matt Boulby",34
          "Sean Kimmerly",33
          "David Milne",33
          "Ryan Cadwell",32
          "Ryan Jenken",32
          "Ryan Card",32
          "Dave Lewis",31
          "Joe Kielbowich",30
          "Geoff Rutherford",29
          "Matt Scott",29
          "Spencer Knox",28
          "Ian Rush",28
          "Ryan Hutchison",28
          "Brett Heaman",27
          "Ben Wilson",27
          "Damian Figueira",27
          "Brock Perry",27
          "Hillary Brennan",26
          "David Elford",25
          "Kevin McArthur",25
          "Mitchell Hardy",24
          "Will Lamoureux",24
          "Chad Ingalls",23
          "Dave Pfohl",23
          "Cameron Fynney",23
          "Connor Mallon",22
          "Michael Johnstone",22
          "TJ Hunter",22
          "Charlie Millen",21
          "Justine Todd",21
          "Chris Chapman",21
          "Jesse Wilmot",20
          "Jarrett Burton",19
          "Alex Joubert",19
          "Riley Brass",19
          "Jean-Francois Menard",19
          "Luke Pye",18
          "Jacob Lamothe",18
          "Jared Hiebert",18
          "Devon Gale",17
          "Mason Hardy",17
          "Justin Cornell",17
          "Shawn Oliver",17
          "Zach Gagne",17
          "Kyle Rodgers",17
          "Charlie Giesler",17
          "Chris Weier",16
          "Brent Coulombe",15
          "Riley Clipper",15
          "Ray King",15
          "Josh Jolley",15
          "Brendan Barletta",15
          "Marcus Policicchio",15
          "Corey Jackson",14
          "Justin Herrington",14
          "Alex Schmidt",12
          "Dalton Kipp",12
          "Alex Lepkowski",10
          "Marco Lizotte",10
          "Riley Page",10
          "Joshua Houslander",9
          "Carter Tait",8
      `;

      const lines: string[] = csvData.trim().split('\n');
      const headers: string[] = lines[0].split(',');
      const refStats: BaseRefInfo[] = [];

      for (let i = 1; i < lines.length; i++) {
          const currentLine: string[] = lines[i].split(',');

          const name: string = currentLine[0].replace(/"/g, '');
          const games: number = parseInt(currentLine[1]);

          const refStat = new BaseRefInfo();
          refStat.name = name;
          refStat.games_worked = games;

          refStats.push(refStat);
      }

      return refStats;
  }

}
