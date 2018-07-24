import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
import { Gapi } from '../interfaces/gapi.interface';

import { UserProfile } from '../interfaces/user.interface';

declare const gapi: any;

@Injectable()
export class GoogleSignInService {
    private gapiInfo: Gapi;  
    private scope: string = 'profile email';
    private userProfile: UserProfile = <UserProfile>{};
    private userProfileSubject = new BehaviorSubject<UserProfile>(<UserProfile>{});
    
    public userProfileObservable = this.userProfileSubject.asObservable();

    constructor(
        private http: Http
    ) {}

    load() {
        return this.http.get('http://localhost:8080/api').pipe<boolean>(map((res) => {
            this.gapiInfo = res.json();
            gapi.load('client:auth2', this.initClient.bind(this));
            return true;
        }));
    }

    initClient() {
        let self = this;

        gapi.client.init({
            'apiKey': this.gapiInfo.apiKey,
            'clientId': this.gapiInfo.clientId,
            'scope': this.scope
        }).then(function() {
            self.signInUserIfAuthorized();
        });
    }

    signInSignOut() {
        let self = this;

        let GoogleAuth = gapi.auth2.getAuthInstance();
        if (GoogleAuth.isSignedIn.get()) {
            GoogleAuth.signOut().then(function() {
                self.setUserProfile(null);
            });
        } 
        else {
            GoogleAuth.signIn().then(function() {
                self.signInUserIfAuthorized();
            });
        }
    }

    revokeAccess() {
        let self = this;

        gapi.auth2.getAuthInstance().disconnect().then(function() {
            self.setUserProfile(null);
        });
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
                this.setUserProfile(user.getBasicProfile());
            }
            else {
                this.setUserProfile(null);
            }
        }
    }

    private setUserProfile(profile: any) {
        if (profile == null) {
            this.userProfile = <UserProfile>{};
        }
        else {
            this.userProfile.fullName = profile.getName();
            this.userProfile.firstName = profile.getGivenName();
            this.userProfile.lastName = profile.getFamilyName();
            this.userProfile.imageUrl = profile.getImageUrl();
            this.userProfile.emailAddress = profile.getEmail();
        }

        this.userProfileSubject.next(this.userProfile);
    }
}