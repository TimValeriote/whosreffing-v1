import { Injectable,inject } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  private auth: Auth = inject(Auth);

  constructor() { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  createUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isAuthenticated() {
    return this.auth.authState;
  }
}
