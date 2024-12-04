import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Game } from "src/app/models/game/game.model";
import { Standings } from "src/app/models/standings/standings.model";
import { Official } from "src/app/models/official/official.model";
import { User } from "src/app/models/User.model";
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs/internal/operators/tap';
import { of } from 'rxjs/internal/observable/of';
import { switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { HttpClient } from "@angular/common/http";

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private activeGamesPath = '/active_games';
  private officialsPath = '/officials';
  private previousPath = '/previous_games';
  private standingsPath = '/standings';
  private usersPath = '/users'

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private http: HttpClient) { }

  getActiveLeagues(): Observable<any[]> {
    let colRef: AngularFirestoreCollection<any>;
    let path = this.activeGamesPath;
    colRef = this.firestore.collection(path);
    return colRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getGamesForLeague(leagueCode: string): Observable<Game[]> {
    let colRef: AngularFirestoreCollection<any>;
    let path = this.activeGamesPath + "/" + leagueCode + "/games";
    colRef = this.firestore.collection(path);
    return colRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAllOfficials(): Observable<Official[]> {
    let colRef: AngularFirestoreCollection<any>;
    let path = this.officialsPath;
    colRef = this.firestore.collection(path);
    return colRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getOfficialsLeagues(official: string): Observable<any[]> {
    let colRef: AngularFirestoreCollection<any>;
    let path = this.officialsPath + "/" + official + "/games";
    colRef = this.firestore.collection(path);
    return colRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getLeagueGamesForOfficial(official: string, leagueCode: string): Observable<Game[]> {
    let colRef: AngularFirestoreCollection<any>;
    let path = this.officialsPath + "/" + official + "/games/" + leagueCode + "/games";
    colRef = this.firestore.collection(path);
    return colRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getOfficial(officialId: string) {
    let itemDoc: AngularFirestoreDocument<Official>;
    let path = this.officialsPath + "/" + officialId;
    itemDoc = this.firestore.doc<Official>(path);
    return itemDoc.valueChanges();
  }

  getLeaguesForPreviousDays(date: string) {
    let colRef: AngularFirestoreCollection<any>;
    let path = this.previousPath + "/" + date + "/leagues";
    colRef = this.firestore.collection(path);
    return colRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getGamesForDay(date: string, league: string) {
    let colRef: AngularFirestoreCollection<any>;
    let path = this.previousPath + "/" + date + "/leagues/" + league + "/games";
    colRef = this.firestore.collection(path);
    return colRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getTopOfficials(filter: number): Official[] {
    let topRefs: Official[] = [];
    this.getAllOfficials().subscribe(aRefs => {
      let refs = aRefs as Official[];
      refs.sort((a,b) => (a.total_games < b.total_games) ? 1 : -1);
      let count = 0;
      for (let r of refs) {
        if (count <= 1) {
          count++;
        } else {
          topRefs.push(r);
          count++;
        }
        if (count == (filter+2)) {
          break;
        }
      }
      return topRefs;
    });
    return topRefs;
  }

  getStandingsLeagues(): Observable<any> {
    let colRef: AngularFirestoreCollection<any>;
    let path = this.standingsPath;
    colRef = this.firestore.collection(path);
    return colRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getStandingsLeaguesOfficials(league: string): Observable<any> {
    let colRef: AngularFirestoreCollection<any>;
    let path = this.standingsPath + "/" + league + "/officials";
    colRef = this.firestore.collection(path);
    return colRef.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getUser(userId: string) {
    let itemDoc = this.firestore.collection(this.usersPath,  ref => ref.where('userId', '==', userId));
    return itemDoc.valueChanges();
  }

  createUser(userEmail: string, firstName: string, lastName: string, type: string, userId: string) {
    let user: User = new User;
    user.firstName = firstName
    user.lastName = lastName
    user.userType = type

    this.firestore.collection(this.usersPath).add({userEmail: userEmail, userId: userId, firstName: firstName, lastName: lastName, userType: type});
  }
}
