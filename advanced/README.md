# Advanced Percy + Ember

Exercises the full applicable Percy SDK feature surface for `@percy/ember`. See [`matrix.yml`](./matrix.yml) for the canonical row mapping.

## Layout asymmetry

Ember tests must live under `tests/` (ember-qunit source-set convention) — they can't be relocated under `advanced/`. So:

- Test code → [`tests/acceptance/todomvc-advanced-test.js`](../tests/acceptance/todomvc-advanced-test.js)
- `advanced/` holds only `matrix.yml`, `.percy.yml`, and this README.

## Run locally

The advanced acceptance test runs alongside the basic suite via `npm test`:

```bash
export PERCY_TOKEN="<your project token>"
npm test
```

## CI

The basic `Tests` workflow already runs both the basic + advanced acceptance tests. No separate `advanced.yml` is needed — the Ember test runner discovers both files.

## Coverage matrix

Source of truth: [`matrix.yml`](./matrix.yml).
