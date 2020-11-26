import methods from './methods.mjs';

export function parseLines(lines) {
  const state = {
    variables: {},
    processingValue: false,
    lines: [],
  }

  for (const line of lines) {
    if (trim(line)[0] === "$") {
      let prop = '';
      let value = '';
      const trimmed = trim(line);

      for (const id in trimmed) {
        if (id === '0') continue;
        const ch = trimmed[id];

        if (ch === '=') {
          state.processingValue = true;
          continue;
        }

        if (state.processingValue) value += ch;
        else prop += ch;
      }

      state.variables[prop] = value;
      state.processingValue = false;
    } else {

    }
  }

  return state;
}

export function parseLine(line, variables = {}) {
  const state = {
    block: false,
    blocks: [],
    argumentBlock: [],
    command: '',
    arguments: '',
  }

  for (const ch of line) {
    switch (ch) {

      // %% denotes a block
      case '%':
        if (!state.argumentBlock) {
          if (state.block) {
            state.block = false;
          } else {
            state.block = true;
            state.blocks.push({});
          }
        }
        break;

      // [] denotes an argument block
      case '[':
        state.argumentBlock.push(1);
        if (state.argumentBlock)
          break;

      case ']':
        state.argumentBlock.pop();

        break;
    }
  }

  return state;
}

// Remove only leading spaces
function trim(str) {
  if (!str) return str;
  return str.replace(/^\s+/g, '');
}