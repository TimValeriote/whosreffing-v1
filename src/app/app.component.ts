import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Official } from "src/app/models/official/official.model";
import { HostListener } from "@angular/core";
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { CookieService } from 'ngx-cookie';
import { User } from './models/User.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  term:string;
  showSearch: boolean = false;

  screenHeight: any;
  screenWidth: any;

  showLogin: boolean = false;

  loginEmail: string = '';
  loginPassword: string = '';

  failedLogin: boolean = false;
  notVerified: boolean = false;

  isLoggedIn: boolean = false;
  loggedInText: string = "";

  userProfile$: Observable<any | undefined>;

  userInfo: User;

  constructor(private fbService: FirebaseService, public modalService: ModalService, private cookieService: CookieService, public auth: AngularFireAuth) {
    this.onResize();

  }
  title = 'whosreffing';

  allRefs: Observable<Official[]> = this.fbService.getAllOfficials();

  ngOnInit() { 

  }

  userLogin() {
    this.showLogin = !this.showLogin;
  }

  clearSearch() {
    this.term = "";
  }

  showNewsModal() {
    if (this.cookieService.get("showStoreNotification") === "false") {
      return false
    } else {
      return true
    }
  }

  userLogOut() {
    this.auth.signOut();
    this.showLogin = false;
    this.isLoggedIn = false;
  }

  async loginWithEmailAndPassword() {
    await this.auth.signInWithEmailAndPassword(this.loginEmail, this.loginPassword).then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        if (!user.emailVerified) {
          this.notVerified = true;
          this.auth.signOut();
        } else {
          this.showLogin = false;
          this.isLoggedIn = true;

          this.userProfile$ =this.fbService.getUser(user.uid);
        }
      }
    })
    .catch((error) => {
      this.failedLogin = true;
    });
  }

  

  @HostListener('window:resize', ['$event'])
  onResize() {
     this.screenHeight = window.innerHeight;
     this.screenWidth = window.innerWidth;
  }
}