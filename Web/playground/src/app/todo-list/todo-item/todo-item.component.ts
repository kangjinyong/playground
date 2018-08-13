import { Component, OnInit, Input } from '@angular/core';

import { TodoListService } from '../services/todo-list.service'
import { Todo } from '../interfaces/todo.interface';

@Component({
    selector: 'todo-item',
    templateUrl: 'todo-item.component.html'
})

export class TodoItem implements OnInit {
    @Input() todoItem: Todo;

    constructor(
        private todoListService: TodoListService
    ) {}

    ngOnInit() {

    }

    onCheckboxChange() {
        console.log('changed');
    }
}