import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RefereeHubComponent } from './components/referee-hub/referee-hub.component';
import { OfficialPageComponent } from './components/official-page/official-page.component';
import { PreviousGamesComponent } from './components/previous-games/previous-games.component';
import { InfoComponent } from './components/info/info.component';
import { StandingsComponent } from './components/standings/standings.component';
import { PlayoffReportComponent } from './components/playoff-report/playoff-report.component';
import { StoreComponent } from './components/store/store.component';
import { RegisterComponent } from './components/register/register.component';

import { CookieModule } from 'ngx-cookie';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent
  },
  { 
    path: 'ref-hub',
    component: RefereeHubComponent
  },
  { 
    path: 'official-page/:id',
    component: OfficialPageComponent
  },
  { 
    path: 'previous-games',
    component: PreviousGamesComponent
  },
  { 
    path: 'standings',
    component: StandingsComponent
  },
  { 
    path: 'info',
    component: InfoComponent
  },
  { 
    path: 'post-season-report',
    component: PlayoffReportComponent
  },
  { 
    path: 'store',
    component: StoreComponent
  },
  { 
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CookieModule.withOptions() ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
