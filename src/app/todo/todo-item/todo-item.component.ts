import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo.model';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input('todo') todo: Todo;
  @Output('delete') delete = new EventEmitter<number>();
  @Output('finish') finish = new EventEmitter<Todo>();


  constructor() { }

  ngOnInit(): void {}

  todoStateChange(change: MatCheckboxChange) {
    const todo = {...this.todo, finished: change.checked}
    this.finish.emit(todo);
  }

  deleteTodo() {
    this.delete.emit(this.todo.id);
  }

}
