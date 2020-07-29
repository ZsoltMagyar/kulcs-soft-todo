import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { areTodosLoaded } from './todo.selectors';
import { loadAllTodos } from './todo.actions';
import { tap, filter, first,  } from 'rxjs/operators';

@Injectable()
export class TodosResolver implements Resolve<any> {

  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
      select(areTodosLoaded),
      tap(todosLoaded => {
        if(!todosLoaded)
         this.store.dispatch(loadAllTodos())
      }),
      filter(todosLoaded =>todosLoaded),
      first());
  }

}
