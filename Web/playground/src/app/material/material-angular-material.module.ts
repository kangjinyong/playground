import { NgModule } from '@angular/core';
import { MatExpansionModule, MatInputModule, MatCardModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        MatExpansionModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule
    ],
    exports: [
        MatExpansionModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule
    ]
})

export class MaterialAngularMaterialModule { }
