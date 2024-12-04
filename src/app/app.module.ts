import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RefereeHubComponent } from './components/referee-hub/referee-hub.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { OfficialfilterPipe } from './pipes/officialfilter.pipe';
import { OfficialPageComponent } from './components/official-page/official-page.component';
import { PreviousGamesComponent } from './components/previous-games/previous-games.component';
import { InfoComponent } from './components/info/info.component';
import { HttpClientModule } from "@angular/common/http";
import { StandingsComponent } from './components/standings/standings.component';
import { PlayoffReportComponent } from './components/playoff-report/playoff-report.component';
import { DecimalpercentpipePipe } from './pipes/decimalpercentpipe.pipe';
import { NewsmodalComponent } from './components/modal/newsmodal/newsmodal.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { StoreComponent } from './components/store/store.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RefereeHubComponent,
    OfficialfilterPipe,
    OfficialPageComponent,
    PreviousGamesComponent,
    InfoComponent,
    StandingsComponent,
    PlayoffReportComponent,
    DecimalpercentpipePipe,
    NewsmodalComponent,
    InfoModalComponent,
    StoreComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgbModule,
    Ng2SearchPipeModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [
    { provide: BUCKET, useValue: '' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
