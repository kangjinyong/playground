import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'material-card',
    templateUrl: 'material-card.component.html',
    styleUrls: ['material-card.component.scss']
})

export class MaterialCard implements OnInit {
    lockStatus: boolean;

    constructor() {}

    ngOnInit() {
        this.lock(false);
    }

    lock(toLock: boolean) {
        this.lockStatus = toLock;
    }
}