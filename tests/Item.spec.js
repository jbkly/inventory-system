import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);
// import jsdom from 'mocha-jsdom';

import Item from '../public/js/components/Item';

describe('Item', () => {

  const renderer = TestUtils.createRenderer();

  before(() => {
    let item = {label: "Waffle", type: "Belgian", expiration: Date.now() + 60*60000};
    renderer.render(
      <Item
        label={item.label}
        type={item.type}
        expiration={item.expiration}
        key={item.label}
        handleRemove={console.log}
      />
    );
  });

  it('should render the item label', () => {
    const actual = renderer.getRenderOutput();
    const expected = <h2 className='itemLabel'>Waffle</h2>;
    expect(actual).toIncludeJSX(expected);
  });

  it('should render the item type', () => {
    const actual = renderer.getRenderOutput();
    const expected = <p className='itemType'>Type: Belgian</p>;
    expect(actual).toIncludeJSX(expected);
  });

  it('should render the item expiration', () => {
    const actual = renderer.getRenderOutput();
    const expected = <p className='itemExpiration'>Expires: in an hour</p>;
    expect(actual).toIncludeJSX(expected);
  });

  it('should render the remove item button', () => {
    const actual = renderer.getRenderOutput();
    const expected = (
      <button className="removeButton" onClick={console.log}>Remove Item</button>
    );
    expect(actual).toIncludeJSX(expected);
  });
});
