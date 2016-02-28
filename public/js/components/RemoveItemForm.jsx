'use strict';

import React from 'react';

export default React.createClass({
  displayName: 'RemoveItemForm',
  getInitialState: function() {
    return {selectedItem: null};
  },
  componentWillReceiveProps: function() {
    if (this.state.selectedItem && !this.props.items[this.state.selectedItem]) {
      this.setState({selectedItem: null});
    }
  },
  selectedItemChange: function(e) {
    this.setState({selectedItem: e.target.value});
  },
  onSubmit: function(e) {
    e.preventDefault();
    let label = this.state.selectedItem;
    if (label && this.props.items[label]) {
      this.props.onRemoveItem(label);
    }
  },
  render: function() {
    let itemList = Array.from(Object.keys(this.props.items), key => {
      let item = this.props.items[key];
      return (
        <option value={key} key={key}>
          {item.label}
        </option>
      );
    });
    return (
      <form className='removeItemForm' onSubmit={this.onSubmit}>
        <h2>Remove Item from Inventory: </h2>
        <select value={this.state.selectedItem} onChange={this.selectedItemChange}>
          <option value={null}> -- select an item -- </option>
          {itemList}
        </select>
        <input disabled={!this.state.selectedItem} type='submit' value='Remove Item' />
      </form>
    );
  }
});
