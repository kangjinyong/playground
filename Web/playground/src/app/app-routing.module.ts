import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '', children: [
            { path: 'Home', loadChildren: 'app/home/home.module#HomeModule' }
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