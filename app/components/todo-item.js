import { action, set } from '@ember/object';
import { isBlank } from '@ember/utils';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class TodoItem extends Component {
  @service repo;
  @tracked editing = false;

  @action
  startEditing() {
    this.args.onStartEdit();
    this.editing = true;
  }

  @action
  doneEditing(e) {
    if (!this.editing) return;
    let todoTitle = e.target.value;

    if (isBlank(todoTitle)) {
      this.removeTodo();
    } else {
      set(this.args.todo, 'title', todoTitle.trim());
      this.editing = false;
      this.args.onEndEdit();
    }
  }

  @action
  handleKeyup(e) {
    if (e.keyCode === 13) {
      e.target.blur();
    } else if (e.keyCode === 27) {
      this.editing = false;
    }
  }

  @action
  toggleCompleted(e) {
    set(this.args.todo, 'completed', e.target.checked);
    this.repo.persist();
  }

  @action
  removeTodo() {
    this.repo.delete(this.args.todo);
  }
}
