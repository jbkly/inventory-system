import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import InventorySystem from '../public/js/components/InventorySystem';
import ItemList from '../public/js/components/ItemList';
import AddItemForm from '../public/js/components/AddItemForm';
import RemoveItemForm from '../public/js/components/RemoveItemForm';

describe('InventorySystem', () => {

  const renderer = TestUtils.createRenderer();

  before(() => {
    renderer.render(
      <InventorySystem url='//localhost:3000/api/items' pollInterval={2000} />
    );
  });

  it('should render the inventory', () => {
    const actual = renderer.getRenderOutput();
    const expected = <h1>Inventory System</h1>;
    expect(actual).toIncludeJSX(expected);
  });

  it('should contain the item list', () => {
    const actual = renderer.getRenderOutput();
    const expected = <ItemList items={{}} onRemove={function noRefCheck() {}} />;
    expect(actual).toIncludeJSX(expected);
  });

  it('should contain the add item form', () => {
    const actual = renderer.getRenderOutput();
    const expected = <AddItemForm onAddItem={function noRefCheck() {}} />;
    expect(actual).toIncludeJSX(expected);
  });

  it('should contain the remove item form', () => {
    const actual = renderer.getRenderOutput();
    const expected = <RemoveItemForm items={{}} onRemoveItem={function noRefCheck() {}} />;
    expect(actual).toIncludeJSX(expected);
  });

});
