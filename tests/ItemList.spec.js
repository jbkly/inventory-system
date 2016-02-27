import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import ItemList from '../public/js/components/ItemList';
import Item from '../public/js/components/Item';

describe('ItemList', () => {

  const renderer = TestUtils.createRenderer();

  before(() => {
    let items = {
      "Taco": {
        "label": "Taco",
        "type": "Mexican",
        "expiration": 1456431676475
      },
      "Burrito": {
        "label": "Burrito",
        "type": "Tex-Mex",
        "expiration": 1456432044729
      }
    };
    renderer.render(
      <ItemList items={items} onRemove={console.log} />
    );
  });

  it('should render a div of class "itemList"', () => {
    const actual = renderer.getRenderOutput().props.className.includes('itemList');
    const expected = true;
    expect(actual).toEqual(expected);
  });

  it('should render items from the list', () => {
    const actual = renderer.getRenderOutput();
    const expected = (
      <Item
        label="Burrito"
        type="Tex-Mex"
        expiration={1456432044729}
        handleRemove={function noRefCheck() {}}
      />
    );
    expect(actual).toIncludeJSX(expected);
  });

  it('should render as many items as there are items in the items list', () => {
    const actual = renderer.getRenderOutput().props.children.length;
    const expected = 2;
    expect(actual).toEqual(expected);
  });

});
