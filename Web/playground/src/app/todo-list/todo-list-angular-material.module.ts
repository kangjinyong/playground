import { NgModule } from '@angular/core';
import { MatCheckboxModule, MatButtonModule, MatListModule, MatIconModule, MatInputModule, MatDividerModule, MatCardModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule
    ],
    exports: [
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatInputModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule
    ]
})

export class TodoListAngularMaterialModule { }
