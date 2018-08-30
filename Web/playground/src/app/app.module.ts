import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppAngularMaterialModule } from './app-angular-material.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { GoogleSignInService } from './common/services/google-sign-in.service';
import { DeploymentEnvironmentService } from './common/services/deployment-environment.service';
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
    PreloadResolver
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
