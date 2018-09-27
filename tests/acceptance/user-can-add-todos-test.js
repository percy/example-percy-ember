import { test } from "qunit";
import { visit, fillIn, keyEvent, currentURL } from "@ember/test-helpers";
import moduleForAcceptance from "todomvc/tests/helpers/module-for-acceptance";

moduleForAcceptance("Acceptance | user can add todos");

test("add todos", async function(assert) {
  await visit("/");

  percySnapshot("Empty todo list");

  await fillIn("#new-todo", "Bake a cake");
  await keyEvent("#new-todo", "keydown", 13);

  await fillIn("#new-todo", "Rake the lawn");
  await keyEvent("#new-todo", "keydown", 13);

  await assert.equal(currentURL(), "/");
  await assert.equal(
    find("ul.todo-list li:first")
      .text()
      .trim(),
    "Bake a cake"
  );
  await assert.equal(
    find("ul.todo-list li:last")
      .text()
      .trim(),
    "Rake the lawn"
  );

  percySnapshot("Todo list with 2 todos");
});
