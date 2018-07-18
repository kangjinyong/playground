import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { GoogleSignInService } from './common/services/google-sign-in.service';
import { PreloadResolver } from './common/services/preload.service';

@NgModule({
  declarations: [
    LayoutComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    GoogleSignInService, 
    PreloadResolver
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
