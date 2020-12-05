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
      nestedBlock: false,
    },
    block: {},
    blocks: [],
    brackets: [],
    method: '',
    argument: '',
    leadingEscapeCharacter: false,
  }

  for (const ch of line) {
    // Handle escaped characters
    if (state.leadingEscapeCharacter) {
      if (state.parsing.argument) {
        state.argument += ch;
      }
      state.leadingEscapeCharacter = false;
      continue;
    }

    switch (ch) {
      case '\\':
        state.leadingEscapeCharacter = true;
        break;
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
          state.parsing.nestedBlock = true;
        }
      // [ denotes an argument block is starting
      case '[':
        if (ch === '[') {
          state.brackets.push('[');
          if (!state.parsing.argument) {
            state.parsing.argument = true;
            break;
          }
        }
      // ] denotes an argument block is ending
      case ']':
        if (ch === ']') {
          state.brackets.pop();
          if (state.parsing.argument && state.brackets.length === 0) {
            // Method invocation
            if (convert.hasOwnProperty(state.method)) {
              if (state.parsing.nestedBlock) {
                state.argument = parseSingleLine(state.argument)[0];
                state.parsing.nestedBlock = false;
              }
              convert[state.method](state.block, state.argument);
              state.method = '';
              state.argument = '';
              state.parsing.argument = false;
              break;
            }
            // Ignore any invalid methods
            else {
              state.method = ''
              state.argument = ''
              state.parsing.argument = false;
              state.parsing.nestedBlock = false;
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