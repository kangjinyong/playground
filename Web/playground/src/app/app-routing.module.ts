import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';

const appRoutes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            { path: 'Home', loadChildren: './home/home.module#HomeModule' },
            { path: '', redirectTo: 'Home', pathMatch: 'full' }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    providers: [],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }