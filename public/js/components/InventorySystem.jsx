'use strict';

import React from 'react';
const toastr = require('toastr');
import $ from 'jquery';

import * as util from '../utility';
import ItemList from './ItemList';
import AddItemForm from './AddItemForm';
import RemoveItemForm from './RemoveItemForm';

export default React.createClass({
  displayName: 'InventorySystem',
  getInitialState: function() {
    return {
      items: {},
      removedItems: util.getFromLocalStorage('removedItems') || []
    };
  },
  componentWillMount: function() {
    toastr.options = {
      positionClass: "toast-bottom-full-width",
      timeOut: "3000"
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
    // store removed item for possible later undo
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
      success: reply => {
        this.setState({items: reply.data});
        toastr.success(`${label} has been removed from your inventory`);
      },
      error: (xhr, status, err) => {
        this.setState({items});
        console.error(this.props.url, status, err.toString());
        toastr.error(`Error, couldn't remove ${label} from inventory`);
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
        <div className='controls'>
          <AddItemForm onAddItem={this.handleAddToInventory} />
          <RemoveItemForm items={this.state.items} onRemoveItem={this.removeItem} />
        </div>
      </div>
    );
  }
});
