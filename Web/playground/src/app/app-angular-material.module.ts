import { NgModule } from '@angular/core';
import { MatMenuModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule
    ]
})

export class AppAngularMaterialModule { }