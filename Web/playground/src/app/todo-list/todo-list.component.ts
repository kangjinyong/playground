import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Guid } from '../common/helpers/guid';
import { TodoListService } from './services/todo-list.service'
import { GoogleSignInService } from '../common/services/google-sign-in.service';
import { Todo } from './interfaces/todo.interface';


@Component({
    selector: 'todo-list',
    templateUrl: 'todo-list.component.html',
    styleUrls: ['todo-list.component.scss']
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
            description: [''],
            order: ['']
        })
        
        this.subscriptions.push(this.googleSignInService.userSignedInObservable.subscribe((profile) => {
            if (this.googleSignInService.isSignedIn()) {
                this.refreshTodos(true);
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
            if (this.googleSignInService.isSignedIn()) {
                this.todoListService.addTodo(<Todo>this.newTodoFormGroup.value).subscribe((todo: Todo) => {
                    this.refreshTodos(true);
                });
            }
            else {
                let newTodo = <Todo>this.newTodoFormGroup.value;
                newTodo._id = Guid.newGuid();
                this.todos.push(newTodo);
                this.resetNewTodo(true);
            }
        }
    }

    deleteTodo(id: string) {
        if (this.googleSignInService.isSignedIn()) {
            this.refreshTodos(false);
        }
        else {
            let index = this.todos.findIndex(todo => todo._id === id);
            this.todos.splice(index, 1);
        }
    }

    private refreshTodos(clear: boolean) {
        this.todoListService.getAllTodos().subscribe((data) => {
            if (data) {
                this.todos = data.sort(function(a, b) {return a.order - b.order});
            }
            this.resetNewTodo(clear);
        });
    }

    private resetNewTodo(clear: boolean) {
        this.newTodoFormGroup.patchValue(<Todo>{
            order: this.todos.length + 1,
        });
        
        if (clear) {
            this.newTodoFormGroup.patchValue(<Todo>{
                description: ''
            });
        }
    }
}