import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { TodoListService } from './services/todo-list.service';
import { TodoList } from './todo-list.component';

const routes: Routes = [
    { path: '', component: TodoList }
];

@NgModule({
    declarations: [
        TodoList
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        TodoListService
    ]
})

export class TodoListModule { }