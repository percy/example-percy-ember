import { action } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  @service repo;

  get remaining() {
    return this.model.filterBy('completed', false);
  }

  get completed() {
    return this.model.filterBy('completed');
  }

  @action
  createTodo(e) {
    if (e.keyCode === 13 && !isBlank(e.target.value)) {
      this.repo.add({ title: e.target.value.trim(), completed: false });
      e.target.value = '';
    }
  }

  @action
  clearCompleted() {
    this.model.removeObjects(this.completed);
    this.repo.persist();
  }
}
