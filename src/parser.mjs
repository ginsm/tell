import methods from './methods.mjs';

const lines = [
  "$test=one",
  "%c[blue] t[$test, two, three]",
  "$another=variable",
];

export function parseLines(lines) {
  const state = {
    variables: {},
    processingValue: false,
    lines: [],
  }

  for (const line of lines) {
    if (line.trim()[0] === "$") {
      const trimmed = line.trim();

      let variable = '';
      let value = '';

      for (const id in trimmed) {
        if (id === '0') {
          continue;
        }

        const ch = line[id];

        if (ch === '=') {
          state.processingValue = true;
          continue;
        }

        if (state.processingValue) value += ch;
        else variable += ch;
      }
      state.variables[variable] = value;
      state.processingValue = false;
    } else {

    }
  }

  return state;
}

console.log(parseLines(lines));

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