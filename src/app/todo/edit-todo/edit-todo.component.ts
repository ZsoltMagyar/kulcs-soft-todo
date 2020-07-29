import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoState } from '../store/todo.reducer';
import { Store, select } from '@ngrx/store';
import { selectTodoById } from '../store/todo.selectors';
import { updateTodo, createTodoBegin, findTodoById } from '../store/todo.actions';
import { Todo } from '../todo.model';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {

  todoId: number;
  selectedTodo: Todo;
  form: FormGroup;
  todoLength: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<TodoState>) { }

  ngOnInit(): void {
    this.todoId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.form = new FormGroup({
      todo: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      priority: new FormControl(false, [Validators.required]),
      finished: new FormControl(false, [Validators.required])
    });

    this.form.get('todo').valueChanges.subscribe(val => this.todoLength = val.length);

    if (this.todoId) {
      this.store.dispatch(findTodoById({id: this.todoId}))
      this.store.pipe(select(selectTodoById, { id: this.todoId })).subscribe(t => {
        if (!t) {
          this.router.navigate(['todo']);
        } else {
          this.selectedTodo = t;
          this.todoLength = t.todo.length;
          this.form.setValue({
            todo: t.todo,
            priority: t.priority,
            finished: t.finished
          });
        }

      });
    }
  }

  onSubmit() {
    if(this.todoId) {
      this.updateTodo();
    } else {
      this.createTodo();
    }
  }

  private createTodo() {
    const todo = {
      ...this.form.value
    };

    this.store.dispatch(createTodoBegin({todo}));
  }

  private updateTodo() {
    const todo = {
      ...this.selectedTodo, ...this.form.value
    };

    const update: Update<Todo> = {
      id: this.todoId,
      changes: todo
    };

    this.store.dispatch(updateTodo({update}))
  }

}
