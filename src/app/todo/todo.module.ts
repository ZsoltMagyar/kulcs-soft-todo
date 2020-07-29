import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { ConfirmDeleteDialogComponent } from '../todo/confirm-delete-dialog/confirm-delete-dialog.component';
import { TodoShorteningPipe } from '../todo/todo-shortening.pipe';
import { TodoApiService } from './todo-api.service';

import { StoreModule } from '@ngrx/store';
import { todosReducer } from './store/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './store/todo.effects';
import { TodosResolver } from './store/todos.resolver';

import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

const materialModules = [
  MatTabsModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatDialogModule
]

const routes: Routes = [
  {path: '', component: TodoListComponent, resolve: { todos: TodosResolver }},
  {path: ':id', component: EditTodoComponent},
  {path: 'create', component: EditTodoComponent}
];

@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    EditTodoComponent,
    TodoShorteningPipe,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    materialModules,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([TodosEffects]),
    StoreModule.forFeature('todos', todosReducer)
  ],
  exports: [RouterModule],
  providers: [TodoApiService, TodosResolver],
  entryComponents:[ConfirmDeleteDialogComponent]
})
export class TodoModule { }
