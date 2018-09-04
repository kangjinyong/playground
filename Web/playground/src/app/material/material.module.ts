import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Material } from './material.component';
import { MaterialAngularMaterialModule } from './material-angular-material.module';

import { MaterialCard } from './material-card/material-card.component';
import { MaterialTab } from './material-tab/material-tab.component';
import { MaterialStepper } from './material-stepper/material-stepper.component';

const routes: Routes = [
    { path: '', component: Material }
];

@NgModule({
    declarations: [
        Material,
        MaterialCard,
        MaterialTab,
        MaterialStepper
    ],
    imports: [
        MaterialAngularMaterialModule,
        RouterModule.forChild(routes)
    ]
})

export class MaterialModule { }