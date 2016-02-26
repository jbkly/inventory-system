import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

// import jsdom from 'mocha-jsdom';

import * as util from '../public/js/utility.js';
// import Item from '../public/js/app.jsx';

const CoolComponent = ({greeting}) => (
  <div>
    <h1>Greeting</h1>
    <div>{greeting}</div>
  </div>
);

describe('CoolComponent', () => {
  it('should render the greeting', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<CoolComponent greeting='hello world' />);

    const actual = renderer.getRenderOutput();
    const expected = <div>hello world</div>;
    expect(actual).toIncludeJSX(expected);
  });
});



// import React from 'react/addons';
// import Item from '../public/js/app.jsx';
// const TestUtils = require('react-addons-test-utils');


// describe('Item', function() {
//   let component;
//   let item = {label: "Taco", type: "Mexican", expiration: 1456431676475};

//   beforeEach(function() {
//     component = TestUtils.renderIntoDocument(
//       <Item
//         label={item.label}
//         type={item.type}
//         expiration={item.expiration}
//         key={item.label}
//         handleRemove={this.handleRemove.bind(this, item.label)}>
//         {item.label}
//       </Item>
//     );
//   });

//   it('should display item label and type', function() {
//     let node = component.getDOMNode();
//     expect(node.getElementsByClassName('itemLabel')[0].textContent).toBe("Taco");
//     expect(node.getElementsByClassName('itemType')[0].textContent).toBe("Type: Mexican");
//   });


// });
