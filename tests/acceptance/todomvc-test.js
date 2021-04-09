import { test, module } from 'qunit';
import percySnapshot from '@percy/ember';
import { setupApplicationTest } from 'ember-qunit';
import { visit, fillIn, triggerKeyEvent, click } from '@ember/test-helpers';

module('TodoMVC', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    window.localStorage.clear();
    await visit('/');
  });

  test('Loads the app', async function (assert) {
    assert.dom('section.todoapp').exists();
    await percySnapshot(assert);
  });

  test('Accepts a new todo', async function (assert) {
    await fillIn('.new-todo', 'New fancy todo');
    await triggerKeyEvent('.new-todo', 'keyup', 13);

    assert.dom('.todo-list').exists({ count: 1 });

    await percySnapshot('Snapshot with new todo', { widths: [300] });
  });

  test('Lets you check off a todo', async function (assert) {
    await fillIn('.new-todo', 'A thing to accomplish');
    await triggerKeyEvent('.new-todo', 'keyup', 13);

    assert.dom('.todo-count').hasText('1 item left');

    await click('input.toggle');

    assert.dom('.todo-count').hasText('0 items left');

    await percySnapshot(assert, { widths: [768, 992, 1200] });
  });
});
