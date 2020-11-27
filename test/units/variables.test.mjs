import Chai from 'chai';
const { assert } = Chai;

import {
  insertVariablesInPlace,
  initializeVariable,
} from '../../src/variables.mjs';

describe('variables.mjs: initializeVariable', () => {
  it('Parses a variable line and assigns the key:value pair to state.', () => {
    const state = {
      variables: {},
      blocks: []
    };

    assert.deepEqual(
      initializeVariable(
        '$title=My Super Secret Title',
        state,
      ),
      {
        variables: {
          "$title": "My Super Secret Title",
        },
        blocks: [],
      },
    );
  });

  it("Ignores future instances of '=' after the original one.", () => {
    const state = {
      variables: {},
      blocks: []
    };

    assert.deepEqual(
      initializeVariable(
        '$title=My Super Secret Title=',
        state,
      ),
      {
        variables: {
          "$title": "My Super Secret Title=",
        },
        blocks: [],
      },
    );
  });
});