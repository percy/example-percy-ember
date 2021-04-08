import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class TodoList extends Component {
  @service repo;
  @tracked canToggle = true;

  get allCompleted() {
    return this.args.todos.isEvery('completed');
  }

  @action
  enableToggle() {
    this.canToggle = true;
  }

  @action
  disableToggle() {
    this.canToggle = false;
  }

  @action
  toggleAll() {
    this.args.todos.setEach('completed', !this.allCompleted);
    this.repo.persist();
  }
}
