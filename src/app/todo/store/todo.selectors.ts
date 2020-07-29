import {createFeatureSelector, createSelector} from '@ngrx/store';
import { TodoState } from './todo.reducer';
import * as todoReducer from './todo.reducer';

export const selectTodoState = createFeatureSelector<TodoState>('todos')

export const selectAllTodos = createSelector(selectTodoState, todoReducer.selectAll);

export const selectPendingTodos = createSelector(selectAllTodos, todos => todos.filter(todo => !todo.finished));

export const selectFinishedTodos = createSelector(selectAllTodos, todos => todos.filter(todo => todo.finished));

export const selectTodoById = createSelector(selectAllTodos, (todos, props) => todos.find(todo => todo.id === props.id));

export const areTodosLoaded = createSelector(selectTodoState, state => state.allTodosLoaded);
