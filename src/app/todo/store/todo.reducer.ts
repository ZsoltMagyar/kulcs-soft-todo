import { Todo, compareTodos } from '../todo.model'
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';

import { allTodosLoaded, deleteTodo, updateTodo, finishTodo, createTodoComplete, findTodoComplete } from './todo.actions';

export interface TodoState extends EntityState<Todo> {
  allTodosLoaded: boolean
}

export const adapter = createEntityAdapter<Todo>({
  sortComparer: compareTodos
});

export const initialTodosState = adapter.getInitialState({
  allTodosLoaded: false
});

export const todosReducer = createReducer(
  initialTodosState,
  on(allTodosLoaded, (state, action) => {
    return adapter.addAll(action.todos, {...state, allTodosLoaded: true})
  }),
  on(deleteTodo, (state, action) => { return adapter.removeOne(action.id, state)}),
  on(updateTodo, (state, action) => { return adapter.updateOne(action.update, state)}),
  on(finishTodo, (state, action) => { return adapter.updateOne(action.update, state)}),
  on(createTodoComplete, (state, action) => { return adapter.addOne(action.todo, state)}),
  on(findTodoComplete, (state, action) => { return adapter.upsertOne(action.todo, state)})
);

export const {
  selectAll
} = adapter.getSelectors();
