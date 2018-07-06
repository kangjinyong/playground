import { Injectable } from '@angular/core';

declare const handleClientLoad: any;

@Injectable()
export class GoogleSignInService {
    constructor() {
        new handleClientLoad();
    }
}