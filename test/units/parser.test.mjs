import Chai from 'chai';
const { assert } = Chai;

import { parseMultipleLines, parseSingleLine } from '../../src/parser.mjs';

describe('parser.mjs: parseMultipleLines', () => {
  it('Creates variables and assigns them in state.', () => {
    assert.deepEqual(
      parseMultipleLines(["$test=one", " $test2=two"]).variables,
      { "$test": "one", "$test2": "two" },
    );
  });
});

describe('parser.mjs: parseLine', () => {

  it('ignores [ and ] in argument blocks', () => {
    assert.deepEqual(
      parseSingleLine('%t[[Text]]%'),
      [{ text: "[Text]" }]
    );
  });

  it('supports embedded blocks in arguments', () => {
    assert.deepEqual(
      parseSingleLine('%t[[Copy Me]] hover[%c[green] t[Click to Copy]%]%'),
      [{
        text: "[Copy Me]",
        hoverEvent: {
          action: 'show_text',
          value: { color: 'green', text: 'Click to Copy' },
        },
      }],
    );
  });

});

