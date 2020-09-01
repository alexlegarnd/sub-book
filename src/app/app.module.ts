import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './add/add.component';
import { SubscriptionService } from './subscription.service';
import { AuthenticationService } from './authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [SubscriptionService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
