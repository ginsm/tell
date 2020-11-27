export function insertVariablesInPlace(line, variables = {}) {
  for (const variable in variables) {
    line = line.replace(variable, variables[variable]);
  }
  return line;
}

export function initializeVariable(line, parentState) {
  const state = {
    parsing: {
      value: false,
    },
    prop: '',
    value: '',
    trimmed: trim(line),
  };

  for (let id in state.trimmed) {
    const ch = state.trimmed[id];

    if (!state.parsing.value && ch === '=') {
      state.parsing.value = true;
      continue;
    }

    if (state.parsing.value) {
      state.value += ch;
    }
    else {
      state.prop += ch;
    }
  }

  parentState.variables[state.prop.trim()] = state.value;
  return parentState;
}

// Remove only leading spaces
function trim(str) {
  if (!str) return str;
  return str.replace(/^\s+/g, '');
}