import { NgModule } from '@angular/core';
import { MatExpansionModule, MatInputModule, MatCardModule, MatIconModule, MatButtonModule, MatSlideToggleModule } from '@angular/material';

@NgModule({
    imports: [
        MatExpansionModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule
    ],
    exports: [
        MatExpansionModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule
    ]
})

export class MaterialAngularMaterialModule { }
