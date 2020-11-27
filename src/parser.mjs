import convert from './conversion.mjs';
import {
  initializeVariable,
  insertVariablesInPlace,
} from './variables.mjs';



export function parseMultipleLines(lines) {
  const state = {
    variables: {},
    blocks: [],
  }

  for (let line of lines) {
    if (/\$.+=.+$/.test(line)) {
      initializeVariable(line, state);
      continue;
    }

    line = insertVariablesInPlace(line, state.variables);

    console.log(line);
  }

  return state;
}


export function parseSingleLine(line, variables = {}) {
  const state = {
    parsing: {
      block: false,
      variable: false,
      argument: false,
      embedded: false,
    },
    blocks: [],
    bracket: [],
    method: '',
    argument: '',
  }

  for (const ch of line) {
    switch (ch) {

      // %% denotes a block
      case '%':
        break;

      // [] denotes an argument block
      case '[':
        break;
      case ']':
        break;

      // $ denotes a variable
      case '$':
        break;

      default:

    }
  }

  return state;
}