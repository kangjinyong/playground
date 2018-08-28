import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { GoogleSignInService } from '../../common/services/google-sign-in.service';
import { TodoListService } from '../services/todo-list.service';
import { Todo } from '../interfaces/todo.interface';

@Component({
    selector: 'todo-item',
    templateUrl: 'todo-item.component.html',
    styleUrls: ['todo-item.component.scss']
})

export class TodoItem implements OnInit {
    @Input() todoItem: Todo;
    @Output() todoItemDeleted: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('todoInput') set content(input: ElementRef) {
        if (input) {
            setTimeout(() => {
                input.nativeElement.focus();
            },1)
        }
    }

    editMode: boolean;
    editTodoFormGroup: FormGroup;

    constructor(
        private googleSignInService: GoogleSignInService,
        private todoListService: TodoListService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.editTodoFormGroup = this.fb.group({
            _id: [this.todoItem._id],
            description: [this.todoItem.description],
            order: [this.todoItem.order]
        })
    }

    onCheckboxChange(done: boolean) {
        this.todoItem.done = done;
        if (this.googleSignInService.isSignedIn()) {
            this.todoListService.editTodo(this.todoItem);
        }
    }

    deleteTodoItem() {
        if (this.googleSignInService.isSignedIn()) {
            this.todoListService.deleteTodo(this.todoItem).subscribe((data) => {
                this.todoItemDeleted.emit();            
            });
        }
        else {
            this.todoItemDeleted.emit(this.todoItem._id);
        }
    }

    onSubmit() {
        if (this.editTodoFormGroup.controls['description'].value) {
            if (this.googleSignInService.isSignedIn()) {
                this.todoListService.editTodo(<Todo>this.editTodoFormGroup.value);
            }
            this.todoItem.description = this.editTodoFormGroup.controls['description'].value;
        }
        this.setEditMode(false);
    }

    globalClicked(outside: boolean) {
        if (this.editMode && outside) {
            this.onSubmit();
        }
        else if (!this.editMode && !outside) {
            this.setEditMode(true);
        }
    }

    private setEditMode(edit: boolean) {
        this.editMode = edit;
    }
}