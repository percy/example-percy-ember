import { A } from '@ember/array';
import Service from '@ember/service';

export default class RepoService extends Service {
  lastId = 0;
  data = null;

  findAll() {
    if (!this.data) {
      this.data = A(JSON.parse(window.localStorage.getItem('todos') || '[]'));
      // Set lastId to be higher than any existing todo id
      if (this.data.length > 0) {
        this.lastId = Math.max(...this.data.map((todo) => todo.id || 0)) + 1;
      }
    }
    return this.data;
  }

  add(attrs) {
    // Ensure data is initialized
    this.findAll();
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

  // Add method to reset data (useful for tests)
  reset() {
    this.data = null;
    this.lastId = 0;
    window.localStorage.removeItem('todos');
  }
}
