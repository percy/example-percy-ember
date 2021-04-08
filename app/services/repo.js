import { A } from '@ember/array';
import Service from '@ember/service';

export default class RepoService extends Service {
  lastId = 0;
  data = null;

  findAll() {
    this.data ||= A(JSON.parse(window.localStorage.getItem('todos') || '[]'));
    return this.data;
  }

  add(attrs) {
    let todo = Object.assign({ id: this.lastId++ }, attrs);
    this.data.pushObject(todo);
    this.persist();
    return todo;
  }

  delete(todo) {
    this.data.removeObject(todo);
    this.persist();
  }

  persist() {
    window.localStorage.setItem('todos', JSON.stringify(this.data));
  }
}
