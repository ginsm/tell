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

    state.blocks.push(parseSingleLine(line));
  }

  return state;
}


export function parseSingleLine(line) {
  const state = {
    parsing: {
      block: false,
      argument: false,
      embeddedBlock: false,
    },
    block: {},
    blocks: [],
    bracket: [],
    method: '',
    argument: '',
  }

  for (const ch of line) {
    switch (ch) {
      // %% denotes a block
      case '%':
        if (!state.parsing.argument) {
          if (state.parsing.block) {
            state.blocks.push(state.block);
            state.block = {};
          }
          state.parsing.block = !state.parsing.block;
          break;
        }

        if (state.parsing.argument) {
          state.parsing.embeddedBlock = true;
        }

      // [ denotes an argument block is starting
      case '[':
        if (ch === '[') {
          state.bracket.push('[');

          if (!state.parsing.argument) {
            state.parsing.argument = true;
            break;
          }
        }


      // ] denotes an argument block is ending
      case ']':
        if (ch === ']') {
          state.bracket.pop();

          if (state.parsing.argument && state.bracket.length === 0) {
            // Method processing
            if (convert.hasOwnProperty(state.method)) {
              if (state.parsing.embeddedBlock) {
                state.argument = parseSingleLine(state.argument)[0];
                state.parsing.embeddedBlock = false;
              }
              convert[state.method](state.block, state.argument);
              state.method = '';
              state.argument = '';
              state.parsing.argument = false;
              break;
            }

            else {
              console.log(state, line);
              throw new Error(`Method ${state.method} does not exist.`);
            }
          }
        }

      // Handle any other type of character
      default:
        if (state.parsing.block) {
          if (state.parsing.argument) {
            state.argument += ch;
            break;
          }

          if (ch !== ' ') {
            state.method += ch;
          }
        }
    };
  }

  return state.blocks;
}