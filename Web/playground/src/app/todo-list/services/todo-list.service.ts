import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

import { GoogleSignInService } from '../../common/services/google-sign-in.service';
import { DeploymentEnvironmentService } from '../../common/services/deployment-environment.service';
import { Todo } from '../interfaces/todo.interface';

@Injectable()
export class TodoListService {

    constructor(
        private http: Http,
        private googleSignInService: GoogleSignInService,
        private deploymentEnvironmentService: DeploymentEnvironmentService
    ) {}

    addTodo(newTodo: Todo) {
        return this.http.post(this.deploymentEnvironmentService.getApiUrl() + 'api/todos',
            JSON.stringify(newTodo),
            { headers: new Headers({ 
                'x-access-token': this.googleSignInService.googleAuthToken,
                'Content-Type': 'application/json' 
            })})
            .pipe<Todo>(map((res) => {
                return res.json();
            }));
    }

    getAllTodos() {
        return this.http.get(this.deploymentEnvironmentService.getApiUrl() + 'api/todos',
            { headers: new Headers({
                'x-access-token': this.googleSignInService.googleAuthToken
            })})
            .pipe<Todo[]>(map((res) => {
                return res.json();
            }));
    }

    editTodo(modifiedTodo: Todo) {
        return this.http.put(this.deploymentEnvironmentService.getApiUrl() + 'api/todos/' + modifiedTodo._id, 
            JSON.stringify(modifiedTodo),
            { headers: new Headers({ 
                'x-access-token': this.googleSignInService.googleAuthToken,
                'Content-Type': 'application/json' 
            })})
            .pipe<Todo>(map((res) => {
                return res.json();
            })).toPromise();
    }

    deleteTodo(deleteTodo: Todo) {
        return this.http.delete(this.deploymentEnvironmentService.getApiUrl() + 'api/todos/' + deleteTodo._id, 
            { headers: new Headers({
                'x-access-token': this.googleSignInService.googleAuthToken
            })})
            .pipe<Todo>(map((res) => {
                return res.json();
            }));
    }
}