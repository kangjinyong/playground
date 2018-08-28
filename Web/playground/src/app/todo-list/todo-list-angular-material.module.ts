import { NgModule } from '@angular/core';
import { MatCheckboxModule, MatButtonModule, MatListModule, MatIconModule, MatInputModule, MatDividerModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule
    ]
})

export class TodoListAngularMaterialModule { }
