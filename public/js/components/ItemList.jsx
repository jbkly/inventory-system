'use strict';

import React from 'react';
import Item from './Item';

export default React.createClass({
  displayName: 'ItemList',
  handleRemove: function(label) {
    this.props.onRemove(label);
  },
  render: function() {
    let itemList = Array.from(Object.keys(this.props.items), key => {
      let item = this.props.items[key];
      return (
        <Item
          label={item.label}
          type={item.type}
          expiration={item.expiration}
          key={item.label}
          handleRemove={this.handleRemove.bind(this, item.label)}>
          {item.label}
        </Item>
      );
    });
    return (
      <div className='itemList'>
        {itemList}
      </div>
    );
  }
});
