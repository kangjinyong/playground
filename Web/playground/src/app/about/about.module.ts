import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { About } from './about.component';
import { AboutAngularMaterialModule } from './about-angular-material.module';

const routes: Routes = [
    { path: '', component: About }
];

@NgModule({
    declarations: [
        About
    ],
    imports: [
        AboutAngularMaterialModule,
        RouterModule.forChild(routes)
    ]
})

export class AboutModule { }