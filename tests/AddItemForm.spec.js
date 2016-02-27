import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import AddItemForm from '../public/js/components/AddItemForm';
import TimePicker from '../public/js/components/TimePicker';

describe('AddItemForm', () => {

  const renderer = TestUtils.createRenderer();

  before(() => {
    renderer.render(
      <AddItemForm onAddItem={console.log} />
    );
  });

  it('should render the AddItemForm', () => {
    const actual = renderer.getRenderOutput();
    const expected = <h2>Add Item to Inventory: </h2>;
    expect(actual).toIncludeJSX(expected);
  });

  it('should contain an item label input', () => {
    const actual = renderer.getRenderOutput();
    const expected = (
      <input
        type='text'
        placeholder='Item Label'
        value=''
        onChange={function noRefCheck() {}}
      />
    );
    expect(actual).toIncludeJSX(expected);
  });

  it('should contain an item type input', () => {
    const actual = renderer.getRenderOutput();
    const expected = (
      <input
        type='text'
        placeholder='Type'
        value=''
        onChange={function noRefCheck() {}}
      />
    );
    expect(actual).toIncludeJSX(expected);
  });

  it('should contain the TimePicker component', () => {
    const actual = renderer.getRenderOutput();
    const expected = (
      <TimePicker
        onSetExpiration={function noRefCheck() {}}
        default={5*60000}
      />
    );
    expect(actual).toIncludeJSX(expected);
  });

  it('should contain the Add Item button', () => {
    const actual = renderer.getRenderOutput();
    const expected = <input type='submit' value='Add Item' />;
    expect(actual).toIncludeJSX(expected);
  });

});
