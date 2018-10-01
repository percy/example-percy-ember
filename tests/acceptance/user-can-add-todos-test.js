import { test, module } from "qunit";
import { percySnapshot } from "ember-percy";
import { setupApplicationTest } from "ember-qunit";
import {
  find,
  visit,
  fillIn,
  triggerKeyEvent,
  currentURL
} from "@ember/test-helpers";

module("Acceptance | user can add todos", function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    // Make sure we clear the local storage for each run
    window.localStorage.clear();
  });

  test("add todos", async function(assert) {
    await visit("/");

    percySnapshot("Empty todo list");

    await fillIn("#new-todo", "Bake a cake");
    await triggerKeyEvent("#new-todo", "keydown", 13);

    await fillIn("#new-todo", "Rake the lawn");
    await triggerKeyEvent("#new-todo", "keydown", 13);

    await assert.equal(currentURL(), "/");
    await assert.equal(
      find("ul.todo-list li:first-child").innerText.trim(),
      "Bake a cake"
    );
    await assert.equal(
      find("ul.todo-list li:last-child").innerText.trim(),
      "Rake the lawn"
    );

    percySnapshot("Todo list with 2 todos");
  });
});
