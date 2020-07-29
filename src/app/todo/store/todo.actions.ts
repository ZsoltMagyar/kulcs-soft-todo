import {createAction, props} from '@ngrx/store';
import {Todo} from '../todo.model';
import { Update } from '@ngrx/entity';


export const loadAllTodos = createAction('[Todo List] Load All Todos');

export const allTodosLoaded = createAction('[Load Todos Effect] All Todos Loaded', props<{todos: Todo[]}>() );

export const createTodoBegin = createAction('[Create Todo] Create Todo Begin', props<{todo: Todo}>());

export const createTodoComplete = createAction('[Create Todo Effect] Create Todo Complete', props<{todo: Todo}>());

export const updateTodo = createAction('[Edit Todo] Todo Update', props<{update: Update<Todo>}>());

export const finishTodo = createAction('[Todo List] Finish Todo', props<{update: Update<Todo>}>());

export const deleteTodo = createAction('[Todo List] Delete Todo', props<{id: number}>());

export const findTodoById = createAction('[Edit Todo] Find Todo By Id', props<{id: number}>());

export const findTodoComplete = createAction('[Find Todo By Id Effect] Todo found', props<{todo: Todo}>());
