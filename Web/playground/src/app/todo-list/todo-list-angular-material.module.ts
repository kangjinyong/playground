import { NgModule } from '@angular/core';
import { MatCheckboxModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule
    ]
})

export class TodoListAngularMaterialModule { }
