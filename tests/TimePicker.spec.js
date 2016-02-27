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

  it('should render expiration label', () => {
    const actual = renderer.getRenderOutput();
    const expected = <span>Set expiration: </span>;
    expect(actual).toIncludeJSX(expected);
  });

  it('should render the select element', () => {
    const actual = renderer.getRenderOutput();
    const expected = (
      <select defaultValue={5555} onChange={function noRefCheck() {}} >
        <option value={60000}> a minute </option>
        <option value={300000}> 5 minutes </option>
        <option value={900000}> 15 minutes </option>
        <option value={3600000}> an hour </option>
        <option value={43200000}> 12 hours </option>
        <option value={86400000}> a day </option>
        <option value={604800000}> 7 days </option>
      </select>
    );
    expect(actual).toIncludeJSX(expected);
  });

  it('should render select options', () => {
    const actual = renderer.getRenderOutput();
    const expected = (
      <option value={60000}>a minute</option>
    );
    expect(actual).toIncludeJSX(expected);
  });

});
