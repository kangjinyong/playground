import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GoogleSignInService } from '../common/services/google-sign-in.service';
import { WindowService } from '../common/services/window.service';
import { UserProfile } from '../common/interfaces/user.interface';

@Component({
    selector: 'layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.scss']
})

export class LayoutComponent implements OnInit, OnDestroy {
    signedIn: boolean;
    subscriptions: Subscription[] = [];
    profile: UserProfile;

    constructor(
        private googleSignInService: GoogleSignInService,
        private windowService: WindowService
    ) {}

    ngOnInit() {
        this.subscriptions.push(this.googleSignInService.userSignedInObservable.subscribe((profile) => {
            this.signedIn = this.googleSignInService.isSignedIn();
            this.profile = profile;
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    signInSignOut() {
        this.googleSignInService.signInSignOut();
    }

    revokeAccess() {
        this.googleSignInService.revokeAccess();
    }

    isMobile() {
        return this.windowService.isMobileDevice();
    }
}