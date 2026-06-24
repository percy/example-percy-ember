// Advanced acceptance test for @percy/ember.
// Each `test` exercises one row of the Advanced Feature Matrix. See
// advanced/matrix.yml for the canonical mapping. Lives in tests/acceptance/
// per Ember test source-set convention (ember-qunit can't pick up tests
// outside tests/).

import { test, module } from 'qunit'
import percySnapshot from '@percy/ember'
import { setupApplicationTest } from 'ember-qunit'
import { visit, fillIn, triggerKeyEvent } from '@ember/test-helpers'

module('TodoMVC Advanced', function (hooks) {
  setupApplicationTest(hooks)

  hooks.beforeEach(async function () {
    window.localStorage.clear()
    this.owner.lookup('service:repo').reset()
    await visit('/')
    await fillIn('.new-todo', 'Walk the dog')
    await triggerKeyEvent('.new-todo', 'keyup', 13)
  })

  test('exercises widths', async function (assert) {
    assert.dom('.todo-list li').exists({ count: 1 }, 'seeded todo is present')
    await percySnapshot('TodoMVC Advanced > exercises widths', {
      widths: [375, 768, 1280, 1920],
    })
  })

  test('exercises percyCSS', async function (assert) {
    assert.dom('.todo-list li').exists({ count: 1 }, 'seeded todo is present')
    await percySnapshot('TodoMVC Advanced > exercises percyCSS', {
      percyCSS: '.todo-list li { background: #fffde7 !important; }',
    })
  })

  test('exercises minHeight', async function (assert) {
    assert.dom('.todo-list li').exists({ count: 1 }, 'seeded todo is present')
    await percySnapshot('TodoMVC Advanced > exercises minHeight', {
      minHeight: 2000,
    })
  })

  test('exercises enableJavaScript', async function (assert) {
    assert.dom('.todo-list li').exists({ count: 1 }, 'seeded todo is present')
    await percySnapshot('TodoMVC Advanced > exercises enableJavaScript', {
      enableJavaScript: true,
    })
  })

  test('exercises responsiveSnapshotCapture', async function (assert) {
    assert.dom('.todo-list li').exists({ count: 1 }, 'seeded todo is present')
    await percySnapshot('TodoMVC Advanced > exercises responsiveSnapshotCapture', {
      responsiveSnapshotCapture: true,
      widths: [375, 1280],
    })
  })

  test('exercises labels', async function (assert) {
    assert.dom('.todo-list li').exists({ count: 1 }, 'seeded todo is present')
    await percySnapshot('TodoMVC Advanced > exercises labels', {
      labels: 'smoke,ember',
    })
  })

  test('exercises testCase', async function (assert) {
    assert.dom('.todo-list li').exists({ count: 1 }, 'seeded todo is present')
    await percySnapshot('TodoMVC Advanced > exercises testCase', {
      testCase: 'todomvc-advanced-suite',
    })
  })

  test('exercises devicePixelRatio', async function (assert) {
    assert.dom('.todo-list li').exists({ count: 1 }, 'seeded todo is present')
    await percySnapshot('TodoMVC Advanced > exercises devicePixelRatio', {
      devicePixelRatio: 2,
    })
  })

  test('exercises browsers override', async function (assert) {
    assert.dom('.todo-list li').exists({ count: 1 }, 'seeded todo is present')
    await percySnapshot('TodoMVC Advanced > exercises browsers override', {
      browsers: ['chrome', 'firefox'],
    })
  })

  test('exercises readiness preset', async function (assert) {
    assert.dom('.todo-list li').exists({ count: 1 }, 'seeded todo is present')
    await percySnapshot('TodoMVC Advanced > exercises readiness preset', {
      readiness: { preset: 'strict', timeoutMs: 5000 },
    })
  })
})
