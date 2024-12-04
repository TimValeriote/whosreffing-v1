import { Component, OnInit, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ModalService } from 'src/app/services/modal.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';

  showModal: boolean = false


  constructor(public auth: AngularFireAuth, public modalService: ModalService, private fbService: FirebaseService) { }

  ngOnInit(): void {
  }

  loginWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  createNewUser() {
    this.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then((result) => {

        if (result.user) {
          result.user.sendEmailVerification();
          this.showModal = true
          this.modalService.showModalWindow();
          this.fbService.createUser(this.email, this.firstName, this.lastName, "Referee", result.user.uid);
        } else {
          console.log("failed")
        }
      }).catch((error) => {
        window.alert(error.message)
    });
  }
}
