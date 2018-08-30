import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
import { Gapi } from '../interfaces/gapi.interface';

import { UserProfile } from '../interfaces/user.interface';
import { DeploymentEnvironmentService } from './deployment-environment.service';

declare const gapi: any;

@Injectable()
export class GoogleSignInService {
    private gapiInfo: Gapi;  
    private scope: string = 'profile email';
    private userProfile: UserProfile = <UserProfile>{};
    private userSignedInSubject = new BehaviorSubject<UserProfile>(<UserProfile>{});
    
    public userSignedInObservable = this.userSignedInSubject.asObservable();
    public googleAuthToken: string;

    constructor(
        private zone: NgZone,
        private http: Http,
        private deploymentEnvironmentService: DeploymentEnvironmentService
    ) {}

    load() {
        return this.http.get(this.deploymentEnvironmentService.getApiUrl() + 'api').pipe<boolean>(map((res) => {
            this.gapiInfo = res.json();
            gapi.load('auth2', this.initClient.bind(this));
            return true;
        }));
    }

    initClient() {
        let self = this;

        gapi.auth2.init({
            'apiKey': this.gapiInfo.apiKey,
            'clientId': this.gapiInfo.clientId,
            'scope': this.scope
        }).then(function() {
            self.signInUserIfAuthorized();
        })
    }

    signInSignOut() {
        let self = this;

        let GoogleAuth = gapi.auth2.getAuthInstance();
        if (GoogleAuth.isSignedIn.get()) {
            GoogleAuth.signOut().then(function() {
                self.setUserProfileAndToken(null);
            })
        } 
        else {
            GoogleAuth.signIn().then(function() {
                self.signInUserIfAuthorized();
            }).catch((err : {error: string}) => {
                console.log(err.error);   
            });
        }
    }

    revokeAccess() {
        let self = this;

        gapi.auth2.getAuthInstance().disconnect().then(function() {
            self.setUserProfileAndToken(null);
        })
    }

    isSignedIn() {
        return Object.keys(this.userProfile).length !== 0;
    }

    private signInUserIfAuthorized() {
        let GoogleAuth = gapi.auth2.getAuthInstance();
        if (GoogleAuth.isSignedIn.get()) {
            let user = GoogleAuth.currentUser.get();
            let isAuthorized = user.hasGrantedScopes(this.scope);
            if (isAuthorized) {
                this.setUserProfileAndToken(user);
            }
            else {
                this.setUserProfileAndToken(null);
            }
        }
    }

    private setUserProfileAndToken(user: any) {
        if (user == null) {
            this.userProfile = <UserProfile>{};
            this.googleAuthToken = null;
        }
        else {
            let profile = user.getBasicProfile();
            this.userProfile.fullName = profile.getName();
            this.userProfile.firstName = profile.getGivenName();
            this.userProfile.lastName = profile.getFamilyName();
            this.userProfile.imageUrl = profile.getImageUrl();
            this.userProfile.emailAddress = profile.getEmail();

            this.googleAuthToken = user.getAuthResponse().id_token;
        }

        this.zone.run(() => this.userSignedInSubject.next(this.userProfile));
    }
}