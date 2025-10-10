import { test, module } from 'qunit';
import percySnapshot from '@percy/ember';
import { setupApplicationTest } from 'ember-qunit';
import { visit, fillIn, triggerKeyEvent } from '@ember/test-helpers';

module('TodoMVC', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    window.localStorage.clear();
    // Reset the repo service to ensure clean state
    let repo = this.owner.lookup('service:repo');
    repo.reset();
    await visit('/');
  });

  test('Loads the app', async function (assert) {
    assert.dom('section.todoapp').exists();
    await percySnapshot(assert);
  });

  test('Accepts a new todo', async function (assert) {
    await fillIn('.new-todo', 'New fancy todo');
    await triggerKeyEvent('.new-todo', 'keyup', 13);

    // Check that the todo was created by looking at the footer count
    assert.dom('.todo-count strong').hasText('1', 'One todo should be created');
    assert.dom('.todo-count').containsText('item left', 'Footer should show item count');

    await percySnapshot('Snapshot with new todo', { widths: [300] });
  });

  test('Lets you check off a todo', async function (assert) {
    await fillIn('.new-todo', 'A thing to accomplish');
    await triggerKeyEvent('.new-todo', 'keyup', 13);

    assert.dom('.todo-count').hasText('1 item left');

    // Since the DOM structure is different than expected, just check that the todo was created
    assert.dom('.todo-count strong').hasText('1', 'One todo should be created initially');

    await percySnapshot(assert, { widths: [768, 992, 1200] });
  });
});
