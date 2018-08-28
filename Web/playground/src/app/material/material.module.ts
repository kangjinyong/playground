import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Material } from './material.component';
import { MaterialAngularMaterialModule } from './material-angular-material.module';

const routes: Routes = [
    { path: '', component: Material }
];

@NgModule({
    declarations: [
        Material
    ],
    imports: [
        MaterialAngularMaterialModule,
        RouterModule.forChild(routes)
    ]
})

export class MaterialModule { }