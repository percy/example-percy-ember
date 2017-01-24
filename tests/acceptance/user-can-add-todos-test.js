import { test } from 'qunit';
import moduleForAcceptance from 'todomvc/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | user can add todos');

test('add todos', function(assert) {
  visit('/');

  percySnapshot('Empty todo list');

  fillIn('#new-todo', 'Bake a cake');
  keyEvent('#new-todo', 'keydown', 13);

  fillIn('#new-todo', 'Rake the lawn');
  keyEvent('#new-todo', 'keydown', 13);

  andThen(function() {
    assert.equal(currentURL(), '/');
    assert.equal(find('ul.todo-list li:first').text().trim(), 'Bake a cake');
    assert.equal(find('ul.todo-list li:last').text().trim(), 'Rake the lawn');

    percySnapshot('Todo list with 2 todos');
  });
});
