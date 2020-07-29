import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {

  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTodoList(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseURL}todo`);
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.baseURL}todo/${id}`);
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${this.baseURL}todo`, todo);
  }

  updateTodoById(todo: Partial<Todo>): Observable<Todo> {
    return this.http.put<Todo>(`${this.baseURL}todo/${todo.id}`, todo);
  }

  deleteTodoById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseURL}todo/${id}`);
  }

  setTodoToFinish(id: number | string): Observable<any> {
    return this.http.put<any>(`${this.baseURL}todo/finish/${id}`, null);
  }
}
