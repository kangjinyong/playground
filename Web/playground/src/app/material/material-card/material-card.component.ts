import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'material-card',
    templateUrl: 'material-card.component.html',
    styleUrls: ['material-card.component.scss']
})

export class MaterialCard implements OnInit {
    switchedOn: boolean;

    constructor() {}

    ngOnInit() {
    }

    toggle(checked: boolean) {
        this.switchedOn = checked;
    }

    getClass() {
        if (this.switchedOn)
            return 'material-card-on';
        else    
            return 'material-card-off';
    }

    getStatus() {
        if (this.switchedOn)
            return 'On';
        else
            return 'Off';
    }
}