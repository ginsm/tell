import Chai from 'chai';
const { assert } = Chai;

import { parseLines, parseLine } from '../../src/parser.mjs';

describe('parser.mjs: parseLines', () => {
  it('Creates variables and assigns them in state', () => {
    assert.deepEqual(
      parseLines(["$test=one", "$test2=two"]).variables,
      { test: "one", test2: "two" },
    );
  });
});

// describe('parser.mjs: parseLine', () => {

//   it('ignores [ and ] in arguments', () => {
//     assert.deepEqual(
//       parseLine('%t[[Text]]%'),
//       { text: "[Text]" }
//     );
//   });

//   it('supports embedded blocks in arguments', () => {
//     assert.deepEqual(
//       parseLine('%copy[%c[purple] t[Click to Copy]%'),
//       {
//         clickEvent: {
//           action: 'copy_to_clipboard',
//           text: { color: 'purple', text: 'Click to Copy' },
//         },
//       },
//     );
//   });

// });

