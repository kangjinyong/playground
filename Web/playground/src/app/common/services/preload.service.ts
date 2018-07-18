import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs';
import { GoogleSignInService } from './google-sign-in.service';

@Injectable()
export class PreloadResolver implements Resolve<boolean> {

    constructor(
        private googleSignInService: GoogleSignInService) {
    }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.googleSignInService.load();
    }
}