# pokedex

Pokedex is a small app to visualize Pokemons and some oftheir characteristics.

It uses Vue, JavaScript and Bootstrap. The markup is based on the [Bootstrap album example](https://getbootstrap.com/docs/4.0/examples/album/).

Development is supported by the use of the no-bundle development server `vite`.

Minimal testing is included. The following tools were used:

| Test       | Tool    |
| ---------- | ------- |
| Unit       | Jest    |
| End-to-end | Cypress |

## Get started

Install the project dependencies by executing `npm install` in the terminal.

Then start the development server with `npm run dev` and go to `http://localhost:3000` in your browser.

## Tests

### Unit tests

To run the unit tests: `npm t`

### End-to-end (E2E) tests

Headless mode: `npm run cypress:run`

In the browser: `npm run cypress:open`

## Linting

ESLint is used for linting of project files.

Execute linting: `npm run eslint`

## Bundling for production

In the terminal, run `npm run build`.
