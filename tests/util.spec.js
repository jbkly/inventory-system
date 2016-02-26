import expect from 'expect';
import * as util from '../public/js/utility.js';

describe('tests', () => {
  it('should work', () => {
    expect(true).toEqual(true);
  });
});

describe('utility functions', () => {
  it('should work', () => {
    const actual = util.testUtilityFn(3);
    const expected = 9;
    expect(actual).toEqual(expected);
  });
});
