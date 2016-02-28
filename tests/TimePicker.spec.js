import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import TimePicker from '../public/js/components/TimePicker';

describe('TimePicker', () => {

  const renderer = TestUtils.createRenderer();

  before(() => {
    renderer.render(
      <TimePicker
        onSetExpiration={console.log}
        default={5555}
      />
    );
  });

  it('should render the TimePicker component', () => {
    const actual = renderer.getRenderOutput().props.className.includes('timePicker');
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should render expiration label', () => {
    const actual = renderer.getRenderOutput();
    const expected = <span>Set expiration: </span>;
    expect(actual).toIncludeJSX(expected);
  });

  it('should render select options', () => {
    const actual = renderer.getRenderOutput();
    const expected = (
      <option value={60000}>1 minute</option>
    );
    expect(actual).toIncludeJSX(expected);
  });

  it('should have the correct defaultValue on the select element', () => {
    const actual = renderer.getRenderOutput().props.children[1].props.defaultValue;
    const expected = 5555;
    expect(actual).toEqual(expected);
  });

});
