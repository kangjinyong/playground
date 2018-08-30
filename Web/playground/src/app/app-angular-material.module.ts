import { NgModule } from '@angular/core';
import { MatMenuModule, MatButtonModule, MatIconModule, MatDividerModule } from '@angular/material';

@NgModule({
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule
    ],
    exports: [
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule
    ]
})

export class AppAngularMaterialModule { }