import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home } from './home.component';
import { HomeAngularMaterialModule } from './home-angular-material.module';

const routes: Routes = [
    { path: '', component: Home }
];

@NgModule({
    declarations: [
        Home
    ],
    imports: [
        HomeAngularMaterialModule,
        RouterModule.forChild(routes)
    ]
})

export class HomeModule { }