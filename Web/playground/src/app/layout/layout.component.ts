import { Component, OnInit } from '@angular/core';
import { GoogleSignInService } from '../common/services/google-sign-in.service';

@Component({
    selector: 'layout',
    templateUrl: 'layout.component.html'
})

export class LayoutComponent implements OnInit {
    
    constructor(
        private googleSignInService: GoogleSignInService
    ) {}

    ngOnInit() {
    }
}