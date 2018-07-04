import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Home } from './home.component';

const routes: Routes = [
    { path: '', component: Home }
];

@NgModule({
    declarations: [
        Home
    ],
    imports: [
        RouterModule.forChild(routes)
    ]
})

export class HomeModule { }