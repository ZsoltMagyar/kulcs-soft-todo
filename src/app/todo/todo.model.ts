export interface Todo {
  id: number,
  todo: string,
  finished: boolean,
  priority: boolean,
}


export function compareTodos(t1:Todo, t2: Todo) {

  if ( t1.id > t2.id) {
    return 1;
  }
  else if ( t1.id < t2.id) {
    return -1;
  }
  return 0;
}
