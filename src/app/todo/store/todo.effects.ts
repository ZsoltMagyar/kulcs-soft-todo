import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoApiService } from '../todo-api.service';
import { loadAllTodos, allTodosLoaded, deleteTodo, updateTodo, finishTodo, createTodoBegin, createTodoComplete, findTodoById, findTodoComplete } from './todo.actions';
import {concatMap, map, tap, delay} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TodosEffects {

  constructor(private actions$: Actions, private todoApiService: TodoApiService, private router: Router) {}

  loadTodos$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadAllTodos),
      concatMap(action => this.todoApiService.getTodoList()),
      map(todos => allTodosLoaded({todos}))
    )
  );

  deleteTodo$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTodo),
    concatMap(action => this.todoApiService.deleteTodoById(action.id)),
  ), {dispatch: false});

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      concatMap(action => this.todoApiService.updateTodoById(action.update.changes)),
      tap(() => this.router.navigateByUrl('/todo'))
  ), {dispatch: false});

  finishTodo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(finishTodo),
        concatMap(action => this.todoApiService.setTodoToFinish(action.update.id))
      ), {dispatch: false}
  );

  createTodo$ = createEffect(() =>
        this.actions$.pipe(
          ofType(createTodoBegin),
          concatMap(action => this.todoApiService.createTodo(action.todo)),
          tap(() => this.router.navigate(['todo'])),
          map(todo => createTodoComplete({todo}))
        )
  );

  loadTodoById$ = createEffect(() => this.actions$.pipe(
    ofType(findTodoById),
    concatMap(action => this.todoApiService.getTodoById(action.id)),
    map(todo => findTodoComplete({todo}))
  ));

}
