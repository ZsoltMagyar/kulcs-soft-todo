import { Component, OnInit } from '@angular/core';
import { TodoState } from '../store/todo.reducer';
import { Store, select } from '@ngrx/store';
import { deleteTodo, finishTodo } from '../store/todo.actions';
import { Observable } from 'rxjs';
import { Todo } from '../todo.model';
import { selectAllTodos, selectPendingTodos, selectFinishedTodos } from '../store/todo.selectors';
import { Update } from '@ngrx/entity';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  allTodos$: Observable<Todo[]>;

  pendingTodos$: Observable<Todo[]>;

  finishedTodos$: Observable<Todo[]>;

  constructor(private store: Store<TodoState>, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.allTodos$ = this.store.pipe(select(selectAllTodos));
    this.pendingTodos$ = this.store.pipe(select(selectPendingTodos));
    this.finishedTodos$ = this.store.pipe(select(selectFinishedTodos));
  }

  todoFinish(todo: Todo) {
    const update: Update<Todo> = {
      id: todo.id,
      changes: todo
    }

    this.store.dispatch(finishTodo({update}))
  }

  deleteTodo(id) {
    // Mat Confirm Dialog
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(response => {
      if(response) {
        this.store.dispatch(deleteTodo({id: id}));
      }
    });

  }

}
