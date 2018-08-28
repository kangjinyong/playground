import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { TodoListService } from './services/todo-list.service';
import { TodoList } from './todo-list.component';
import { TodoItem } from './todo-item/todo-item.component';
import { TodoListAngularMaterialModule } from './todo-list-angular-material.module';
import { ClickOutside } from '../common/directives/click-outside.directive'

const routes: Routes = [
    { path: '', component: TodoList }
];

@NgModule({
    declarations: [
        TodoList,
        TodoItem,
        ClickOutside
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TodoListAngularMaterialModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        TodoListService
    ]
})

export class TodoListModule { }