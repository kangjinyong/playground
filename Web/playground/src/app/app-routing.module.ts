import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { PreloadResolver } from './common/services/preload.service';

const appRoutes: Routes = [
    {
        path: '', component: LayoutComponent, resolve: [PreloadResolver], children: [
            { path: 'Home', loadChildren: './home/home.module#HomeModule' },
            { path: 'About', loadChildren: './about/about.module#AboutModule' },
            { path: 'TodoList', loadChildren: './todo-list/todo-list.module#TodoListModule' },
            { path: 'Material', loadChildren: './material/material.module#MaterialModule' },
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