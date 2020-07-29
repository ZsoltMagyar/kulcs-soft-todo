import { TodoShorteningPipe } from './todo-shortening.pipe';

describe('TodoShorteningPipe', () => {
  it('create an instance', () => {
    const pipe = new TodoShorteningPipe();
    expect(pipe).toBeTruthy();
  });
});
