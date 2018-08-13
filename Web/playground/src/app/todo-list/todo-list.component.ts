import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Guid } from '../common/helpers/guid';
import { TodoListService } from './services/todo-list.service'
import { GoogleSignInService } from '../common/services/google-sign-in.service';
import { Todo } from './interfaces/todo.interface';


@Component({
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html'
})

export class TodoList implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    newTodoFormGroup: FormGroup;
    todos: Todo[] = [];

    constructor(
        private fb: FormBuilder,
        private googleSignInService: GoogleSignInService,
        private todoListService: TodoListService
    ) {}

    ngOnInit() {
        this.newTodoFormGroup = this.fb.group({
            description: ['']
        })
        
        this.subscriptions.push(this.googleSignInService.userSignedInObservable.subscribe((profile) => {
            if (this.googleSignInService.isSignedIn()) {
                this.refreshTodos();
            }
            else {
                this.todos = [];
            }
        }));
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    onSubmit() {
        if (this.newTodoFormGroup.controls['description'].value) {
            this.todoListService.addTodo(<Todo>this.newTodoFormGroup.value).subscribe((todo: Todo) => {
                this.resetNewTodo();
                this.refreshTodos();
            });
        }
    }

    private refreshTodos() {
        this.todoListService.getAllTodos().subscribe((data) => {
            this.todos = data;
        });
    }

    private resetNewTodo() {
        this.newTodoFormGroup.patchValue({
            id: Guid.newGuid(),
            description: ''
        })
    }
}