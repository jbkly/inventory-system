import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import RemoveItemForm from '../public/js/components/RemoveItemForm';

describe('RemoveItemForm', () => {

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
      <RemoveItemForm items={items} onRemoveItem={function(){}} />
    );
  });

  it('should render the form', () => {
    const actual = renderer.getRenderOutput().type;
    expect(actual).toEqual('form');
  });

  it('should render the RemoveItemForm', () => {
    const actual = renderer.getRenderOutput().props.className.includes('removeItemForm');
    expect(actual).toEqual(true);
  });

  it('should render options containing the item labels', () => {
    const actual = renderer.getRenderOutput();
    const expected = (
      <option value="Taco">
        Taco
      </option>
    );
    expect(actual).toIncludeJSX(expected);
  });

  it('should contain a remove item submit button', () => {
    const actual = renderer.getRenderOutput();
    const expected = <input disabled={true} type="submit" value="Remove Item" />;
    expect(actual).toIncludeJSX(expected);
  });

});
