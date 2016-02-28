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
  seedDB: function () {
    let numItems = 5;
    let items = util.shuffleArray(util.getSampleItems()).slice(0, numItems);

    for (let item of items) {
      item.expiration = Date.now() + util.shuffleArray(util.getExpirationTimes()).pop();
    }
    let jsonItems = items;

    $.ajax({
      url: this.props.url + '/bulk',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(jsonItems),
      success: reply => {
        this.setState({items: reply.data});
        toastr.success('Successfully seeded the database');
      },
      error: (xhr, status, err) => {
        toastr.error('Error seeding the database');
        console.error(url, status, err.toString());
      }
    });
  },
  componentDidMount: function() {
    this.loadInventory();
  },
  render: function() {
    return (
      <div className='inventory'>
        <h1>Inventory System</h1>
        <ItemList onRemove={this.removeItem} items={this.state.items} />
        <div className='controls'>
          <button name="seedDB" onClick={this.seedDB}>Seed DB with sample items</button>
          <AddItemForm onAddItem={this.handleAddToInventory} items={this.state.items} />
          <RemoveItemForm onRemoveItem={this.removeItem} items={this.state.items}  />
        </div>
      </div>
    );
  }
});
