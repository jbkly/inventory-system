'use strict';

import React from 'react';
import * as util from '../utility';

import ItemList from './ItemList';
import AddItemForm from './AddItemForm';

export default React.createClass({
  displayName: 'InventorySystem',
  getInitialState: function() {
    return {
      items: {},
      removedItems: util.getFromLocalStorage('removedItems') || []
    };
  },
  loadInventory: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: reply => this.setState({items: reply.data}),
      error: (xhr, status, err) => console.error(this.props.url, status, err.toString())
    });
  },
  handleAddToInventory: function(item) {
    // optimistically update UI before hearing back from server
    let items = this.state.items;
    let updatedItems = Object.assign(items);
    updatedItems[item.label] = item;
    this.setState({items: updatedItems});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: item,
      success: reply => this.setState({items: reply.data}),
      error: (xhr, status, err) => {
        this.setState({items});
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  removeItem: function(label) {
    // store removed item for later undo
    let items = this.state.items;
    this.state.removedItems.push(items[label]);
    util.saveToLocalStorage('removedItems', this.state.removedItems);

    // optimistically update UI
    let updatedItems = Object.assign(items);
    delete updatedItems[label];
    this.setState({items: updatedItems});

    $.ajax({
      url: this.props.url + '/' + encodeURIComponent(label),
      dataType: 'json',
      type: 'DELETE',
      success: reply => this.setState({items: reply.data}),
      error: (xhr, status, err) => {
        this.setState({items});
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  componentDidMount: function() {
    this.loadInventory();
    setInterval(this.loadInventory, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className='inventory'>
        <h1>Inventory System</h1>
        <ItemList items={this.state.items} onRemove={this.removeItem} />
        <AddItemForm onAddItem={this.handleAddToInventory} />
      </div>
    );
  }
});
