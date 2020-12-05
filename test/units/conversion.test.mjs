// Note: I decided to test the curry methods as all other methods are composed using them.
import Chai from 'chai';
const { assert } = Chai;

import { curry } from '../../src/util/conversion.util.mjs';


describe('conversion.mjs: curry.generic', () => {
  it('Creates a function that creates a tellraw property.', () => {
    assert.deepEqual(
      curry.generic({ prop: 'color', fallback: 'white' })({}, 'green'),
      { color: 'green' },
    );
  });

  it('Uses default passed through defaultOption parameter.', () => {
    assert.deepEqual(
      curry.generic({ prop: 'color', fallback: 'white' })({}),
      { color: 'white' },
    );
  });
});




describe('conversion.mjs: curry.event', () => {
  it('Creates a function that creates a tellraw event property.', () => {
    assert.deepEqual(
      curry.event({ type: 'click', action: 'copy_to_clipboard', ignoreEmpty: true })({}, 'Click to Copy'),
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
      curry.event({ type: 'click', action: 'copy_to_clipboard', ignoreEmpty: true })({}),
      false,
    );
  });

  it('ignoreEmpty set to false creates empty-value tellraw events.', () => {
    assert.deepEqual(
      curry.event({ type: 'click', action: 'copy_to_clipboard' })({}),
      { clickEvent: { action: 'copy_to_clipboard', value: '' } },
    );
  });
});