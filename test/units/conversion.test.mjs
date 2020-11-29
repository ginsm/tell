// Note: I decided to test the type methods as all other methods are composed using them.
import Chai from 'chai';
const { assert } = Chai;

import { type } from '../../src/conversion.mjs';


describe('conversion.mjs: type.generic', () => {
  it('Creates a function that creates a tellraw property.', () => {
    assert.deepEqual(
      type.generic('color', 'white')({}, 'green'),
      { color: 'green' },
    );
  });

  it('Uses default passed through defaultOption parameter.', () => {
    assert.deepEqual(
      type.generic('color', 'white')({}),
      { color: 'white' },
    );
  });
});




describe('conversion.mjs: type.event', () => {
  it('Creates a function that creates a tellraw event property.', () => {
    assert.deepEqual(
      type.event('click', 'copy_to_clipboard', true)({}, 'Click to Copy'),
      {
        clickEvent: {
          action: 'copy_to_clipboard',
          value: 'Click to Copy'
        },
      },
    );
  });

  it('ignoreEmpty set to true returns false given no value.', () => {
    assert.equal(
      type.event('click', 'copy_to_clipboard', true)({}),
      false,
    );
  });

  it('ignoreEmpty set to false creates empty-value tellraw events.', () => {
    assert.deepEqual(
      type.event('click', 'copy_to_clipboard')({}),
      { clickEvent: { action: 'copy_to_clipboard', value: '' } },
    );
  });
});