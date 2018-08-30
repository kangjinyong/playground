import { Injectable, isDevMode } from '@angular/core';

@Injectable()
export class DeploymentEnvironmentService {
    getApiUrl(): string {
        if (isDevMode()) {
            return 'http://localhost:8080/';
        }
        else {
            return 'https://kjy-playground.com/'
        }
    }
}