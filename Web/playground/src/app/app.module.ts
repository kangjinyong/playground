import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GestureConfig } from '@angular/material';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppAngularMaterialModule } from './app-angular-material.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { GoogleSignInService } from './common/services/google-sign-in.service';
import { DeploymentEnvironmentService } from './common/services/deployment-environment.service';
import { WindowService } from './common/services/window.service';
import { PreloadResolver } from './common/services/preload.service';

@NgModule({
  declarations: [
    LayoutComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppAngularMaterialModule
  ],
  providers: [
    GoogleSignInService,
    DeploymentEnvironmentService,
    WindowService,
    PreloadResolver,
    { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
